const Service = require('egg').Service;
module.exports = class ArticleService extends Service {
    async saveArticle({id,uid,title,content,isDraft}) {
        const ctx = this.ctx
        const result = await ctx.curl('http://127.0.0.1:7003/saveArticle', {
            // 必须指定 method
            method: 'POST',
            // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
            contentType: 'json',
            data: {
                id,uid,title,content,isDraft
            },
            // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
            dataType: 'json',
        })
        console.log('saveArticle',result)
        return result.data
    }
}