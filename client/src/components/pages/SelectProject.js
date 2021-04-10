import { useEffect } from "react";
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
  const history = useHistory();
  useEffect(() => {
    dispatch(listProjects());
  }, [dispatch, user]);
  return (
    <div>
      <Container className="plist-cont">
        <Row>
          <Col className="plist-header">
            <h2 className="">Select Project</h2>
          </Col>
        </Row>
        <Row>
          <Col className="mx-auto" lg="8" xs="11">
            <div className="plist">
              {projects.map((project) => (
                <div
                  className="project"
                  onClick={() => {
                    dispatch(getProject(project)).then(() =>
                      history.push("/main")
                    );
                  }}
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
          </Col>
        </Row>
        <Row className="plist-footer">
          <Col className="mx-auto" xs="auto">
            <CreateProject
              variant="nice"
              className="plist-create"
            ></CreateProject>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
