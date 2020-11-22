import React from "react";
import ReactDOM from "react-dom";
import { MoviesProvider } from "movies-context";
import App from "containers/app";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <MoviesProvider>
      <App />
    </MoviesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
