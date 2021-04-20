import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
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
  const history = useHistory();
  useEffect(() => {
    dispatch(listProjects());
  }, [dispatch, user]);
  return (
    <div>
      <Container className="plist-cont" fluid>
        <Row>
          <Col xs="8" className="no-padding">
            <div className="plist">
              <div className="plist-header">
                <i class="fas fa-stream"></i> Projects
              </div>
              <div className="plist-body">
                {projects.map((project) => (
                  <div
                    className="project"
                    onDoubleClick={() =>
                      dispatch(getProject(selected)).then(() =>
                        history.push("/main")
                      )
                    }
                    onClick={() => {
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
          <Col className="no-padding">
            <div className="project-inspect">
              <div className="project-inspect-header">
                <i class="fas fa-bars"></i> {selected?.name}
              </div>
              <div className="project-inspect-body">
                {selected?.description}
              </div>
              <div className="project-inspect-footer">
                <div className="project-select">
                  <Button
                    variant="nice"
                    onClick={() =>
                      dispatch(getProject(selected)).then(() =>
                        history.push("/main")
                      )
                    }
                  >
                    <i class="fas fa-check"></i> Select Project
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
