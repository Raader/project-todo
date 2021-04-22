import { Container } from "react-bootstrap";

export function About(props) {
  return (
    <div className="about" style={{ textAlign: "left" }}>
      <Container>
        <h2>PROJECT-TODO</h2>
        <p>This an open source, project centered todo app made by Raader.</p>
        <p>It takes a different approach at categorizing todos.</p>
        <p>
          It sorts todos not just based on importance but time and difficulty
          too.
        </p>
        <p>
          This means you can quickly find a thing to do for every situation.
        </p>
      </Container>
    </div>
  );
}
