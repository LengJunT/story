module.exports = async function getTokenData(ctx) {
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
    return data
}