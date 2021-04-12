import { Section } from "./Section";
import "../styles/TodoColumn.css";
import { useDispatch, useSelector } from "react-redux";
import { SelectProject } from "./pages/SelectProject";
import { FormControl, InputGroup } from "react-bootstrap";
import { editTodo, selectCurrentTodo } from "../features/project/projectSlice";
import { useEffect, useState } from "react";
export function TodoSection(props) {
  const todo = useSelector(selectCurrentTodo);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  useEffect(() => {
    setName(todo.name);
  }, [todo]);
  return (
    <div className="inspect-main">
      <Section>
        <div className="inspect-menu">
          <span className="main">
            <i class="far fa-square"></i>
          </span>
          <i class="fas fa-calendar-week"></i> 15/05/2021
          <span className="append">
            <i class="fas fa-exclamation"></i>
            <i class="fas fa-hourglass"></i>
            <i class="fas fa-plus-circle"></i>
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
                  dispatch(editTodo({ id: todo.id, name }));
                }
                return false;
              }}
              onBlur={() => {
                dispatch(editTodo({ id: todo.id, name }));
              }}
            ></FormControl>
          </InputGroup>
        </div>

        <div className="inspect-body">{todo.description}</div>
      </Section>
    </div>
  );
}
