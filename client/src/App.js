import React, { useEffect } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Register } from "./features/user/Register";
import { Login } from "./features/user/Login";
import { Home } from "./components/Home";

import { NavMenu } from "./components/NavMenu";

function App() {
  useEffect(() => {
    document.body.style.background = "#C5D9E2";
  }, []);
  return (
    <div className="App">
      <NavMenu></NavMenu>
      <Home></Home>
    </div>
  );
}

export default App;
