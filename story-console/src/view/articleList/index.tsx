import React, { useState, useEffect } from 'react'
import { getMyArticle } from '../../action/article'
import { List, message } from 'antd'
import './index.scss'
// import { async } from 'q';

interface ArticleItemProps {
    creatTime: string;
    updateTime: string;
    uid: string
    id: string;
    title: string;
    content: string;
    likeCount?: number | null;
    read?: number | null;
    collectionCount?: number | null;
    draft?: boolean;
}
interface ArticleData {
    article: Array<ArticleItemProps> | undefined;
    articleDraft: Array<ArticleItemProps> | undefined;
}

export default function ArticleList() {
    const [loading, setLoading] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [data, setData] = useState<ArticleData>({ article: [], articleDraft: [] })
    useEffect(() => {
        getArt()
    }, [])
    const { article = [], articleDraft = [] } = data
    return (<div className="article-page">
        <div className="lists">
            {
                articleDraft.map((item: ArticleItemProps) => {
                    const { id } = item
                    return <ArticleItem {...item} key={id} draft />
                })
            }
            {
                article.map((item: ArticleItemProps) => {
                    const { id } = item
                    return <ArticleItem {...item} key={id} />
                })
            }
        </div>
    </div>)

    async function getArt() {
        const data = await getMyArticle()
        const { content } = data
        setData(content)
        console.log('getArt', data)
    }
}

function ArticleItem(props: ArticleItemProps) {
    const { title, content, read, likeCount, collectionCount, draft } = props
    return (
        <div className="article-item">
            <div className="article-item-title">
                {title}
            </div>
            {/* <div className="articl-item-content" dangerouslySetInnerHTML={{ __html: content }} /> */}
            {
                draft ? <span className="article-item-draft">草稿</span> : null
            }
            <div className="article-item-footer">
                <span className="">
                    阅读量：{read || 0}
                </span>
                <span className="">
                    点赞量：{likeCount || 0}
                </span>
                <span className="">
                    收藏量：{collectionCount || 0}
                </span>
            </div>
        </div>
    )
}