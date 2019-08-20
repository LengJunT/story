const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = '中心BFF';
  }
}

module.exports = HomeController;