const Controller = require('egg').Controller;

class ArticleController extends Controller {
    async index() {
        const { body } = this.ctx.request
        const { id, title, content, isDraft } = body
        if(title && content){
            const type = await this.ctx.service.article.handelEditArticle(body)
            if(type){
                this.ctx.body = {
                    code: 'SUCCESS',
                    content:type
                }
                return
            }
        }
        this.ctx.body = {
            code: 'FALL',
            content:false,
            msg:'操作失败'
        }
    }
}

module.exports = ArticleController;