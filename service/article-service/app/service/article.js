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

    async getMyArticle({ uid }) {
        const article = await this.app.mysql.select('article', { where:{uid: uid} }) || []
        const articleDraft = await this.app.mysql.select('article_draft', { where:{uid: uid} }) || []
        return {
            article: handleArticle(article) || [],
            articleDraft: handleArticle(articleDraft) || []
        }
    }
}

function handleArticle(article) {
    if(!article || !article.length){
        return []
    }
    return JSON.parse(JSON.stringify(article)).map(item => {
        // item = JSON.parse(JSON.stringify(item))
        // const nid = JSON.parse(JSON.stringify(item.id))
        // const nuid = JSON.parse(JSON.stringify(item.uid))
        item.id = new Buffer(item.id).toString()
        item.uid = new Buffer(item.uid).toString()
        return item
    })
}