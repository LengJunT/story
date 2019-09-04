const Controller = require('egg').Controller;

class ArticleController extends Controller {
    async index() {
        const { body } = this.ctx.request
        const { id, title, content, isDraft, uid } = body
        console.log('article contronller body', body)
        if(title && content && uid){
            const type = await this.ctx.service.article.handelEditArticle(body)
            console.log('article contronller', type)
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