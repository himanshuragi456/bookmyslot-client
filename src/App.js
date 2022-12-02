import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import ForgotPassword from "./components/ForgotPassword";
import Movies from "./components/Movies";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [Auth, setAuth] = useState(false);

  // also update base URL in side panel
  const BaseURL = "http://18.217.43.248:8001";

  useEffect(() => {
    if (localStorage.getItem("userAuth") === "true") {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            {Auth ? (
              <Dashboard BaseURL={BaseURL} />
            ) : (
              <Login BaseURL={BaseURL} />
            )}
          </Route>
          <Route path="/register">
            <Register BaseURL={BaseURL} />
          </Route>
          <Route path="/forgotpassword">
            <ForgotPassword BaseURL={BaseURL} />
          </Route>
          <Route path="/settings" exact>
            {Auth ? <Settings BaseURL={BaseURL} /> : <Login />}
          </Route>
          <Route path="/movies" exact>
            {Auth ? <Movies BaseURL={BaseURL} /> : <Login />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
