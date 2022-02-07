import { Home, Dashboard } from "./pages";
import { HashRouter as Router, Route } from "react-router-dom";
import { NailProvider } from "./context/NailProvider";
import { UploadedProvider } from "./context/UploadedProvider";
import { ErrorProvider } from "./context/ErrorProvider";

function App() {
  return (
    <NailProvider>
      <UploadedProvider>
        <ErrorProvider>
          <Router>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Router>
        </ErrorProvider>
      </UploadedProvider>
    </NailProvider>
  );
}

export default App;
