const Controller = require('egg').Controller;
class LoginController extends Controller {
    async index(){
        const ctx = this.ctx
        const {body} = ctx.request
        console.log('this.ctx.request',body)
        const { name = '', passWord = '' } = body
        let content = ''
        let message = ''
        if(name && passWord){
            const res = await ctx.service.login.index({name,passWord})
            console.log('res', res)
            ctx.body = {
                code:'SUCCESS',
                ...res
            }
            return
        }else {
            message = '用户名或密码有错'            
        }
        this.ctx.body = {
            code: 'SUCCESS',
            message,
            content
        }
    }
}
module.exports = LoginController;
