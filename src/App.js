import React, {useState} from 'react';
import { Layout, Menu, Breadcrumb, Space } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './App.css';
import Index from './pages/Index';
import UpMes from './pages/UpMes';
import MapIndex from './pages/MapIndex';
import DailyUpdate from './pages/DailyUpdate';
import TypeUpdate from './pages/TypeUpdate';
import { Link, Redirect, Route, Switch } from 'react-router-dom';

const { Header, Sider, Content } = Layout;


function App() {

  const [collapsed, setCollapsed] = useState(false)

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className='outer'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to='/index'>
              首页
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link to='/up/mes'>
              百大UP主
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
          <Link to='/rank/list'>
              排行榜
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UploadOutlined />}>
          <Link to='/update/daily'>
              每日更新
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Space size={30}>
          {collapsed ? <MenuUnfoldOutlined className='trigger' onClick={toggle} /> : <MenuFoldOutlined className='trigger' onClick={toggle}/>}
          <Breadcrumb >
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href>排名列表</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>hhh</Breadcrumb.Item>
            </Breadcrumb>
            </Space>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            minHeight:400,
            overflow:'auto'
          }}
          id='content'
        >
          <Switch>
            <Route path='/rank/list' component={Index} />
            <Route path='/up/mes' component={UpMes} />
            <Route path='/index' component={MapIndex}/>
            <Route path='/update/daily' component={DailyUpdate}/>
            <Route path='/update/time' component={TypeUpdate}/>
            <Redirect to='/rank/list' />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
