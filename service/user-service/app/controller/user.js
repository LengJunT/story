const Controller = require('egg').Controller;

class UserController extends Controller {
    async index() {
        const { body } = this.ctx.request
        const { id } = body

        const user = await this.ctx.service.user.getUserInfo(id)
        let message
        if (user === null) {
            message = '查找错误'
        }
        this.ctx.body = {
            code: message ? 'FALL' : 'SUCCESS',
            message,
            content: user
        }
    }
}

module.exports = UserController;