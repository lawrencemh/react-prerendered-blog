import Post from 'views/Post';
import Header from 'components/Header';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

function App() {
    return (
        <div className="app">
            <Router>
                <Header/>
                <Switch>
                    <Route path="/posts/:slug">
                        <Post/>
                    </Route>
                    <Route path="/">
                        Welcome home!
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
