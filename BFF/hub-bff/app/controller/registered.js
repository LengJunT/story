const Controller = require('egg').Controller;
var pattern = /^(?=.*\d)(?=.*[aA-zZ])(?=.*[.!@#$%^&*?\(\)]).{6,16}$/;
class RegisteredController extends Controller {
    async index() {
        const ctx = this.ctx
        const {body} = ctx.request
        console.log('this.ctx.request',body)
        const { name = '', passWord = '' } = body
        const checkName = name === '' || name.length < 4
        const checkPassWord = pattern.test(passWord)
        let content = false
        let message = ''
        if (checkName) {
            message = '名称校验不通过, 名称长度需要大于4'
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