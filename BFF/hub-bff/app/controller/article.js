const Controller = require('egg').Controller;
module.exports = class ArticleController extends Controller {
    async saveArticleController (){
        const ctx = this.ctx
        const {body} = ctx.request
        const {title,content} = body
        console.log('saveArticleController',title)
        ctx.body = {
            code: 'SUCCESS',
            message:'成功',
            content:''
        }
    }
}
