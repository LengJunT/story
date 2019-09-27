const Controller = require('egg').Controller;
const getTokenData = require('../uilt')
module.exports = class ArticleController extends Controller {
    async saveArticleController() {
        const ctx = this.ctx
        const { body } = ctx.request
        const { id, name } = await getTokenData(ctx)
        const res = await ctx.service.article.saveArticle({ ...body, uid: id })
        if (res.content) {
            ctx.body = {
                code: 'SUCCESS',
                message: '成功',
                content: true
            }
        } else {
            ctx.body = {
                code: 'SUCCESS',
                message: '操作失败',
                content: ''
            }
        }
    }

    async getMyArticle() {
        const ctx = this.ctx
        console.log('getMyArticle', 1)
        const { id, name } = await getTokenData(ctx)
        const Aid = ctx.params.id
        const res = await ctx.service.article.getMyArticle({ uid: id })
        // console.log('getMyArticle', res, data, ags)
        if (res.content) {
            console.log('aid', Aid)
            const { article = [], articleDraft = [] } = res.content || {}
            if(Aid){
                let articleD =[...article, ...articleDraft].find(i => i.id===Aid)
                if(articleD){
                    ctx.body = {
                        code: 'SUCCESS',
                        message: '成功',
                        content: articleD
                    }
                }else{
                    ctx.body = {
                        code: 'SUCCESS',
                        message: '操作失败',
                    }
                }
                return
            }
            ctx.body = {
                code: 'SUCCESS',
                message: '成功',
                content: res.content
            }
        } else {
            ctx.body = {
                code: 'SUCCESS',
                message: '操作失败',
                content: ''
            }
        }
    }
}
