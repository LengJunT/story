const Controller = require('egg').Controller;

class TokenController extends Controller {
  async index() {
    const { body } = this.ctx.request
    const { token } = body
    if (!token) {
      this.ctx.body = ''
    }
    try {
      let data = await this.ctx.service.token.decryptionToken(token)
      if (data.id) {
        data.id = new Buffer(JSON.parse(JSON.stringify(data.id.data))).toString()
      }
      this.ctx.body = data;
    } catch (e) {
      this.ctx.body = e
    }

  }
}

module.exports = TokenController;