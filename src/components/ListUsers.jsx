import React, { useEffect, useState } from 'react';
const url = "https://reqres.in/api/users";

function ListUsers(props) {
    const [Users, setUsers] = useState([])

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
        <>
            <ul>
                {Users.map(user => {
                    return (
                        <li key={user.id} onClick={() => handelRoute(user.id)}>
                            <div className="box">
                                <img className="avatar" src={user.avatar} alt={user.first_name} />
                                <p>{`${user.first_name} ${user.last_name}`}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default ListUsers;
