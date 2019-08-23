const Service = require('egg').Service;
module.exports = class TokenService extends Service {
    async index(token) {
        const ctx = this.ctx
        console.log('bff token server',token)
        const result = await ctx.curl('http://127.0.0.1:7001/checkToken', {
            // 必须指定 method
            method: 'POST',
            // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
            contentType: 'json',
            data: {token},
            // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
            dataType: 'json',
        })
        console.log('result token',result)
        return result.data
    }
}