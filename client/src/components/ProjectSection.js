import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Section } from "./Section";
import "../styles/ProjectColumn.css";

export function ProjectSection(props) {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  useEffect(() => {
    const list = [];
    for (let i = 0; i < 100; i++) {
      list.push({ name: "project-TODO", count: "5" });
    }
    setProjects(list);
  }, []);
  return (
    <Section>
      <h4 className="section-title">Projects</h4>
      <div className="project-list">
        {projects.map((project) => (
          <div className="list-item">
            <i class="fas fa-bars"></i> {project.name}
            <div className="item-footer">
              <i class="fas fa-check-square"></i> {project.count} todos
            </div>
          </div>
        ))}
      </div>
      <div className="project-footer">
        <Button variant="nice">New Project</Button>
      </div>
    </Section>
  );
}
