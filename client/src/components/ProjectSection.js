import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { Section } from "./Section";
import "../styles/ProjectColumn.css";
import { useSelector } from "react-redux";
import { selectProject } from "../features/project/projectSlice";
import { ChangeProjectButton } from "./ChangeProjectButton";

export function ProjectSection(props) {
  const project = useSelector(selectProject);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const list = [];
    for (let i = 0; i < 100; i++) {
      list.push({ name: "project-TODO", count: "5" });
    }
    setProjects(list);
  }, []);
  return (
    <div className="project-main">
      <Section>
        <div className="project-cont">
          <h3 className="project-name">
            <i class="fas fa-bars"></i> {project.name}
          </h3>
          <div className="project-stats">
            <Container>
              <Row>
                <Col className="no-padding">
                  <div className="project-date">
                    <i class="fas fa-hourglass-start"></i> Last Edited:{" "}
                    <span style={{ fontWeight: 600 }}>20.05.21</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="no-padding">
                  <div className="project-date">
                    <i class="fas fa-hourglass-end"></i> Last Completed:{" "}
                    <span style={{ fontWeight: 600 }}>20.05.21</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="no-padding">
                  <div className="project-date">
                    <i class="fas fa-calendar-week"></i> Created:{" "}
                    <span style={{ fontWeight: 600 }}>20.05.21</span>
                  </div>
                </Col>
              </Row>
              <Row className="project-todos">
                <Col>
                  <div id="completed" className="project-stat">
                    5 <i class="fas fa-check-square"></i>
                    <br></br>completed
                  </div>
                </Col>
                <Col>
                  <div id="remaining" className="project-stat">
                    5 <i class="far fa-check-square"></i>
                    <br></br>remaining
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="project-footer">
            <ButtonGroup vertical>
              <ChangeProjectButton variant="nice"></ChangeProjectButton>
              <Button variant="nice">
                <i class="fas fa-edit"></i> Edit Project
              </Button>
              <Button variant="nice" id="delete-btn">
                <i class="fas fa-trash"></i> Delete Project
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </Section>
    </div>
  );
}
