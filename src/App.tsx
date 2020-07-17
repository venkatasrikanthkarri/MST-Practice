import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
// import { observer, Provider } from 'mobx-react'
// import { SignInRoute } from "./Authorization/routes/SignInAppRoute";
import { AuthRoutes } from "./Authorization/routes";
import "./App.css";

// @observer
class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>{AuthRoutes}</Switch>
      </Router>
    );
  }
}

export default App;
