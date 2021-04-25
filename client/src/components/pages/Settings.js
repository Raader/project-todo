import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/Settings.css";
import { ApperanceSettings } from "../AppearanceSettings";
import { UserSettings } from "../UserSettings";
const pages = [
  { name: "user", body: <UserSettings></UserSettings> },
  { name: "appearance", body: <ApperanceSettings></ApperanceSettings> },
];
export function Settings(props) {
  const [page, setPage] = useState("user");
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
              <div
                className="settings-nav"
                style={page === "user" ? { color: "black" } : {}}
              >
                User
              </div>
              <div
                className="settings-nav"
                style={page === "appearance" ? { color: "black" } : {}}
              >
                Appearance
              </div>
            </div>
          </Col>
          <Col sm>
            <div className="settings-inspect">
              {pages.find((val) => val.name === page).body}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
