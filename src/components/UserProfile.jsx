import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import moment from "moment";
import MyCalendar from "./MyCalendar";
import { UserOutlined } from '@ant-design/icons';
import { Row, Col, Button, Input, DatePicker, Space, Card, Layout, TimePicker } from 'antd';
// const { RangePicker } = DatePicker;
const { RangePicker } = TimePicker;
const { Header, Content } = Layout;

const timeFormat = 'HH:mm';


const { Meta } = Card;
const url = "https://reqres.in/api/users/";
const eventAPIurl = "http://localhost:8000/api/v1/events";

const format = "YYYY-MM-DD HH:mm:ss"

function UserProfile(props) {
    const [user, setUser] = useState({});
    const [eventTitle, setEventTitle] = useState("");
    const [timeSlot, setTimeSlot] = useState([]);

    useEffect(() => {
        const id = window.location.pathname.split("/").pop() || ""
        fetchUser(url, id);
    }, [])


    const fetchUser = (url, id) => {
        fetch(url + id)
            .then(res => res.json())
            .then(data => setUser(data.data));
    }

    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        setTimeSlot(dateString);
    }

    const onOk = (value) => {
        if (value.length >= 2 && value[0] && value[1]) {
            const date = value.map(val => {
                return moment(val._d).format(format);
            })

            console.log(date, "date");
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

            fetch(eventAPIurl, {
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
            alert("No data found");
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
            <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
                <div className="container">
                    <Link to="/" className="logo">AppLogo</Link>
                </div>
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
                <Row gutter={[16, 16]} justify="space-around">
                    <Col>
                        <div> {
                            !user ? "no user" :
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
