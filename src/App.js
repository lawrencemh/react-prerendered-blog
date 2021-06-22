import Post from 'views/Post';
import Home from 'views/Home';
import Header from 'components/Header';
import AuthorList from 'views/AuthorList';
import CategoryList from 'views/CategoryList';
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
                    <Route path="/categories/:category">
                        <CategoryList/>
                    </Route>
                    <Route path="/authors/:author">
                        <AuthorList/>
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
