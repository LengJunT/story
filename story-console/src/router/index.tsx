import  * as React from 'react'
import Loadable from 'react-loadable'
import  { Router, Route } from 'react-router-dom'
import Res404 from '../component/result/404'
const loadingPage = Res404

const asyncDashboard = Loadable({
    loader: () => import('../view/dashboard'/* webpackChunkName: 'dashboard' */),
    loading: loadingPage
  })

  const asyncUser = Loadable({
    loader: () => import('../view/user'/* webpackChunkName: 'dashboard' */),
    loading: loadingPage
  })
  const asyncWriting = Loadable({
    loader: () => import('../view/writing'/* webpackChunkName: 'dashboard' */),
    loading: loadingPage
  })

  export const routerList = [
    <Route path="/console/dashboard" key="/console/dashboard" exact component={asyncDashboard} />,
    <Route path="/console/writing" key="/console/writing" exact component={asyncWriting} />,    
    <Route path="/console/user" key="/console/user" exact component={asyncUser} />
  ]