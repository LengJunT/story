const Controller = require('egg').Controller;
class LoginController extends Controller {
    async index(){
        const {body} = this.ctx.request
        console.log('this.ctx.request',body)
        const { name = '', passWord = '' } = body
        const user = await this.ctx.service.user.getUser(name)
        let content = ''
        let message = ''
        if(user === null){
            message = '此用户不存在'
        }else {
            const userObj = JSON.parse(JSON.stringify(user))
            const pas = new Buffer(userObj.passWord).toString()
            if(pas !== passWord){
                message = '密码错误'
            }
            content = await this.ctx.service.token.generateToken({name,id:userObj.id})
        }
        this.ctx.body = {
            code: 'SUCCESS',
            message,
            content
        }
    }
}
module.exports = LoginController;
