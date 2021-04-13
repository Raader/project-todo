import { Section } from "./Section";
import "../styles/ListColumn.css";
import { useEffect, useState } from "react";
import { Button, InputGroup, FormControl, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  completeTodo,
  selectProject,
  setSelectedTodo,
} from "../features/project/projectSlice";
import { TodoBar } from "./TodoBar";
import { useHistory } from "react-router";

export function ListSection(props) {
  const [todos, setTodos] = useState([]);
  const ts = useSelector(selectProject);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!ts.todos) return;
    const list = ts.todos.map((val) => val);
    list.sort((a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0));
    setTodos(list);
  }, [ts]);

  const todoStats = (stats) => {
    const clrs = ["#2ECFCA", "#F8DF77", "#FF4E62"];
    if (!stats) return;
    const imp = [];
    for (let i = 0; i < stats.importance; i++) {
      imp.push(<i class="fas fa-exclamation"></i>);
    }
    const time = [];
    for (let i = 0; i < stats.time; i++) {
      time.push(<i class="fas fa-hourglass"></i>);
    }
    const diff = [];
    for (let i = 0; i < stats.difficulty; i++) {
      diff.push(<i class="fas fa-plus-circle"></i>);
    }
    return (
      <div className="stat-cont">
        <span
          className="stat"
          id="first"
          style={
            imp.length > 0
              ? { color: clrs[imp.length - 1] }
              : { color: "transparent" }
          }
        >
          {imp.length > 0 ? imp : "a"}
        </span>{" "}
        <span
          className="stat"
          style={
            time.length > 0
              ? { color: clrs[time.length - 1] }
              : { color: "transparent" }
          }
        >
          {time.length > 0 ? time : "a"}
        </span>{" "}
        <span
          className="stat"
          style={
            diff.length > 0
              ? { color: clrs[diff.length - 1] }
              : { color: "transparent" }
          }
        >
          {diff.length > 0 ? diff : "a"}
        </span>
      </div>
    );
  };
  return (
    <div className="todo-main">
      <Section>
        <div className="todo-top-menu">
          <Dropdown>
            <Dropdown.Toggle variant="nobtn" id="dropdown-basic">
              <i class="fas fa-bars"></i> {ts.name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => history.push("/select")}>
                <i class="fas fa-exchange-alt"></i> Change Project
              </Dropdown.Item>
              <Dropdown.Item>
                <i class="fas fa-edit"></i> Edit Project
              </Dropdown.Item>
              <Dropdown.Item id="delete">
                <i class="fas fa-trash"></i> Delete Project
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <span className=""></span>
        </div>
        <div className="todo-top">
          <TodoBar></TodoBar>
        </div>
        <div className="todo-list">
          {ts && ts.todos ? (
            todos.map((todo) =>
              !todo.completed ? (
                <div
                  className="list-item"
                  onClick={() => dispatch(setSelectedTodo(todo))}
                >
                  <span
                    className="todo-box"
                    onClick={() => dispatch(completeTodo(todo))}
                  >
                    <i class="far fa-square"></i>
                  </span>{" "}
                  <span className="main">{todo.name}</span>
                  <span className="todo-append">{todoStats(todo.stats)}</span>
                </div>
              ) : (
                <div
                  className="list-item completed"
                  onClick={() => dispatch(completeTodo(todo))}
                >
                  <span className="todo-box">
                    <i class="fas fa-square"></i>
                  </span>{" "}
                  <span className="main">{todo.name}</span>
                </div>
              )
            )
          ) : (
            <div></div>
          )}
        </div>
      </Section>
    </div>
  );
}
