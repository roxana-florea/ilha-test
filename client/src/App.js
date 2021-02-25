import React from 'react';
import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Video from './components/video-page/Video';
import Signin from './components/signin/Signin';
import Signup from './components/sign-up/Signup';
import { UserRoute } from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Signin} />
        <Route path="/signup" component={Signup} />
        {/* <Route path="/Dashboard" component={Dashboard} /> */}
        <UserRoute path="/Dashboard">
          <Dashboard />
        </UserRoute>
        <UserRoute path="/videoroom/:roomId" component={Video} />
      </Switch>
    </Router>
  );
}

export default App;
