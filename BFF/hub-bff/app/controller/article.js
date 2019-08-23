const Controller = require('egg').Controller;
module.exports = class ArticleController extends Controller {
    async saveArticleController (){
        const ctx = this.ctx
        const {body, header = {}} = ctx.request
        const {authorization:token} = header
        const {title,content} = body
        if(!token){
            ctx.body = {
                code: 'SUCCESS',
                message:'非法用户',
                content:''
            }
            return
        }
        const user = await ctx.service.token.index(token)
        console.log('bff token', user)
        ctx.body = {
            code: 'SUCCESS',
            message:'成功',
            content:''
        }
    }
}
