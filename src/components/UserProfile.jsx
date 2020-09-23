import React, { useState, useEffect } from 'react'
import { userAPIUrl, eventAPIUrl } from './static';

import { Link } from 'react-router-dom';
import moment from "moment";
import MyCalendar from "./MyCalendar";
import { UserOutlined } from '@ant-design/icons';
import { Row, Col, Button, Input, DatePicker, Space, Card, Layout, TimePicker, Alert } from 'antd';
const { RangePicker } = TimePicker;
const { Header, Content } = Layout;

// const timeFormat = 'HH:mm';
const { Meta } = Card;

const dateFormat = "YYYY-MM-DD HH:mm:ss"
const format = "HH";


function UserProfile(props) {
    const [user, setUser] = useState({});
    const [eventTitle, setEventTitle] = useState("");
    const [timeSlot, setTimeSlot] = useState(null);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const [unavailableHours, setUnavailableHours] = useState([]);
    const [onPosting, setOnPosting] = useState(false)

    useEffect(() => {
        setLoading(true);
        const id = window.location.pathname.split("/").pop() || ""
        fetchUser(userAPIUrl, id);
        fetchEvents(eventAPIUrl);
    }, [])

    const fetchEvents = (url) => {
        fetch(`${url}/events`).then(res => res.json()).then(({ events }) => {
            let hours = events.map(event => {
                return new Date(event.start).getHours();
            })
            setUnavailableHours(hours);

            console.log(hours, events, "events data");
        })
    }


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
        console.log(value, "onok..");
        const date = moment(value._d).format(dateFormat);
        setTimeSlot(date);
    }

    const handleSubmit = () => {
        console.log(timeSlot, "on submit");
        if (eventTitle && timeSlot) {
            setOnPosting(true);
            const hours = new Date(timeSlot).getHours();
            const end = new Date(timeSlot);
            end.setHours(hours + 1);

            // console.log(hours, "hours", timeSlot, "timeSlot", end, "end", end.getHours(), "endHours");

            const data = {
                title: eventTitle,
                start: new Date(timeSlot),
                end
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
                    setOnPosting(false)
                })
                .catch(err => console.log(err))
        } else {
            setError("Please fill all the fields");
            setOnPosting(false)
            setTimeout(() => {
                setError("")
            }, 2000);

        }
    }

    const handleEnter = (e) => {
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

                                            <TimePicker
                                                defaultValue={moment("00:00", format)}
                                                format={format}
                                                onChange={onChange}
                                                onOk={onOk}
                                                disabledHours={() => unavailableHours}
                                            />

                                            <Input type="text" placeholder="Enter Event Name" onChange={({ target }) => setEventTitle(target.value)} value={eventTitle} onKeyDown={handleEnter} />

                                            <Button type="primary" onClick={handleSubmit} loading={onPosting}>
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
