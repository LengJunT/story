const Service = require('egg').Service;
const V4 = require('uuid')
const omit = require('omit.js')

class UserService extends Service {
    async addUser(userData) {
        const { name, passWord } = userData
        try {
            if (name && passWord) {
                const userInfo = await this.getUser(name)
                if (userInfo !== null) {
                    return {
                        success: -1
                    }
                }
                const data = { id: V4(), name, passWord }
                const result = await this.app.mysql.insert('user', data);
                const insertSuccess = result.affectedRows === 1
                return {
                    ...result,
                    success: insertSuccess
                }
            }
        } catch (e) {
            console.log('注册信息', e)
            return {
                success: false
            }

        }
    }
    async getUser(name) {
        const data = await this.app.mysql.get('user', { name })
        console.log('getUser', data)
        return data
    }
    async getUserInfo(id) {
        let data = {}
        if (id.length > 0) {
            data = await this.app.mysql.select('user', { where: { id } })
        } else {
            data = await this.app.mysql.get('user', { id })
        }
        console.log('getUserInfo', data)
        data = handleUserBuffer(data)
        console.log('getUserInfo', data)
        return data
    }
}

function handleUserBuffer(users) {
    if (users && users.length > 0) {
        // console.log('handleUserBuffer', data)
        return JSON.parse(JSON.stringify(users)).map(item => {
            item.id = new Buffer(item.id).toString()
            item.name = new Buffer(item.name).toString()
            const data = omit(item, ['passWord'])
            return data
        })
    } else if (users) {
        let item = JSON.parse(JSON.stringify(users))
        item.id = new Buffer(item.id).toString()
        item.name = new Buffer(item.name).toString()
        const data = omit(item, ['passWord'])
        return data
    }
}

module.exports = UserService;
