import { Row, Col, Button, Input, DatePicker, Space } from 'antd';
import React, { useEffect, useState } from 'react';
const url = "https://reqres.in/api/users";


function ListUsers(props) {
    const [users, setUsers] = useState([]);
    const [inputVal, setInputVal] = useState("")
    let [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        fetchUsers(url)
    }, []);

    const fetchUsers = (url) => {
        fetch(url).then(res => res.json()).then(data => setUsers(data.data));
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
        setInputVal(target.value);
        filterUsers(target.value)
    }

    const renderUsers = (users) => {
        return users.map(user => {
            return (
                <li key={user.id} onClick={() => handelRoute(user.id)}>
                    <div className="box">
                        <img className="avatar" src={user.avatar} alt={user.first_name} />
                        <p>{`${user.first_name} ${user.last_name}`}</p>
                    </div>
                </li>
            )
        })
    }

    return (
        <>
            <Input placeholder="Basic usage" value={inputVal} onChange={onInputChange} />

            <ul>
                {filteredUsers.length ? renderUsers(filteredUsers) : users.length ? renderUsers(users) : null}
            </ul>
        </>
    )
}

export default ListUsers;
