import { useState } from "react";
import {
  InputGroup,
  FormControl,
  Button,
  DropdownButton,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/project/projectSlice";

export function TodoBar(props) {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  return (
    <div>
      <InputGroup className="todo-input">
        <FormControl
          value={todo}
          placeholder="Add todo to project, press Enter to save."
          onChange={(e) => setTodo(e.target.value)}
        />
        <InputGroup.Append>
          <DropdownButton
            className="stat-drop"
            variant="nobtn"
            title={<i class="fas fa-exclamation"></i>}
          ></DropdownButton>
          <DropdownButton
            className="stat-drop"
            variant="nobtn"
            title={<i class="fas fa-hourglass"></i>}
          ></DropdownButton>

          <DropdownButton
            className="stat-drop"
            variant="nobtn"
            title={<i class="fas fa-plus-circle"></i>}
          ></DropdownButton>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}
