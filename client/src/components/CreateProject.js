import { useState } from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { createProject } from "../features/project/projectSlice";

export function CreateProject(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const handleHide = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Modal show={show} onHide={handleHide}>
        <Modal.Header>
          <h3>Create a project</h3>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Project Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl onInput={(e) => setName(e.target.value)} />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="nice"
            onClick={() => {
              dispatch(createProject({ name })).then(() => {
                history.push("/main");
              });
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      <Button
        className={props.className}
        variant={props.variant}
        onClick={handleShow}
      >
        Create a project
      </Button>
    </div>
  );
}
