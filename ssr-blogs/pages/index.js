import React from 'react'
import Layout from '../components/layout.js'
export default class index extends React.Component {
    render() {
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
                        <div className="books-app-data books-app-item-row">
                            <div className="books-app-data-name">名称</div>
                            <div className="books-app-data-author">作者</div>
                            <div className="books-app-data-star">star</div>
                            <div className="books-app-data-tags">标签</div>
                            <div className="books-app-data-date">时间</div>
                        </div>
                        <div className="books-app-data books-app-item-row">
                            <div className="books-app-data-name">名称</div>
                            <div className="books-app-data-author">作者</div>
                            <div className="books-app-data-star">star</div>
                            <div className="books-app-data-tags">标签</div>
                            <div className="books-app-data-date">时间</div>
                        </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}