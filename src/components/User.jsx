import React from 'react'
import { Space, Card } from 'antd'
const { Meta } = Card

function User({ user }) {
    return (
        <>
            {!user ? (
                ''
            ) : (
                    <Space direction="vertical" size={12}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt={user.first_name} src={user.avatar} />}
                        >
                            <Meta title={`${user.first_name} ${user.last_name}}`} description={user.email} />
                        </Card>
                    </Space>
                )}
        </>
    )
}

export default User
