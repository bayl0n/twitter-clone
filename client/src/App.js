import Home from "./pages/Home";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <nav>
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
                </nav>
            </div>

            <Switch>
                <Route path="/about">
                    <h1>About</h1>
                </Route>
                <Route path="/users">
                    <h1>Users</h1>
                </Route>
                <Route path="/">
                    <h1>Home</h1>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
