import { Container, Row, Col } from "react-bootstrap";
import "../../styles/Main.css";
import { ListSection } from "../ListSection";
import { ProjectSection } from "../ProjectSection";
import { TodoSection } from "../TodoSection";
export function Main() {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col className="no-padding" md="3">
            <ProjectSection></ProjectSection>
          </Col>
          <Col className="no-padding" xs="6" md="6">
            <ListSection></ListSection>
          </Col>
          <Col className="no-padding" md="3">
            <TodoSection></TodoSection>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
