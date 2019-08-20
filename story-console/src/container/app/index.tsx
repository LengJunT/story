import React, { useState } from 'react';
import { Switch, Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {routerList} from '../../router'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
export default function App (){
    const [collapsed, setCollapse] = useState<boolean>(false)
    const onCollapse = ()=> setCollapse(!collapsed)
    return (
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['dashboard']} mode="inline">
            <Menu.Item key="/console/dashboard">
              <Link to="/console/dashboard"><span>仪表盘</span></Link>
            </Menu.Item>
            <Menu.Item key="/console/writing">
              <Link to="/console/writing"><span>写文章</span></Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ background: '#fff', padding: 0 }}>
            <Switch>{routerList}</Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Story ©2018 Created by LengJunT</Footer>
        </Layout>
      </Layout>
    )
}