import { Section } from "./Section";
import "../styles/ListColumn.css";
import { useEffect, useState } from "react";
import { Button, InputGroup, FormControl, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { completeTodo, selectProject } from "../features/project/projectSlice";
import { TodoBar } from "./TodoBar";

export function ListSection(props) {
  const [todos, setTodos] = useState([]);
  const ts = useSelector(selectProject);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!ts.todos) return;
    const list = ts.todos.map((val) => val);
    list.sort((a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0));
    setTodos(list);
  }, [ts]);
  return (
    <div className="todo-main">
      <Section>
        <div className="todo-top-menu">
          <Dropdown>
            <Dropdown.Toggle variant="nobtn" id="dropdown-basic">
              <i class="fas fa-bars"></i> {ts.name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
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
                  onClick={() => dispatch(completeTodo(todo))}
                >
                  <span className="todo-box">
                    <i class="far fa-square"></i>
                  </span>{" "}
                  {todo.name}
                </div>
              ) : (
                <div
                  className="list-item completed"
                  onClick={() => dispatch(completeTodo(todo))}
                >
                  <span className="todo-box">
                    <i class="fas fa-square"></i>
                  </span>{" "}
                  {todo.name}
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
