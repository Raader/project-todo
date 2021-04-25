import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { Section } from "./Section";
import "../styles/ProjectColumn.css";
import { useDispatch, useSelector } from "react-redux";
import { selectProject } from "../features/project/projectSlice";
import { ChangeProjectButton } from "./ChangeProjectButton";
import { useHistory } from "react-router";
import { logoutUser, selectUser } from "../features/user/userSlice";

export function ProjectSection(props) {
  const project = useSelector(selectProject);
  const user = useSelector(selectUser);
  const dispacth = useDispatch();
  const history = useHistory();
  const [counts, setCounts] = useState({
    total: 0,
    completed: 0,
    remaining: 0,
  });
  useEffect(() => {
    if (!project.todos) {
      return;
    }
    let c = 0;
    let r = 0;
    for (let todo of project.todos) {
      if (todo.completed) {
        c += 1;
      } else {
        r += 1;
      }
    }
    const n = {
      completed: c,
      remaining: r,
      total: c + r,
    };
    console.log(n);
    setCounts(n);
  }, [project]);
  return (
    <div className="project-main">
      <Section>
        <div>
          <div className="project-cont">
            <div className="user-port">
              <span className="user-portrait">
                <i class="fas fa-user-circle"></i>
              </span>{" "}
              <span className="main">{user.name}</span>{" "}
              <span className="user-menu">
                <i
                  class="fas fa-sign-out-alt"
                  onClick={() => {
                    dispacth(logoutUser());
                    history.push("/");
                  }}
                ></i>
              </span>
            </div>
            <div className="project-stats">
              <div
                className="pnav-item"
                style={props.path === "main" ? { color: "white" } : {}}
                onClick={() => history.push("/main")}
              >
                <span className="pnav-i">
                  <i class="fas fa-columns"></i>
                </span>{" "}
                Main
              </div>
              <div
                className="pnav-drop"
                style={props.path === "main" ? {} : { display: "none" }}
              >
                <div className="pnav-drop-item" id="drop-header">
                  <i class="fas fa-bars"></i> {project.name}
                </div>
                <div className="pnav-drop-item">
                  <i class="fas fa-calendar-week"></i> Created:{" "}
                  {new Date(project.created).toLocaleDateString()}
                </div>
                <div className="pnav-drop-item">
                  <i class="fas fa-check-square"></i> Completed:{" "}
                  {counts.completed}
                </div>
                <div className="pnav-drop-item">
                  <i class="far fa-square"></i> Remaining: {counts.remaining}
                </div>
              </div>
              <div
                className="pnav-item"
                style={props.path === "select" ? { color: "white" } : {}}
                onClick={() => history.push("/select")}
              >
                <span className="pnav-i">
                  <i class="fas fa-stream"></i>
                </span>{" "}
                Projects
              </div>
              <div
                className="pnav-item"
                style={props.path === "settings" ? { color: "white" } : {}}
                onClick={() => history.push("/settings")}
              >
                <span className="pnav-i">
                  <i class="fas fa-cog"></i>
                </span>{" "}
                Settings
              </div>
              <div
                className="pnav-item"
                style={props.path === "about" ? { color: "white" } : {}}
                onClick={() => history.push("/about")}
              >
                <span className="pnav-i">
                  <i class="fas fa-question-circle"></i>
                </span>{" "}
                About
              </div>
            </div>
            <div className="project-info" style={{ display: "none" }}>
              <div className="title">Project Info</div>
              <div id="completed" className="pnav-item">
                <span className="pnav-i">
                  <i class="fas fa-calendar-week"></i>
                </span>{" "}
                Created:{" "}
                {new Date(project.created).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </div>
              <div id="completed" className="pnav-item">
                <span className="pnav-i">
                  <i class="fas fa-check-square"></i>
                </span>{" "}
                Completed
              </div>
              <div id="completed" className="pnav-item">
                <span className="pnav-i">
                  <i class="far fa-square"></i>
                </span>{" "}
                Remaining
              </div>
            </div>
            <div className="project-footer">
              <div className="inav" id="github">
                <i class="fab fa-github"></i>
              </div>
              <div className="inav" id="twitter">
                <i class="fab fa-twitter-square"></i>
              </div>
              <div className="inav" id="stack">
                <i class="fab fa-stack-overflow"></i>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
