import {
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import AllUsers from './components/AllUsers';

function App() {

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
                </ul>
                <hr />
            </div>

            <Switch>
                <Route path="/about">
                    <About />
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
