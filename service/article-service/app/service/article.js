const Service = require('egg').Service;
const V4 = require('uuid')

module.exports = class ArticleService extends Service {
    async handelEditArticle({ id, title, content, isDraft, uid }) {
        // let hasArticle = await this.app.mysql.get('article', { id, id })
        const tableName = isDraft ? 'article_draft' : 'article'
        let data = {
            id,
            uid,
            title,
            content
        }
        let result
        if (id) {
            // 更新
            result = await this.app.mysql.update(tableName, data)
        } else {
            // 创建
            data.id = V4()
            result = await this.app.mysql.insert(tableName, data)
        }
        return result.affectedRows === 1
    }
}