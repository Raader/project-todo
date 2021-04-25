import { Container, Row, Col } from "react-bootstrap";
import "../../styles/Settings.css";
export function Settings(props) {
  return (
    <div className="settings-cont">
      <Container>
        <Row>
          <Col>
            <div className="settings-header">
              <i class="fas fa-cog"></i> Settings
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="no-padding" sm xl="3">
            <div className="settings-navbar">
              <div className="settings-nav">User</div>
              <div className="settings-nav">Apperance</div>
            </div>
          </Col>
          <Col sm></Col>
        </Row>
      </Container>
    </div>
  );
}
