import React, { useState, useEffect } from 'react';

function DBFetch() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [users, setUsers] = useState();

    useEffect(() => {
        populateUserData();
    }, []);

    const contents = users === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Userame</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user =>
                    <tr>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <>
            <h1 id="tableLabel">Users</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </>
    );
    
    async function populateUserData() {
        const response = await fetch(`${baseUrl}/user`);
        if (response.ok) {
            const data = await response.json();
            setUsers(data);
        }
    }
}

export default DBFetch;