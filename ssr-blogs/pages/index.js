import React from 'react'
import Layout from '../components/layout.js'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'
export default class index extends React.Component {
    static async getInitialProps() {
        const res = await fetch('http://127.0.0.1:7002/getArticle')
        const data = await res.json();
        return {
            articleList: data.content
        }
    }
    render() {
        console.log('this.props', this.props)
        const { articleList = [] } = this.props
        return (
            <Layout>
                <div className="books-app">
                    <div className="books-app-header">
                        <div className="app-toolbar">
                            <span className="app-close"></span>
                            <span className="app-min"></span>
                            <span className="app-max"></span>
                        </div>
                        图书
                    </div>
                    <div className="books-app-content">
                        <div className="books-app-content-header books-app-data">
                            <div className="books-app-data-name">名称</div>
                            <div className="books-app-data-author">作者</div>
                            <div className="books-app-data-star">star</div>
                            <div className="books-app-data-tags">标签</div>
                            <div className="books-app-data-date">时间</div>
                        </div>
                        <div className="books-app-content-list">
                            {
                                articleList.map(item => {
                                    const { title, id, likeCount, updateTime, userInfo = {} } = item
                                    const { name } = userInfo
                                    return (
                                        <div className="books-app-data books-app-item-row" key={id}>
                                            <div className="books-app-data-name">{title}</div>
                                            <div className="books-app-data-author">{name}</div>
                                            <div className="books-app-data-star">{likeCount}</div>
                                            <div className="books-app-data-tags">
                                                {/* 标签 */}
                                            </div>
                                            <div className="books-app-data-date">{handleDate(updateTime)}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

function handleDate(time) {
    if (time) {
        console.log(time)
        return moment(time).format('YYYY-MM-DD')
    }
    return ''
}