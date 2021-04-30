import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";

export function MiniNavbar(props) {
  const history = useHistory();
  return (
    <div className="mini-navbar">
      <Container fluid>
        <Row>
          <Col className="no-padding">
            <div
              className="pnav-item"
              style={
                props.path === "main" ? { color: "var(--secondary-color)" } : {}
              }
              onClick={() => history.push("/main")}
            >
              <i class="fas fa-columns"></i>
            </div>
          </Col>
          <Col className="no-padding">
            <div
              className="pnav-item"
              style={
                props.path === "select"
                  ? { color: "var(--secondary-color)" }
                  : {}
              }
              onClick={() => history.push("/select")}
            >
              <i class="fas fa-stream"></i>
            </div>
          </Col>
          <Col className="no-padding">
            <div
              className="pnav-item"
              style={
                props.path === "settings"
                  ? { color: "var(--secondary-color)" }
                  : {}
              }
              onClick={() => history.push("/settings")}
            >
              <i class="fas fa-cog"></i>
            </div>
          </Col>
          <Col
            className="no-padding"
            style={
              props.path === "about" ? { color: "var(--secondary-color)" } : {}
            }
            onClick={() => history.push("/about")}
          >
            <div className="pnav-item">
              <i class="fas fa-question-circle"></i>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
