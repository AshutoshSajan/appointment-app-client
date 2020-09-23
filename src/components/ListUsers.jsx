import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Input, DatePicker, Space, Layout, Card } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;
const { Meta } = Card;

const url = "https://reqres.in/api/users";


function ListUsers(props) {
    const [users, setUsers] = useState([]);
    const [inputVal, setInputVal] = useState("")
    let [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        fetchUsers(url)
    }, []);

    const fetchUsers = (url) => {
        fetch(url)
            .then(res => res.json())
            .then(data => setUsers(data.data))
            .catch(err => console.log(err));
    }

    const handelRoute = (id) => {
        props.history.push(`users/${id}`);
    }

    const filterUsers = (str) => {
        let val = str.toLowerCase();

        let filteredUsers = users.filter(user => {
            return user.first_name.toLowerCase().startsWith(val) || user.last_name.toLowerCase().startsWith(val);
        });
        setFilteredUsers(filteredUsers);
    }

    const onInputChange = ({ target }) => {
        console.log("onInputChange", target);
        setInputVal(target.value);
        filterUsers(target.value)
    }

    const renderUsers = (users) => {
        return (
            <Row gutter={[20, 20]} justify="center">
                {
                    users.map(user => {
                        return (
                            <li key={user.id} onClick={() => handelRoute(user.id)}>
                                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                    <Card
                                        hoverable
                                        style={{ width: 240 }}
                                        cover={<img alt={user.first_name} src={user.avatar} />}
                                    >
                                        <Meta title={`${user.first_name} ${user.last_name}`} description="" />
                                    </Card>
                                </Col>
                            </li>
                        )
                    })
                }
            </Row >
        )
    }

    return (
        <Layout>
            <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
                <div className="container">
                    <Link className="logo">AppLogo</Link>

                    <div>
                        <Search
                            placeholder="Basic usage"
                            value={inputVal}
                            onChange={onInputChange}
                            onSearch={value => filterUsers(value)}
                            style={{ width: 300 }}
                        />
                    </div>
                </div>

            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>

                    <ul>
                        {filteredUsers.length ? renderUsers(filteredUsers) : users.length ? renderUsers(users) : null}
                    </ul>
                </div>
            </Content>
        </Layout>
    )
}

export default ListUsers;
