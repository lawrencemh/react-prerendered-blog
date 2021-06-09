import Post from 'views/Post';
import Home from 'views/Home';
import Header from 'components/Header';
import ReduxStateObserver from 'components/ReduxStateObserver';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

function App() {
    return (
        <div className="app">
            <ReduxStateObserver/>
            <Router>
                <Header/>
                <Switch>
                    <Route path="/posts/:slug">
                        <Post/>
                    </Route>
                    <Route path="/categories/:slug">
                        <p>Category</p>
                    </Route>
                    <Route path="/authors/:author">
                        <p>Author</p>
                    </Route>
                    <Route path="/archive">
                        <p>Archive</p>
                    </Route>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="*">
                        404
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
