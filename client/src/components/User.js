import React from 'react';
import { useParams } from 'react-router-dom';

function User() {
    let { userId } = useParams();

    return (
        <div>
            <h3>User: {userId} </h3>
        </div>
    );
}

export default User;
