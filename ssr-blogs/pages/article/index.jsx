import React from 'react'
import Layout from '../../components/layout.js'
import fetch from 'isomorphic-unfetch'
import { handleDate } from '../../util'
import { withRouter } from 'next/router'
import Link from 'next/link'
import BraftEditorCss from 'braft-editor/dist/output.css'
import Head from 'next/head'

class ArticleIndex extends React.Component {
    state = {}

    static async getInitialProps() {
        const res = await fetch('http://127.0.0.1:7002/getArticle')
        const data = await res.json()
        return {
            articleList: data.content,
        }
    }

    componentDidMount() {
        console.log('123')
        console.log('this.props 123', this.props)
        this.setState({
            articleList: this.props.articleList
        })
    }

    render() {
        const { activeArticleItem = this.defaultActiveArticleItem() } = this.state
        const { id: activeId, content: activeContent, title: activeTitle, updateTime: activeUpdateTime, userInfo } = activeArticleItem
        const { name: activeName } = userInfo
        console.log('this.props', this.props)
        return (
            <Layout>
                <Head>
                    <style dangerouslySetInnerHTML={{ __html: BraftEditorCss }}></style>
                </Head>
                <div className="memo-app">
                    <div className="memo-app-header">
                        <div className="app-toolbar">
                            <span className="app-close"></span>
                            <span className="app-min"></span>
                            <span className="app-max"></span>
                        </div>
                        <div className="app-query-right">
                            <input placeholder="搜索" onChange={this.handleQuery} />
                        </div>
                    </div>
                    <div className="memo-app-content">
                        <div className="memo-app-content-left">
                            {
                               this.renderList()
                            }
                        </div>
                        <div className="memo-app-content-right">
                            <div className="memo-app-content-right-html">
                                <div className="memo-app-content-right-html-head">
                                    <div className="memo-app-content-right-html-head-subtitle">
                                        <span>{activeName}</span><span>{handleDate(activeUpdateTime)}</span>
                                    </div>
                                    <h1>{activeTitle}</h1>
                                </div>
                                <div className="memo-app-content-right-html-body braft-output-content"
                                     dangerouslySetInnerHTML={{ __html: activeContent }} />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }

    renderList = ()=>{
        const { articleList: articleListProps = [] } = this.props
        const { activeArticleItem = this.defaultActiveArticleItem(), articleList = articleListProps } = this.state
        const { id: activeId } = activeArticleItem
        if(!articleList || articleList.length === 0){
            return <div>暂无数据</div>
        }
        return  articleList.map(item => {
            const { title, id, likeCount, updateTime, userInfo = {}, content } = item
            const { name } = userInfo
            return <Link href={{ pathname: '/article', query: { id: id } }} key={id}>
                <a className="memo-app-content-left-row" key={id}
                   active={(id === activeId).toString()}
                   onClick={this.activeArticle(item)}
                >
                    <div className="memo-app-content-left-row-title">{title}</div>
                    <div className="memo-app-content-left-row-footer">
                        <div
                            className="memo-app-content-left-row-footer-data">{handleDate(updateTime)}</div>
                        <div className="memo-app-content-left-row-footer-des">{name}</div>
                    </div>
                </a>
            </Link>
        })
    }

    activeArticle = (item) => (e) => {
        this.setState({
            activeArticleItem: item
        })
    }

    handleQuery = (e)=>{
        const { articleList: articleListProps = [] } = this.props
        const value = e.target.value
        const newList = articleListProps.filter(item=>{
            return item.title.indexOf(value) > -1
        })
        this.setState({
            articleList:newList
        })
    }

    defaultActiveArticleItem = () => {
        const { router: { query: { id } = {} } = {}, articleList = [] } = this.props
        const activeArticleItem = articleList.find(item => item.id === id)
        return activeArticleItem
    }
}

export default withRouter(ArticleIndex)
