import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/ChangeProject.css";

export function ChangeProjectButton(props) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  return (
    <div>
      <Modal show={show} onHide={handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
      <Button variant={props.variant} onClick={handleShow}>
        <i class="fas fa-exchange-alt"></i> Change Project
      </Button>
    </div>
  );
}
