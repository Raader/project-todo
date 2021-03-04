import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, selectUser } from "../../features/user/userSlice";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import { InputForm } from "../InputForm";
import "../../styles/UserOps.css";
export function Register() {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const history = useHistory();
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
        <Col md="5" className="mx-auto">
          <InputForm
            title="Register an account"
            submitText="Register"
            fields={[
              {
                name: "name",
                label: "Name",
                placeholder: "username",
                type: "text",
              },
              {
                name: "email",
                label: "Email",
                placeholder: "example@mail.com",
                type: "email",
              },
              {
                name: "password",
                label: "Password",
                placeholder: "password",
                type: "password",
              },
            ]}
            onSubmit={(data) => {
              dispatch(registerUser(data))
                .then(() => history.push("/"))
                .catch((err) => setMsg(err));
            }}
          ></InputForm>
        </Col>
      </Row>
      <h6>{msg}</h6>
    </Container>
  );
}
