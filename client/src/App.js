import {
    Switch,
    Route,
    Link
} from "react-router-dom";
import { useState } from "react";

import Home from './pages/Home';
import About from './pages/About';
import User from './components/User';
import AllUsers from './components/AllUsers';

function App() {

    const [user, setUser] = useState("");

    return (
        <>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                    <li>
                        <input type="text" name="user" value={user} onChange={e => setUser(e.target.value)} />
                        <Link to={`/users/${ user }`}><button>User</button></Link>
                    </li>
                </ul>
                <hr />
            </div>

            <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/users/:id">
                    <User />
                </Route>
                <Route path="/users">
                    <AllUsers />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </>
    );
}

export default App;
