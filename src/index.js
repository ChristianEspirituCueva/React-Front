import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import {
  NavBar,
  Footer,
  Home,
  Candidate,
  Voter
} from "./components";

ReactDOM.render(
  /*--<React.StrictMode>
    <App />
  </React.StrictMode>,
  --*/
  <Router>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Candidate" element={<Candidate />} />
      <Route path="/Voter" element={<Voter />} />
    </Routes>
    <Footer />
  </Router>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
