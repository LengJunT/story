const Controller = require('egg').Controller;
var pattern = /^(?=.*\d)(?=.*[aA-zZ])(?=.*[.!@#$%^&*?\(\)]).{6,16}$/;
class RegisteredController extends Controller {
    async index() {
        const {body} = this.ctx.request
        console.log('this.ctx.request',body)
        const { name = '', passWord = '' } = body
        const checkName = name === '' || name.length < 4
        const checkPassWord = pattern.test(passWord)
        let content = false
        let message = ''
        if (checkName) {
            message = '名称校验不通过'
        } else if (!checkPassWord) {
            message = '密码校验不通过'
        }
        if (message === '') {
            let active = await this.ctx.service.user.addUser({ name, passWord })
            if (active.success === true) {
                message = '注册成功'
                content = true
            } else {
                message = '注册失败'
                if(active.success === -1){
                    message = '用户名已存在'
                }
            }
        }
        this.ctx.body = {
            code: 'SUCCESS',
            message,
            content,
        }
    }
}

module.exports = RegisteredController;