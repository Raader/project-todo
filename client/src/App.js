import React, { Fragment, useEffect } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Register } from "./components/pages/Register";
import { Login } from "./components/pages/Login";
import { Home } from "./components/pages/Home";

import { NavMenu } from "./components/NavMenu";
import { Route, Switch } from "react-router";
import { Main } from "./components/pages/Main";
import { useDispatch } from "react-redux";
import { getUser } from "./features/user/userSlice";
import { SelectProject } from "./components/pages/SelectProject";
import { Col, Container, Row } from "react-bootstrap";
import { ProjectSection } from "./components/ProjectSection";

const routes = [
  {
    path: "/login",
    body: <Login></Login>,
    sidebar: false,
    alias: "login",
    title: true,
  },
  {
    path: "/register",
    body: <Register></Register>,
    sidebar: false,
    alias: "register",
    title: true,
  },
  {
    path: "/select",
    body: <SelectProject></SelectProject>,
    sidebar: true,
    alias: "select",
  },
  { path: "/main", body: <Main></Main>, sidebar: true, alias: "main" },
  { path: "/", body: <Home></Home>, sidebar: false, alias: "home" },
];
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    document.body.style.background = "#F0F8FE";
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    dispatch(getUser(token)).catch((err) => console.error(err));
  }, [dispatch]);
  return (
    <div className="App">
      <Switch>
        {routes.map((route) => (
          <Route path={route.path}>
            {route.title ? (
              <div className="header-brand">
                <i class="fas fa-list-alt"></i> PROJECT-TODO
              </div>
            ) : (
              <Fragment></Fragment>
            )}
            {route.sidebar ? (
              <Container fluid>
                <Row>
                  <Col className="no-padding" md="auto">
                    <ProjectSection path={route.alias}></ProjectSection>
                  </Col>
                  <Col className="no-padding">{route.body}</Col>
                </Row>
              </Container>
            ) : (
              route.body
            )}
          </Route>
        ))}
      </Switch>
    </div>
  );
}

export default App;
