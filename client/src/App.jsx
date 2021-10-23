import { Home, Dashboard } from './pages'
import { HashRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/dashboard" component={Dashboard} />
    </Router>
  );
}

export default App;
