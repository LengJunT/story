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
        console.log('getMyArticle', id)
        const res = await ctx.service.article.getMyArticle({ uid: id })
        // console.log('getMyArticle', res, data, ags)
        if (res.content) {
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
