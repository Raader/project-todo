import React, { Fragment, useState } from "react";
import {
  InputGroup,
  FormControl,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/project/projectSlice";

export function TodoBar(props) {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  const [imp, setImp] = useState(0);
  const [time, setTime] = useState(0);
  const [diff, setDiff] = useState(0);
  const [show, setShow] = useState(false);
  return (
    <div>
      <InputGroup className="todo-input">
        <FormControl
          value={todo}
          placeholder="Add todo to project, press Enter to save."
          onChange={(e) => setTodo(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setShow(false);
              dispatch(
                addTodo({
                  name: todo,
                  description: "description",
                  stats: { importance: imp, time: time, difficulty: diff },
                })
              );
              setDiff(0);
              setImp(0);
              setTime(0);
              setTodo("");
            }
          }}
        />
        <InputGroup.Append>
          <Dropdown show={show}>
            <Dropdown.Toggle
              className="stat-drop"
              variant="nobtn"
              onClick={() => setShow(!show)}
            >
              <i class="fas fa-ellipsis-v"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Header>Importance</Dropdown.Header>
              <Dropdown.Item className="drop">
                <span
                  onClick={() => setImp(imp !== 1 ? 1 : 0)}
                  style={imp === 1 ? { color: "#2ECFCA" } : {}}
                >
                  <i class="fas fa-exclamation"></i>
                </span>
                <span
                  onClick={() => setImp(imp !== 2 ? 2 : 0)}
                  style={imp === 2 ? { color: "#F8DF77" } : {}}
                >
                  <i class="fas fa-exclamation"></i>
                  <i class="fas fa-exclamation"></i>
                </span>
                <span
                  onClick={() => setImp(imp !== 3 ? 3 : 0)}
                  style={imp === 3 ? { color: "#FF4E62" } : {}}
                >
                  <i class="fas fa-exclamation"></i>
                  <i class="fas fa-exclamation"></i>
                  <i class="fas fa-exclamation"></i>
                </span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Time</Dropdown.Header>
              <Dropdown.Item className="drop">
                <span
                  onClick={() => setTime(time !== 1 ? 1 : 0)}
                  style={time === 1 ? { color: "#2ECFCA" } : {}}
                >
                  <i class="fas fa-hourglass"></i>
                </span>
                <span
                  onClick={() => setTime(time !== 2 ? 2 : 0)}
                  style={time === 2 ? { color: "#F8DF77" } : {}}
                >
                  <i class="fas fa-hourglass"></i>
                  <i class="fas fa-hourglass"></i>
                </span>
                <span
                  onClick={() => setTime(time !== 3 ? 3 : 0)}
                  style={time === 3 ? { color: "#FF4E62" } : {}}
                >
                  <i class="fas fa-hourglass"></i>
                  <i class="fas fa-hourglass"></i>
                  <i class="fas fa-hourglass"></i>
                </span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Difficulty</Dropdown.Header>
              <Dropdown.Item className="drop">
                <span
                  onClick={() => setDiff(diff !== 1 ? 1 : 0)}
                  style={diff === 1 ? { color: "#2ECFCA" } : {}}
                >
                  <i class="fas fa-plus-circle"></i>
                </span>
                <span
                  onClick={() => setDiff(diff !== 2 ? 2 : 0)}
                  style={diff === 2 ? { color: "#F8DF77" } : {}}
                >
                  <i class="fas fa-plus-circle"></i>
                  <i class="fas fa-plus-circle"></i>
                </span>
                <span
                  onClick={() => setDiff(diff !== 3 ? 3 : 0)}
                  style={diff === 3 ? { color: "#FF4E62" } : {}}
                >
                  <i class="fas fa-plus-circle"></i>
                  <i class="fas fa-plus-circle"></i>
                  <i class="fas fa-plus-circle"></i>
                </span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}
