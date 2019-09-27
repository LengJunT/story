import React, { useState, useEffect } from 'react'
import { getMyArticle } from '../../action/article'
import {ArticleDataType} from '../../common/types'
import { List, message } from 'antd'
// import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import './index.scss'
// import { async } from 'q';

interface ArticleItemProps {
    data: ArticleDataType;
    onClick: Function;
}

interface ArticleData {
    article: Array<ArticleDataType> | undefined;
    articleDraft: Array<ArticleDataType> | undefined;
}

export default function ArticleList(props: RouteComponentProps) {
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
                articleDraft.map((item: ArticleDataType) => {
                    const { id } = item
                    return <ArticleItem data={{ ...item, draft: true }} key={id} onClick={handleClick} />
                })
            }
            {
                article.map((item: ArticleDataType) => {
                    const { id } = item
                    return <ArticleItem data={{ ...item }} key={id} onClick={handleClick} />
                })
            }
        </div>
    </div>)
    function handleClick(id: string) {
        return function () {
            props.history.push(`/console/writing/${id}`)
        }
    }

    async function getArt() {
        const data = await getMyArticle()
        const { content } = data
        setData(content)
        console.log('getArt', data)
    }
}

function ArticleItem(props: ArticleItemProps) {
    const { data, onClick:click } = props
    const { title, content, read, likeCount, collectionCount, draft, id } = data
    return (
        <div className="article-item" onClick={click(id)}>
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