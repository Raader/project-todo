import React, { useEffect } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Register } from "./components/pages/Register";
import { Login } from "./components/pages/Login";
import { Home } from "./components/pages/Home";

import { NavMenu } from "./components/NavMenu";
import { Route, Switch } from "react-router";
import { Main } from "./components/pages/Main";
function App() {
  useEffect(() => {
    document.body.style.background = "#C5D9E2";
  }, []);
  return (
    <div className="App">
      <NavMenu></NavMenu>
      <Switch>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/register">
          <Register></Register>
        </Route>
        <Route path="/main">
          <Main></Main>
        </Route>
        <Route path="/">
          <Home></Home>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
