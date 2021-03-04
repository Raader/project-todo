import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Section } from "./Section";
import "../styles/ProjectColumn.css";

export function ProjectSection(props) {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const list = [];
    for (let i = 0; i < 100; i++) {
      list.push({ name: "PROEJET-TODO" });
    }
    setProjects(list);
  }, []);
  return (
    <Section>
      <h3>Projects</h3>
      <div className="project-list">
        {projects.map((project) => (
          <div className="list-item">{project.name}</div>
        ))}
      </div>
      <div className="project-footer">
        <Button>New Project</Button>
      </div>
    </Section>
  );
}
