import React, { useState, useEffect } from 'react'
const url = "https://reqres.in/api/users/";


function UserProfile(props) {
    const [user, setUser] = useState({});


    useEffect(() => {
        const id = window.location.pathname.split("/").pop() || ""
        fetchUser(url, id);
    })


    const fetchUser = (url, id) => {
        fetch(url + id).then(res => res.json()).then(data => setUser(data.data));
    }

    return (
        <div> {
            !user ? "no user" :
                <div>
                    <img src={user.avatar} alt={user.first_name} />
                    <p>{user.id}</p>
                    <p>{user.first_name}</p>
                    <p>{user.last_name}</p>
                    <p>{user.email}</p>
                </div>
        }
        </div>
    )
}

export default UserProfile;
