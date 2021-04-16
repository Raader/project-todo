import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { Section } from "./Section";
import "../styles/ProjectColumn.css";
import { useSelector } from "react-redux";
import { selectProject } from "../features/project/projectSlice";
import { ChangeProjectButton } from "./ChangeProjectButton";
import { useHistory } from "react-router";
import { selectUser } from "../features/user/userSlice";

export function ProjectSection(props) {
  const project = useSelector(selectProject);
  const user = useSelector(selectUser);
  const history = useHistory();
  useEffect(() => {}, [project, history, user]);
  return (
    <div className="project-main">
      <Section>
        <div>
          <div className="project-cont">
            <div className="user-port">
              <span className="user-portrait">
                <i class="fas fa-user-circle"></i>
              </span>{" "}
              {user.name}{" "}
              <span className="user-menu">
                <i class="fas fa-home"></i> <i class="fas fa-cog"></i>{" "}
                <i class="fas fa-sign-out-alt"></i>
              </span>
            </div>
            <div className="project-stats">
              <div className="pnav-item" onClick={() => history.push("/")}>
                <span className="pnav-i">
                  <i class="fas fa-home"></i>
                </span>{" "}
                Home
              </div>

              <div id="completed" className="pnav-item">
                <span className="pnav-i">
                  <i class="fas fa-question-circle"></i>
                </span>{" "}
                About
              </div>
              <div id="completed" className="pnav-item">
                <span className="pnav-i">
                  <i class="fab fa-github"></i>
                </span>{" "}
                Github
              </div>

              <div id="completed" className="pnav-item">
                <span className="pnav-i">
                  <i class="fas fa-stream"></i>
                </span>{" "}
                Projects
              </div>
              <div id="completed" className="pnav-item">
                <span className="pnav-i">
                  <i class="fas fa-cog"></i>
                </span>{" "}
                Settings
              </div>
            </div>
            <div className="project-info">
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
            <div className="project-footer"></div>
          </div>
        </div>
      </Section>
    </div>
  );
}
