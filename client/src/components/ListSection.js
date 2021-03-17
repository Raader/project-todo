import { Section } from "./Section";
import "../styles/ListColumn.css";
import { useEffect, useState } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";

export function ListSection(props) {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const list = [];
    for (let i = 0; i < 100; i++) {
      list.push({ name: "do this and dat" });
    }
    setTodos(list);
  }, []);
  return (
    <div>
      <Section>
        <div className="section-title">
          <InputGroup className="todo-input">
            <InputGroup.Prepend>
              <InputGroup.Text>Todo</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl />
            <InputGroup.Append>
              <Button variant="tline">Add</Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
        <div className="todo-list">
          {todos.map((todo) => (
            <div className="list-item">
              <span className="todo-box">
                <i class="far fa-square"></i>
              </span>{" "}
              {todo.name}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
