import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProject,
  editProject,
  getProject,
  listProjects,
  selectProjectList,
} from "../../features/project/projectSlice";
import { selectUser } from "../../features/user/userSlice";
import "../../styles/ChangeProject.css";
import { useHistory } from "react-router-dom";
import { CreateProject } from "../CreateProject";

export function SelectProject(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const projects = useSelector(selectProjectList);
  const [selected, setSelected] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();
  useEffect(() => {
    window.location.href = "#";
  }, []);
  useEffect(() => {
    dispatch(listProjects());
  }, [dispatch, user]);
  useEffect(() => {
    if (selected) {
      setName(selected.name ? selected.name : "");
      setDescription(selected.description ? selected.description : "");
    }
  }, [selected]);
  return (
    <div>
      <Container className="plist-cont" fluid>
        <Row>
          <Col sm lg="8" className="no-padding">
            <div className="plist">
              <div className="plist-header">
                <i class="fas fa-stream"></i> Projects
              </div>
              <div className="plist-body">
                {projects.map((project) => (
                  <div
                    className="project"
                    onDoubleClick={() => {
                      dispatch(getProject(selected));
                      history.push("/loading/main");
                    }}
                    onClick={() => {
                      window.location.href = "#pinspect";
                      setSelected(project);
                    }}
                    style={
                      selected && selected.id === project.id
                        ? { backgroundColor: "rgba(53, 53, 53, 0.1)" }
                        : {}
                    }
                  >
                    <i class="fas fa-bars"></i> {project.name}{" "}
                    <span className="date">
                      <i class="fas fa-calendar-week"></i>{" "}
                      {new Date(project.created).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
              </div>

              <div className="plist-footer">
                <CreateProject
                  variant="nice"
                  className="plist-create"
                ></CreateProject>
              </div>
            </div>
          </Col>
          <Col sm className="no-padding">
            <div className="project-inspect" id="pinspect">
              <div className="project-inspect-header">
                <i class="fas fa-bars"></i>{" "}
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="clean-input"
                  onBlur={() => {
                    dispatch(editProject({ id: selected.id, name }));
                  }}
                ></input>
                <span className="append">
                  <span
                    className="returner"
                    onClick={() => (window.location.href = "#")}
                  >
                    <i class="fas fa-arrow-up"></i>
                  </span>
                </span>
              </div>
              <div className="project-inspect-body">
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="inspect-area"
                  onBlur={() => {
                    dispatch(editProject({ id: selected.id, description }));
                  }}
                ></textarea>
              </div>
              <div
                className="project-inspect-footer"
                style={selected ? {} : { display: "none" }}
              >
                <div className="project-select">
                  <Button
                    variant="nice"
                    onClick={() => {
                      dispatch(getProject(selected));
                      history.push("/loading/main");
                    }}
                  >
                    <i class="fas fa-check"></i> Select Project
                  </Button>
                  <Button
                    variant="nice"
                    onClick={() => {
                      dispatch(deleteProject(selected));
                      setSelected({ name: "", description: "" });
                    }}
                  >
                    <i class="fas fa-trash"></i> Delete Project
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
