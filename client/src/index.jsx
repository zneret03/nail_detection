import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./global/GlobalVariables.scss"
import 'react-image-crop/dist/ReactCrop.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
