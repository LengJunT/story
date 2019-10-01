const Service = require('egg').Service;
module.exports = class UserService extends Service {
    async index({ id }) {
        const ctx = this.ctx
        const result = await ctx.curl('http://127.0.0.1:7001/getUserInfo', {
            // 必须指定 method
            method: 'POST',
            // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
            contentType: 'json',
            data: {
                id
            },
            // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
            dataType: 'json',
        })
        console.log('users',result)
        return result.data
    }
}