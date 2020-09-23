import React, { useState, useEffect } from 'react'
import { userAPIUrl, eventAPIUrl } from './static';

import { Link } from 'react-router-dom';
import moment from "moment";
import MyCalendar from "./MyCalendar";
import { UserOutlined } from '@ant-design/icons';
import { Row, Col, Button, Input, DatePicker, Space, Card, Layout, TimePicker, Alert } from 'antd';
const { RangePicker } = TimePicker;
const { Header, Content } = Layout;

const timeFormat = 'HH:mm';


const { Meta } = Card;

const format = "YYYY-MM-DD HH:mm:ss"

function UserProfile(props) {
    const [user, setUser] = useState({});
    const [eventTitle, setEventTitle] = useState("");
    const [timeSlot, setTimeSlot] = useState([]);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const id = window.location.pathname.split("/").pop() || ""
        fetchUser(userAPIUrl, id);
    }, [])


    const fetchUser = (url, id) => {
        fetch(`${url}/${id}`)
            .then(res => res.json())
            .then(data => {
                setUser(data.data);
                setLoading(false);
            });
    }

    const onChange = (value, dateString) => {
        setTimeSlot(dateString);
    }

    const onOk = (value) => {
        if (value.length >= 2 && value[0] && value[1]) {
            const date = value.map(val => {
                return moment(val._d).format(format);
            })
            setTimeSlot(date);
        }

    }

    const handleSubmit = () => {
        if (eventTitle && timeSlot.length >= 2) {
            const data = {
                title: eventTitle,
                start: new Date(timeSlot[0]),
                end: new Date(timeSlot[1])
            }

            fetch(`${eventAPIUrl}/events`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(data => {
                    console.log(data, "post data res");
                    setEventTitle("");
                    setTimeSlot([]);
                })
                .catch(err => console.log(err))
        } else {
            setError("Please fill all the fields");
            setTimeout(() => {
                setError("")
            }, 2000);
        }
    }

    const handleEnter = (e) => {
        console.log(e);
        if (e.keyCode === 13) {
            return handleSubmit();
        } else return
    }

    return (
        <Layout>
            {
                !error ? null : <Alert style={{ position: "absolute", width: "100%" }} message={error} type="error" />
            }

            <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
                <div className="container">
                    <Link to="/" className="logo">AppLogo</Link>
                </div>
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
                <Row gutter={[16, 16]} justify="space-around">
                    <Col>
                        <div> {
                            loading ?
                                <>
                                    < Card style={{ width: 300, marginTop: 16 }} loading={true} />
                                    < Card style={{ width: 300, marginTop: 16 }} loading={true} />
                                </>
                                :
                                !user ? "user not found" :
                                    <>
                                        <Space direction="vertical" size={12}>
                                            <Card
                                                hoverable
                                                style={{ width: 240 }}
                                                cover={<img alt={user.first_name} src={user.avatar} />}
                                            >
                                                <Meta title={`${user.first_name} ${user.last_name}}`} description={user.email} />
                                            </Card>

                                            <RangePicker
                                                showTime={{ format: 'HH:mm' }}
                                                format="YYYY-MM-DD HH:mm"
                                                onChange={onChange}
                                                onOk={onOk}
                                            />

                                            <Input type="text" placeholder="Enter Event Name" onChange={({ target }) => setEventTitle(target.value)} value={eventTitle} onKeyDown={handleEnter} />

                                            <Button type="primary" onClick={handleSubmit}>
                                                Submit
                                    </Button>
                                        </Space>
                                    </>
                        }
                        </div>
                    </Col>
                    <Col>
                        <MyCalendar />
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export default UserProfile;
