import { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/UserOps.css";

export function InputForm(props) {
  useEffect(() => {}, []);

  function createData() {
    const data = {};
    for (let field of props.fields) {
      data[field.name] = field.value;
    }
    return data;
  }
  return (
    <Form className="user-opform">
      <h3>{props.title}</h3>
      {props.fields.map((field) => (
        <Form.Group>
          <Form.Label>{field.label}</Form.Label>
          <Form.Control
            type={field.type}
            placeholder={field.placeholder}
            onInput={(e) => (field.value = e.target.value)}
          ></Form.Control>
        </Form.Group>
      ))}
      <Button
        variant="nice"
        onClick={() => {
          props.onSubmit(createData());
        }}
      >
        {props.submitText}
      </Button>
    </Form>
  );
}
