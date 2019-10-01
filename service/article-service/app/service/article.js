const Service = require('egg').Service;
const V4 = require('uuid')

module.exports = class ArticleService extends Service {
    async handelEditArticle({ id, title, content, isDraft, uid, type }) {
        // let hasArticle = await this.app.mysql.get('article', { id, id })
        const tableName = isDraft ? 'article_draft' : 'article'
        let data = {
            id,
            uid,
            title,
            content
        }
        console.log('handelEditArticle server', data)
        let result
        if (id) {
            // 更新
            // 如果 type 为 draft 同时 isDraft true 说明 编辑的也是草稿， 正常更新
            // 如果 type draft isDraft false 说明编辑的是草稿 保存成了 正式发布 需要删除草稿
            if (type === 'draft' && isDraft === false) {
                // 删除
                const del = await this.app.mysql.delete('article_draft', { id: id })
                // 发布
                const ins = await this.app.mysql.insert('article', data)
                return del.affectedRows === 1 && ins.affectedRows === 1
            }
            // 如果 type "formal" isDraft:true  说明编辑的是发布内容 要保存成草稿 需要在草稿库创建 之前发布库不动
            if (type === 'formal' && isDraft === true) {
                const ins = await this.app.mysql.insert('article_draft', data)
                return ins.affectedRows === 1
            }
            result = await this.app.mysql.update(tableName, data)
        } else {
            // 创建 
            data.id = V4()
            result = await this.app.mysql.insert(tableName, data)
        }
        return result.affectedRows === 1
    }

    async getMyArticle({ uid }) {
        const article = await this.app.mysql.select('article', { where: { uid: uid } }) || []
        const articleDraft = await this.app.mysql.select('article_draft', { where: { uid: uid } }) || []
        return {
            article: handleArticle(article, false) || [],
            articleDraft: handleArticle(articleDraft, true) || []
        }
    }

    async getArticle(){
        const article = await this.app.mysql.select('article') || []
        return handleArticle(article, false) || []
    }
}

function handleArticle(article, isDraft) {
    if (!article || !article.length) {
        return []
    }
    return JSON.parse(JSON.stringify(article)).map(item => {
        // item = JSON.parse(JSON.stringify(item))
        // const nid = JSON.parse(JSON.stringify(item.id))
        // const nuid = JSON.parse(JSON.stringify(item.uid))
        item.id = new Buffer(item.id).toString()
        item.uid = new Buffer(item.uid).toString()
        item.isDraft = isDraft
        return item
    })
}