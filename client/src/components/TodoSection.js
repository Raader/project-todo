import { Section } from "./Section";
import "../styles/TodoColumn.css";
import { useDispatch, useSelector } from "react-redux";
import { SelectProject } from "./pages/SelectProject";
import {
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Dropdown,
} from "react-bootstrap";
import {
  completeTodo,
  deleteTodo,
  editTodo,
  editTodoCloud,
  selectCurrentTodo,
  setSelectedTodo,
} from "../features/project/projectSlice";
import { Fragment, useEffect, useState } from "react";
import { SideTasks } from "./SideTasks";
import { Returner } from "./Returner";
import { DeleteButton } from "./DeleteButton";
export function TodoSection(props) {
  const todo = useSelector(selectCurrentTodo);
  const dispatch = useDispatch();
  const [t, setT] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imp, setImp] = useState(0);
  const [time, setTime] = useState(0);
  const [diff, setDiff] = useState(0);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (t.id) {
      if (
        !(
          imp === t.stats.importance &&
          time === t.stats.time &&
          diff === t.stats.difficulty
        )
      ) {
        dispatch(
          editTodoCloud({
            id: t.id,
            stats: { importance: imp, time, difficulty: diff },
          })
        );
      }
    }
    if (todo.id) setT(todo);
    if (todo.stats) {
      setImp(todo.stats.importance);
      setTime(todo.stats.time);
      setDiff(todo.stats.difficulty);
    }
    setName(todo.name);
    setDescription(todo.description);
  }, [todo]);
  return (
    <div className="inspect-main" id="inspect">
      <Section>
        <Returner></Returner>
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
            <Dropdown>
              <Dropdown.Toggle
                variant="no-btn"
                id="dropdown-basic"
                style={{ padding: "0" }}
                className="toggle"
              >
                <i class="fas fa-ellipsis-v"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item className="no-padding">
                  <DeleteButton
                    variant="big"
                    onClick={() => {
                      dispatch(deleteTodo(todo));
                      window.location.href = "#";
                    }}
                  >
                    <i class="fas fa-trash"></i> Delete
                  </DeleteButton>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
            placeholder="description"
            value={description ? description : ""}
            className="inspect-area"
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
          <SideTasks></SideTasks>
          <Container fluid className="stats">
            <div className="stat-head" onClick={() => setShow(!show)}>
              {show ? (
                <i class="fas fa-chevron-down"></i>
              ) : (
                <i class="fas fa-chevron-up"></i>
              )}{" "}
              Stats
            </div>
            <div style={show ? {} : { display: "none" }}>
              <Row className="stat-sep">Importance</Row>
              <Row className="stat-row">
                <Col
                  className="stat-col"
                  style={
                    todo.stats && imp === 1 ? { color: "var(--tier-1)" } : {}
                  }
                  onClick={() => (imp !== 1 ? setImp(1) : setImp(0))}
                >
                  <i class="fas fa-exclamation"></i>
                </Col>
                <Col
                  className="stat-col"
                  style={
                    todo.stats && imp === 2 ? { color: "var(--tier-2)" } : {}
                  }
                  onClick={() => (imp !== 2 ? setImp(2) : setImp(0))}
                >
                  <i class="fas fa-exclamation"></i>
                  <i class="fas fa-exclamation"></i>
                </Col>
                <Col
                  className="stat-col"
                  style={
                    todo.stats && imp === 3 ? { color: "var(--tier-3)" } : {}
                  }
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
                  style={
                    todo.stats && time === 1 ? { color: "var(--tier-1)" } : {}
                  }
                  onClick={() => (time !== 1 ? setTime(1) : setTime(0))}
                >
                  <i class="fas fa-hourglass"></i>
                </Col>
                <Col
                  className="stat-col"
                  style={
                    todo.stats && time === 2 ? { color: "var(--tier-2)" } : {}
                  }
                  onClick={() => (time !== 2 ? setTime(2) : setTime(0))}
                >
                  <i class="fas fa-hourglass"></i>
                  <i class="fas fa-hourglass"></i>
                </Col>
                <Col
                  className="stat-col"
                  style={
                    todo.stats && time === 3 ? { color: "var(--tier-3)" } : {}
                  }
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
                  style={
                    todo.stats && diff === 1 ? { color: "var(--tier-1)" } : {}
                  }
                  onClick={() => (diff !== 1 ? setDiff(1) : setDiff(0))}
                >
                  <i class="fas fa-plus-circle"></i>
                </Col>
                <Col
                  className="stat-col"
                  style={
                    todo.stats && diff === 2 ? { color: "var(--tier-2)" } : {}
                  }
                  onClick={() => (diff !== 2 ? setDiff(2) : setDiff(0))}
                >
                  <i class="fas fa-plus-circle"></i>
                  <i class="fas fa-plus-circle"></i>
                </Col>
                <Col
                  className="stat-col"
                  style={
                    todo.stats && diff === 3 ? { color: "var(--tier-3)" } : {}
                  }
                  onClick={() => (diff !== 3 ? setDiff(3) : setDiff(0))}
                >
                  <i class="fas fa-plus-circle"></i>
                  <i class="fas fa-plus-circle"></i>
                  <i class="fas fa-plus-circle"></i>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </Section>
    </div>
  );
}
