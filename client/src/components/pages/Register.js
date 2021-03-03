import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, selectUser } from "../../features/user/userSlice";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import "../../styles/UserOps.css";
export function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <Container className="user-op">
      <h6>
        Already have an account?{" "}
        <span className="user-oplink" onClick={() => history.push("/login")}>
          Login
        </span>{" "}
        instead!
      </h6>
      <Row>
        <Col md="5" className="user-opform mx-auto">
          <Form>
            <h3>Register an account</h3>
            <Form.Text></Form.Text>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="username"
                onInput={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@mail.com"
                onInput={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onInput={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button
              onClick={() => {
                dispatch(registerUser({ name, email, password })).then(() =>
                  history.push("/")
                );
              }}
            >
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
