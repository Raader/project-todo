import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/UserOps.css";

export function InputForm(props) {
  const [fields, setFields] = useState({});
  useEffect(() => {
    const list = [];
    console.log(props.fields);
  }, [props.fields]);

  function createData() {
    const data = {};
    for (let i = 0; i < props.fields.length; i++) {
      const field = props.fields[i];
      data[field.name] = fields[field.name].value;
    }
    return data;
  }
  return (
    <Form className="user-opform">
      <h3>{props.title}</h3>
      {props.fields.map((field, index) => (
        <Form.Group>
          <Form.Label>{field.label}</Form.Label>
          <Form.Control
            type={field.type}
            placeholder={field.placeholder}
            ref={(ref) => {
              fields[field.name] = ref;
            }}
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
