import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;

const url = "https://reqres.in/api/users";


export default function Home(props) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers(url)
  })

  const fetchUsers = (url) => {
    fetch(url).then(res => res.json()).then(data => setUsers(data.data));
  }

  const handelRoute = (id) => {
    props.history.push(`users/${id}`);
  }

  return (
    <div>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {!users.length ? null : users.map(user => {
              return (
                <Menu.Item key={user.id} icon={<UserOutlined />} onClick={() => handelRoute(user.id)} >
                  <img src={user.avatar} alt={user.first_name} />
                </Menu.Item>
              )
            })}
          </Menu>
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              content
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}




