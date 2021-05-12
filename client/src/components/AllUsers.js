import React from 'react';
import { useState } from 'react';
import { useRouteMatch, Link, Switch, Route } from 'react-router-dom';

import User from './User';

function AllUsers() {

    let { path, url } = useRouteMatch();
    const [user, setUser] = useState("");

    return (
        <div>
            <h1>Search for a user</h1>

            <input type="text" name="user" value={user} onChange={e => setUser(e.target.value)} />
            <Link to={`${ url }/${ user }`}><button>Search</button></Link>

            <Switch>
                <Route exact path={path}>
                    <h3>Search for a user</h3>
                </Route>
                <Route path={`${ path }/:userId`}>
                    <User />
                </Route>
            </Switch>
        </div>
    );
}

export default AllUsers;
