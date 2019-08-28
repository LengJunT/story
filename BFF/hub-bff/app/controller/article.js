const Controller = require('egg').Controller;
module.exports = class ArticleController extends Controller {
    async saveArticleController (){
        const ctx = this.ctx
        const {body, header = {}} = ctx.request
        const {authorization:token} = header
        const {title,content, isDraft} = body
        if(!token){
            ctx.body = {
                code: 'FALL',
                message:'非法用户',
                content:''
            }
            return
        }
        const {name,id} = await ctx.service.token.index(token)
        if(!name || !id){
            ctx.body = {
                code: 'FALL',
                message:'非法用户',
                content:''
            }
            return
        }
        console.log('bff token', user)
        ctx.body = {
            code: 'SUCCESS',
            message:'成功',
            content:''
        }
    }
}
