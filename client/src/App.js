import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Video from './components/Video Page/Video';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/Video" component={Video} />
      </Switch>
    </Router>
  );
}

export default App;
