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
  useEffect(() => {});
  return (
    <div>
      <Container fluid className="main-cont">
        <Row>
          <Col className="no-padding" md="auto">
            <ProjectSection></ProjectSection>
          </Col>
          <Col className="no-padding" sm lg="5" xl="6">
            <ListSection></ListSection>
          </Col>
          <Col className="no-padding" sm>
            <TodoSection></TodoSection>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
