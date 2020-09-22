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
                            <img src={user.avatar} alt={user.first_name} />
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default ListUsers;
