import React from 'react'

import { Input, Layout } from 'antd'
const { Content } = Layout
const { Search } = Input

function UsersList({
    inputVal,
    onInputChange,
    filterUsers,
    users,
    handleClick
}) {

    return (
        <Layout style={{ height: '100vh' }}>
            <div>
                <div style={{ marginTop: '10px' }}>
                    <Search
                        placeholder="Basic usage"
                        value={inputVal}
                        onChange={onInputChange}
                        onSearch={(value) => filterUsers(value)}
                        style={{ width: "auto" }}
                    />
                </div>
            </div>
            <Content style={{ margin: '24px 16px 0' }}>
                <div className="site-layout-background" style={{ minHeight: 360 }}>
                    <ul>
                        {!users.length ? "no users" : users.map(user => {
                            return (
                                <li key={user.id}>
                                    <div className="box" onClick={() => handleClick(user.id)}>
                                        <img className="avatar" alt={user.first_name} src={user.avatar} />
                                        <p style={{ color: '#111' }}>{`${user.first_name} ${user.last_name}`}</p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>

                </div>
            </Content>
        </Layout >
    )
}

export default UsersList
