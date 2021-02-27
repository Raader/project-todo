import { Button, Container, Row, Col, Jumbotron } from "react-bootstrap";
import "../../styles/Home.css";
export function Home() {
  return (
    <div>
      <Jumbotron>
        <h1>The TODO app you were looking for</h1>
        <p>
          A todo app for all your project/task managament needs,<br></br> for
          free.
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>
      <div className="paragraphs">
        <Container fluid="lg">
          <Row xs={1} lg={3}>
            <Col className="paragraph">
              <i class="fas fa-laptop-code"></i>
              <h2>Designed For Programmers</h2>
              <p>
                this is an project task managament app that is specificly
                designed for programmers and creative specialists. It is not a
                casual todo app. It's for small to mid scale hobby projects.
              </p>
            </Col>
            <Col className="paragraph">
              <i class="fas fa-box-open"></i>
              <h2>Free And Opensource</h2>
              <p>
                No annoying pro versions or locked up features. Get the full
                experience completely free. It's completely opensource on both
                cliend and the backend. Feel free to check out this project's
                github page!
              </p>
            </Col>
            <Col className="paragraph">
              <i class="fas fa-user-shield"></i>
              <h2>No Tracking Or Profiling</h2>
              <p>
                We value your privacy so we don't use any tracker or profiler.
                The backend is completely opensource so you can be sure. This is
                a no profit app made and managed by the open source community.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
