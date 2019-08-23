import React, { useState } from 'react';
import { Switch, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { RouteComponentProps } from 'react-router'
import { routerList } from '../../router'
import { getSessionTokenOrLocal, logout } from '../../util'
import './index.scss'
const { Header, Content, Footer, Sider } = Layout;
export default function App(props: RouteComponentProps) {
  const [collapsed, setCollapse] = useState<boolean>(false)
  const onCollapse = () => setCollapse(!collapsed)
  const defaultsKeys = props.location.pathname
  const token = getSessionTokenOrLocal()
  if (token === '') {
    debugger
    logout()
    return null
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={[defaultsKeys]} mode="inline">
          <Menu.Item key="/console/dashboard">
            <Link to="/console/dashboard"><span>仪表盘</span></Link>
          </Menu.Item>
          <Menu.Item key="/console/writing">
            <Link to="/console/writing"><span>写文章</span></Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="layout-header" />
        <Content style={{ background: '#fff', padding: 0 }}>
          <Switch>{routerList}</Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Story ©2018 Created by LengJunT</Footer>
      </Layout>
    </Layout>
  )
}