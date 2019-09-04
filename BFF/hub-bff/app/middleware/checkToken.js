module.exports = (options, app) => {
    return async function checkToken(ctx, next) {
        const { header = {} } = ctx.request
        const { authorization: token } = header
        if (!token) {
            ctx.body = {
                code: 'FALL',
                message: '请登录',
                content: ''
            }
            return
        }
        const data = await ctx.service.token.index(token)
        const { name, id } = data
        if (!name || !id) {
            ctx.body = {
                code: 'FALL',
                message: '非法用户',
                content: ''
            }
            return
        }
        console.log('check toke', data, ' /n')
        await next()
    }
}