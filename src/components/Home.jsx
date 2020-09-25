import React, { useState, useEffect } from 'react'
import { Row, Col, Layout, Menu, Spin } from 'antd'
import UsersList from './UsersList'
import MyCalendar from './MyCalendar'
import User from './User'

import { userAPIUrl } from "./static"
import { LoadingOutlined } from '@ant-design/icons'
const { Header, Content, Footer, Sider } = Layout

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />


function Home(props) {
    const [users, setUsers] = useState([])
    const [inputVal, setInputVal] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [activeUser, setActiveUser] = useState(null)


    useEffect(() => {
        setLoading(true)
        fetchUsers(userAPIUrl)
    }, [])

    const fetchUsers = (url) => {
        fetch(url)
            .then((res) => res.json())
            .then(({ data }) => {
                setUsers(data)
                setActiveUser(data[0])
                setLoading(false)
            })
            .catch((err) => console.log(err))
    }

    const filterUsers = (str) => {
        let val = str.toLowerCase()

        let filteredUsers = users.filter((user) => {
            return (
                user.first_name.toLowerCase().startsWith(val) ||
                user.last_name.toLowerCase().startsWith(val)
            )
        })
        setFilteredUsers(filteredUsers)
    }

    const onInputChange = ({ target }) => {
        setInputVal(target.value)
        filterUsers(target.value)
    }

    const handleClick = (id) => {
        const user = users.filter(user => user.id === id);
        setActiveUser(...user);
    }


    return (
        <div>
            <Sider
                style={{
                    overflow: 'scroll',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    background: "FFF"
                }}
            >
                <div className="logo" style={{ padding: '20px 0 20px 20px' }}>
                    TimeTracker
                </div>
                <Menu mode="inline">
                    {
                        loading ?
                            <Spin indicator={antIcon} />
                            : !users.length ? "" : (
                                <UsersList
                                    inputVal={inputVal}
                                    users={filteredUsers.length ? filteredUsers : users}
                                    onInputChange={onInputChange}
                                    filterUsers={filterUsers}
                                    handleClick={handleClick}
                                />
                            )
                    }
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '24px 16px 0', overflow: 'initial', height: '83vh' }}>

                    <Row gutter={[16, 16]} justify="space-around">
                        <Col>
                            {
                                activeUser ? <User user={activeUser} /> : ""
                            }
                        </Col>
                        <Col>
                            <MyCalendar />
                        </Col>
                    </Row>
                </Content>
                <Footer theme="dark" style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
        </Footer>
            </Layout>
        </div>
    )
}

export default Home
