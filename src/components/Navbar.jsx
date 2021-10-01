import React, { useState } from 'react';

import styled from 'styled-components';
import { AutoComplete, Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom';

import Measurements from 'screens/Measurements';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Logo = styled.div`
  float: left;
  width: 125px;
  height: 31px;
  margin: 16px 24px 16px 0;
`;

const Navbar = () => {
  return (
    <Layout>
      <Header style={{ background: '#fff' }}>
        <Logo>
          <h1 style={{ fontSize: '24px' }}> MoniCare </h1>
        </Logo>

        <Menu mode='horizontal'>
          {/* <Menu.Item key='3'> Opção superior </Menu.Item> */}
        </Menu>
      </Header>

      <Layout>
        <Sider>
          <Menu mode='inline'
            style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item key='0' icon={<HomeOutlined />}>
              <Router>
                <Link to='/'> Home </Link>
              </Router>
            </Menu.Item>

            <SubMenu key='1' icon={<UserOutlined />} title='Paciente'>
              <Menu.Item key='2'> 
                <Router>
                  <Link to='/measurements'> Medições </Link>
                </Router>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        
        <Layout style={{ padding: '0 24px 24px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <Content style={{
              padding: 24,
              margin: '15px 0px',
              minHeight: 620,
              maxHeight: 620,
              overflow: 'auto',
              background: '#fff'
            }}>
              <Measurements />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Navbar;