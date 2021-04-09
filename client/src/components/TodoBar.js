import { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/project/projectSlice";

export function TodoBar(props) {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  return (
    <div>
      <InputGroup className="todo-input">
        <InputGroup.Prepend>
          <InputGroup.Text>Todo</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl value={todo} onChange={(e) => setTodo(e.target.value)} />
        <InputGroup.Append>
          <Button
            variant="nice"
            onClick={() => {
              if (todo) {
                dispatch(addTodo({ name: todo, description: "d" }));
                setTodo("");
              }
            }}
          >
            Add
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}
