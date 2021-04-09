import { Section } from "./Section";
import "../styles/ListColumn.css";
import { useEffect, useState } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectProject } from "../features/project/projectSlice";
import { TodoBar } from "./TodoBar";

export function ListSection(props) {
  const [todos, setTodos] = useState([]);
  const ts = useSelector(selectProject);
  useEffect(() => {
    const list = [];
    for (let i = 0; i < 100; i++) {
      list.push({ name: "do this and dat" });
    }
    setTodos(list);
  }, []);
  return (
    <div className="todo-main">
      <Section>
        <div className="todo-top">
          <TodoBar></TodoBar>
        </div>
        <div className="todo-list">
          {ts && ts.todos ? (
            ts.todos.map((todo) => (
              <div className="list-item">
                <span className="todo-box">
                  <i class="far fa-square"></i>
                </span>{" "}
                {todo.name}
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </Section>
    </div>
  );
}
