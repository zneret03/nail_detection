import { Home, Dashboard } from "./pages";
import { MemoryRouter as Router, Route } from "react-router-dom";
import { NailProvider } from "./context/NailProvider";
import { UploadedProvider } from "./context/UploadedProvider";
import { ErrorProvider } from "./context/ErrorProvider";
import { DiseaseProvider } from "./context/DiseaseProvider";

function App() {
  return (
    <DiseaseProvider>
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
    </DiseaseProvider>
  );
}

export default App;
