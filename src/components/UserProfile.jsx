import { Row, Col, Button, Input, DatePicker, Space } from 'antd';
import MyCalendar from "./MyCalendar";
import moment from "moment";
import React, { useState, useEffect } from 'react'
const url = "https://reqres.in/api/users/";
const { RangePicker } = DatePicker;

function UserProfile(props) {
    const [user, setUser] = useState({});
    const [eventTitle, setEventTitle] = useState("");
    const [timeSlot, setTimeSlot] = useState([]);

    useEffect(() => {
        const id = window.location.pathname.split("/").pop() || ""
        fetchUser(url, id);
    }, [])


    const fetchUser = (url, id) => {
        fetch(url + id).then(res => res.json()).then(data => setUser(data.data));
    }

    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        setTimeSlot(dateString);
    }

    const onOk = (value) => {
        console.log('onOk: ', value);
        moment.format("YYYY-MM-DD HH:mm");
        // console.log('onOk Formatted Selected Time: ', dateString);
    }

    return (
        <div>
            <Row gutter={[16, 16]} justify="space-around">
                <Col>
                    <div> {
                        !user ? "no user" :
                            <div className="box">
                                <img className="avatar" src={user.avatar} alt={user.first_name} />
                                <p>{`${user.first_name} ${user.last_name}`}</p>
                                <p>{user.email}</p>
                                <Space direction="vertical" size={12}>
                                    <RangePicker
                                        showTime={{ format: 'HH:mm' }}
                                        format="YYYY-MM-DD HH:mm"
                                        onChange={onChange}
                                        onOk={onOk}
                                    />
                                    <input type="text" placeholder="Enter Event Name" onChange={({ target }) => setEventTitle(target.value)} value={eventTitle} />

                                    <Button type="primary" ghost>
                                        Submit
                                </Button>
                                </Space>
                            </div>
                    }
                    </div>
                </Col>
                <Col>
                    <MyCalendar />
                </Col>
            </Row>


        </div>

    )
}

export default UserProfile;
