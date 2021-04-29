import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Returner } from "./Returner";

export function ApperanceSettings() {
  const [selected, setSelected] = useState("classic");
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setSelected(theme);
    }
  }, []);
  const handleSelect = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setSelected(theme);
  };
  return (
    <div className="th-settings">
      <Returner></Returner>
      <h2>Themes</h2>
      <Container fluid>
        <Row>
          <Col lg xl="4">
            <div
              className="th"
              onClick={() => handleSelect("classic")}
              style={selected === "classic" ? { borderColor: "gray" } : {}}
            >
              <div className="th-img"></div>
              <div>Classic</div>
            </div>
          </Col>
          <Col lg xl="4">
            <div
              className="th"
              onClick={() => handleSelect("summer")}
              style={selected === "summer" ? { borderColor: "gray" } : {}}
            >
              <div className="th-img"></div>
              <div>Summer</div>
            </div>
          </Col>
          <Col lg xl="4">
            <div
              className="th"
              onClick={() => handleSelect("doom")}
              style={selected === "doom" ? { borderColor: "gray" } : {}}
            >
              <div className="th-img"></div>
              <div>Doom</div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
