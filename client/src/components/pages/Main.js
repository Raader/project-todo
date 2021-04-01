import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { createProject } from "../../features/project/projectSlice";
import "../../styles/Main.css";
import { ListSection } from "../ListSection";
import { ProjectSection } from "../ProjectSection";
import { TodoSection } from "../TodoSection";
export function Main() {
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(createProject({ name: "hello" }));
  });
  return (
    <div>
      <Container fluid className="main-cont">
        <Row>
          <Col className="no-padding" md="3">
            <ProjectSection></ProjectSection>
          </Col>
          <Col className="no-padding">
            <ListSection></ListSection>
          </Col>
          <Col className="no-padding" md="5">
            <TodoSection></TodoSection>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
