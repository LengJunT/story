const Service = require('egg').Service;
const V4 = require('uuid')

class UserService extends Service {
    async addUser(userData) {
        const { name, passWord } = userData
        try {
            if (name && passWord) {
                const userInfo = await this.getUser(name)
                if(userInfo !== null){
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
        const data = await this.app.mysql.get('user',{name})
        console.log('getUser', data)
        return data
    }

}
module.exports = UserService;
