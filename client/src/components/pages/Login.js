import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, selectUser } from "../../features/user/userSlice";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import "../../styles/UserOps.css";
import { InputForm } from "../InputForm";
export function Login() {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const history = useHistory();
  return (
    <Container className="user-op">
      <h6>
        Don't have an account?{" "}
        <span className="user-oplink" onClick={() => history.push("/register")}>
          register
        </span>{" "}
        instead!
      </h6>
      <Row>
        <Col md="5" className="mx-auto">
          <InputForm
            title="login to your account"
            submitText="Log in"
            fields={[
              {
                name: "email",
                label: "Email",
                placeholder: "your email",
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
              dispatch(loginUser(data))
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
