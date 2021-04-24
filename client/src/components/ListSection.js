import { Section } from "./Section";
import "../styles/ListColumn.css";
import { useEffect, useState } from "react";
import { Button, InputGroup, FormControl, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  completeTodo,
  selectCurrentTodo,
  selectProject,
  selectSyncing,
  setSelectedTodo,
} from "../features/project/projectSlice";
import { TodoBar } from "./TodoBar";
import { useHistory } from "react-router";
import { OrderBar } from "./OrderBar";

export function ListSection(props) {
  const createdSorter = (a, b) => {
    const d1 = new Date(a.created);
    const d2 = new Date(b.created);
    if (d1 > d2) {
      return -1;
    } else if (d1 < d2) {
      return 1;
    } else {
      return 0;
    }
  };

  const completedSorter = (a, b) => {
    const d1 = new Date(a.completed_date);
    const d2 = new Date(b.completed_date);
    if (d1 > d2) {
      return -1;
    } else if (d1 < d2) {
      return 1;
    } else {
      return 0;
    }
  };

  const [todos, setTodos] = useState([]);
  const [sorter, setSorter] = useState(() => createdSorter);
  const ts = useSelector(selectProject);
  const syncing = useSelector(selectSyncing);
  const dispatch = useDispatch();
  const history = useHistory();
  const current = useSelector(selectCurrentTodo);
  useEffect(() => {
    if (!ts.id) {
      history.push("/select");
    }
  }, [ts, history]);
  useEffect(() => {
    if (!ts.todos) return;
    const remaining = [];
    const completed = [];
    for (let todo of ts.todos) {
      if (todo.completed) {
        completed.push(todo);
      } else {
        remaining.push(todo);
      }
    }
    remaining.sort(sorter);
    completed.sort(completedSorter);
    const list = remaining.concat(completed);
    setTodos(list);
  }, [ts, sorter]);

  const setSort = (name, val) => {
    if (val === 1) {
      setSorter(() => (a, b) => b.stats[name] - a.stats[name]);
    } else if (val === 2) {
      setSorter(() => (a, b) => a.stats[name] - b.stats[name]);
    } else if (val === 0) {
      setSorter(() => createdSorter);
    }
  };

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
            {syncing ? (
              <span className="syncing">
                <i class="fas fa-sync-alt"></i> syncing...
              </span>
            ) : (
              ""
            )}
            <span className="order-cont">
              <OrderBar set={setSort}></OrderBar>
            </span>
          </Dropdown>
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
                  onClick={() => {
                    dispatch(setSelectedTodo(todo));
                    window.location.href = "#inspect";
                  }}
                  style={
                    current.id === todo.id ? { backgroundColor: "#e6edf3" } : {}
                  }
                >
                  <span
                    className="todo-box"
                    onClick={() =>
                      dispatch(completeTodo(todo)).then(() =>
                        dispatch(setSelectedTodo({ name: "", description: "" }))
                      )
                    }
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
                    <i class="fas fa-check-square"></i>
                  </span>{" "}
                  <span className="main">{todo.name}</span>
                  <span className="todo-append">
                    {todo.completed_date
                      ? new Date(todo.completed_date).toLocaleString()
                      : ""}
                  </span>
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
