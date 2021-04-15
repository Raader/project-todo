import { Section } from "./Section";
import "../styles/TodoColumn.css";
import { useDispatch, useSelector } from "react-redux";
import { SelectProject } from "./pages/SelectProject";
import { FormControl, InputGroup } from "react-bootstrap";
import {
  completeTodo,
  editTodo,
  editTodoCloud,
  selectCurrentTodo,
  setSelectedTodo,
} from "../features/project/projectSlice";
import { useEffect, useState } from "react";
export function TodoSection(props) {
  const todo = useSelector(selectCurrentTodo);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    setName(todo.name);
    setDescription(todo.description);
  }, [todo]);
  return (
    <div className="inspect-main">
      <Section>
        <div className="inspect-menu">
          <span
            className="main"
            onClick={() =>
              dispatch(completeTodo(todo)).then(() =>
                dispatch(setSelectedTodo({ name: "", description: "" }))
              )
            }
          >
            <i class="far fa-square"></i>
          </span>
          <span className="content">
            <i class="fas fa-calendar-week"></i>{" "}
            {todo.created ? new Date(todo.created).toLocaleString() : ""}
          </span>
          <span className="append">
            <i class="fas fa-ellipsis-v"></i>
          </span>
        </div>
        <div className="inspect-header">
          <InputGroup>
            <FormControl
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  dispatch(editTodoCloud({ id: todo.id, name, description }));
                }
                return false;
              }}
              onBlur={() => {
                dispatch(editTodoCloud({ id: todo.id, name, description }));
              }}
            ></FormControl>
          </InputGroup>
        </div>

        <div className="inspect-body">
          <textarea
            type="text-area"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            onBlur={() => {
              dispatch(editTodoCloud({ id: todo.id, name, description }));
            }}
          ></textarea>
        </div>
      </Section>
    </div>
  );
}
