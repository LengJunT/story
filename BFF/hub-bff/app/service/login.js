const Service = require('egg').Service;
module.exports = class LoginService extends Service {
    async index({ name, passWord }) {
        const ctx = this.ctx
        const result = await ctx.curl('http://127.0.0.1:7001/login', {
            // 必须指定 method
            method: 'POST',
            // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
            contentType: 'json',
            data: {
                name, passWord
            },
            // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
            dataType: 'json',
        })
        console.log('result',result)
        return result.data
    }
}