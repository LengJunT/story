import React from 'react'
import ReactDOM from 'react-dom'
import RouterMapping from './router/root'
import 'moment/locale/zh-cn'
import './index.less'
ReactDOM.render(
    <RouterMapping />, document.getElementById('root')
)
