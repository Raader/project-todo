import { useState } from "react";
import { Button, Modal, InputGroup, FormControl, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { createProject } from "../features/project/projectSlice";
import { InputForm } from "./InputForm";

export function CreateProject(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleHide = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Modal show={show} onHide={handleHide}>
        <Modal.Body>
          <InputForm
            title="Create a Project"
            submitText="Create"
            fields={[
              {
                name: "name",
                label: "Project Name",
                placeholder: "project name",
                type: "text",
              },
              {
                name: "description",
                label: "Description",
                placeholder: "project description",
                type: "text",
                as: "textarea",
              },
            ]}
            onSubmit={(data) => {
              dispatch(createProject(data)).then(() => {
                history.push("/main");
              });
            }}
          ></InputForm>
        </Modal.Body>
      </Modal>
      <Button
        className={props.className}
        variant={props.variant}
        onClick={handleShow}
      >
        <i class="fas fa-plus-square"></i> Create a project
      </Button>
    </div>
  );
}
