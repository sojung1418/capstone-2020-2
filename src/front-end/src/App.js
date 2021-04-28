import React, { Component } from 'react';
import Login from './pages/Login';
import Main from './pages/Main';
import Signup from './pages/Signup';
import Analyze from './pages/AnalyzeOption';
import VideoPlay from './pages/VideoPlay';
import Result from './pages/Result';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from './UserContext';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: { id: 0, name: 'appUser', loggedIn: false },
    };
  }

  render() {
    return (
      <UserProvider user={this.state.user}>
        <Router>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/Login" component={Login} />
            <Route path="/Signup" component={Signup} />

            <Route path="/Analyze" component={Analyze} />
            <Route path="/VideoPlay" component={VideoPlay} />
            <Route path="/Result" component={Result} />
          </Switch>
        </Router>
      </UserProvider>
    );
  }
}

export default App;
