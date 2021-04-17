import { Section } from "./Section";
import "../styles/TodoColumn.css";
import { useDispatch, useSelector } from "react-redux";
import { SelectProject } from "./pages/SelectProject";
import { Col, Container, FormControl, InputGroup, Row } from "react-bootstrap";
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
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imp, setImp] = useState(0);
  const [time, setTime] = useState(0);
  const [diff, setDiff] = useState(0);
  useEffect(() => {
    if (id) {
      console.log(id);
      dispatch(
        editTodoCloud({
          id,
          stats: { importance: imp, time, difficulty: diff },
        })
      );
    }
    if (todo.id) setId(todo.id);
    if (todo.stats) {
      setImp(todo.stats.importance);
      setTime(todo.stats.time);
      setDiff(todo.stats.difficulty);
    }
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
            {todo.created ? new Date(todo.created).toLocaleDateString() : ""}
          </span>
          <span className="append">
            <i class="fas fa-trash" id="delete"></i>
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

        <div
          className="inspect-footer"
          style={todo.id ? {} : { display: "none" }}
        >
          <Container fluid>
            <Row className="stat-sep">Importance</Row>
            <Row className="stat-row">
              <Col
                className="stat-col"
                style={todo.stats && imp === 1 ? { color: "#2ECFCA" } : {}}
                onClick={() => (imp !== 1 ? setImp(1) : setImp(0))}
              >
                <i class="fas fa-exclamation"></i>
              </Col>
              <Col
                className="stat-col"
                style={todo.stats && imp === 2 ? { color: "#F8DF77" } : {}}
                onClick={() => (imp !== 2 ? setImp(2) : setImp(0))}
              >
                <i class="fas fa-exclamation"></i>
                <i class="fas fa-exclamation"></i>
              </Col>
              <Col
                className="stat-col"
                style={todo.stats && imp === 3 ? { color: "#FF4E62" } : {}}
                onClick={() => (imp !== 3 ? setImp(3) : setImp(0))}
              >
                <i class="fas fa-exclamation"></i>
                <i class="fas fa-exclamation"></i>
                <i class="fas fa-exclamation"></i>
              </Col>
            </Row>
            <Row className="stat-sep">Time</Row>
            <Row className="stat-row">
              <Col
                className="stat-col"
                style={todo.stats && time === 1 ? { color: "#2ECFCA" } : {}}
                onClick={() => (time !== 1 ? setTime(1) : setTime(0))}
              >
                <i class="fas fa-hourglass"></i>
              </Col>
              <Col
                className="stat-col"
                style={todo.stats && time === 2 ? { color: "#F8DF77" } : {}}
                onClick={() => (time !== 2 ? setTime(2) : setTime(0))}
              >
                <i class="fas fa-hourglass"></i>
                <i class="fas fa-hourglass"></i>
              </Col>
              <Col
                className="stat-col"
                style={todo.stats && time === 3 ? { color: "#FF4E62" } : {}}
                onClick={() => (time !== 3 ? setTime(3) : setTime(0))}
              >
                <i class="fas fa-hourglass"></i>
                <i class="fas fa-hourglass"></i>
                <i class="fas fa-hourglass"></i>
              </Col>
            </Row>
            <Row className="stat-sep">Difficulty</Row>
            <Row className="stat-row">
              <Col
                className="stat-col"
                style={todo.stats && diff === 1 ? { color: "#2ECFCA" } : {}}
                onClick={() => (diff !== 1 ? setDiff(1) : setDiff(0))}
              >
                <i class="fas fa-plus-circle"></i>
              </Col>
              <Col
                className="stat-col"
                style={todo.stats && diff === 2 ? { color: "#F8DF77" } : {}}
                onClick={() => (diff !== 2 ? setDiff(2) : setDiff(0))}
              >
                <i class="fas fa-plus-circle"></i>
                <i class="fas fa-plus-circle"></i>
              </Col>
              <Col
                className="stat-col"
                style={todo.stats && diff === 3 ? { color: "#FF4E62" } : {}}
                onClick={() => (diff !== 3 ? setDiff(3) : setDiff(0))}
              >
                <i class="fas fa-plus-circle"></i>
                <i class="fas fa-plus-circle"></i>
                <i class="fas fa-plus-circle"></i>
              </Col>
            </Row>
          </Container>
        </div>
      </Section>
    </div>
  );
}
