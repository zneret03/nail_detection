import { Home, Dashboard } from "./pages";
import { HashRouter as Router, Route } from "react-router-dom";
import { NailProvider } from "./context/NailProvider";
import { UploadedProvider } from "./context/UploadedProvider";

function App() {
  return (
    <NailProvider>
      <UploadedProvider>
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Router>
      </UploadedProvider>
    </NailProvider>
  );
}

export default App;
