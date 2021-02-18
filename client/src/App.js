import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Video from './components/video-page/Video';
import Videorecording from './components/video-page/Videorecording';

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
