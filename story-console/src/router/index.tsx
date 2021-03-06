import  * as React from 'react'
import Loadable from 'react-loadable'
import  { Route } from 'react-router-dom'
import Res404 from '../component/result/404'
const loadingPage = Res404

const asyncDashboard = Loadable({
    loader: () => import('../view/dashboard'/* webpackChunkName: 'dashboard' */),
    loading: loadingPage
  })

  const asyncUser = Loadable({
    loader: () => import('../view/user'/* webpackChunkName: 'user' */),
    loading: loadingPage
  })
  const asyncWriting = Loadable({
    loader: () => import('../view/writing'/* webpackChunkName: 'writing' */),
    loading: loadingPage
  })
  

  const asyncArticleList = Loadable({
    loader: () => import('../view/articleList'/* webpackChunkName: 'article list' */),
    loading: loadingPage
  })

  export const routerList = [
    <Route path="/console/dashboard" key="/console/dashboard" exact component={asyncDashboard} />,
    <Route path="/console/writing" key="/console/writing" exact component={asyncWriting} />,  
    <Route path="/console/writing/:id" key="/console/writing/:id" exact component={asyncWriting} />,  
    <Route path="/console/myArticle" key="/console/myArticle" exact component={asyncArticleList} />,    
    <Route path="/console/user" key="/console/user" exact component={asyncUser} />
  ]