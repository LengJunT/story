import React from 'react'
import Head from 'next/head'
import Styles from '../css/index.scss'

export default class extends React.Component {
    render() {
        return <React.Fragment>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{this.props.title || 'Story'}</title>
                <style dangerouslySetInnerHTML={{ __html: Styles }}></style>
            </Head>
                <div className="macbook">
                    <img className="macbook-img" src="/static/macboog-retina-big.png" />
                    <div className="macbook-content">
                        <img className="macbook-content-img" src="/static/Yosemite 4.jpg" />
                        <React.Fragment>
                    {this.props.children}
                </React.Fragment>
                    </div>
                </div>
        </React.Fragment>
    }
} 