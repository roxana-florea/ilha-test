import React from 'react';
import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Video from './components/video-page/Video';
import Signin from './components/signin/Signin';
import Signup from './components/sign-up/Signup';
import { UserRoute } from './components/PrivateRoute'


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Signin} />
        <Route path="/signup" component={Signup} />
        {/* <Route path="/Dashboard" component={Dashboard} /> */}
        <Route path="/Video" component={Video} />
        <UserRoute path='/Dashboard'>
          <Dashboard />
        </UserRoute>
      </Switch>
    </Router>
  );
}

export default App;
