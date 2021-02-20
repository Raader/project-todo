import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Register } from "./features/user/Register";
import { Login } from "./features/user/Login";

function App() {
  return (
    <div className="App">
      <Register></Register>
      <Login></Login>
    </div>
  );
}

export default App;
