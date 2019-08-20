const Controller = require('egg').Controller;
var pattern = /^(?=.*\d)(?=.*[aA-zZ])(?=.*[.!@#$%^&*?\(\)]).{6,16}$/;
class RegisteredController extends Controller {
    async index() {
        const {body} = this.ctx.request
        console.log('this.ctx.request',body)
        const { name = '', passWord = '' } = body
        const checkName = name === '' || name.length < 6
        const checkPassWord = pattern.test(passWord)
        let content = false
        let message = ''
        if (checkName) {
            message = '名称校验不通过'
        } else if (!checkPassWord) {
            message = '密码校验不通过'
        }
        if (message === '') {
            const res = await ctx.service.registered.index({name,passWord})    
            ctx.body = {
                ...res,
                code:'SUCCESS'
            }
            return        
        }
        this.ctx.body = {
            code:'SUCCESS',
            message,
            content,
        }
    }
}

module.exports = RegisteredController;