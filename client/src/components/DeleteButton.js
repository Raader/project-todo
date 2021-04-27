import { Fragment, useState } from "react";
import { Button, Modal } from "react-bootstrap";

export function DeleteButton(props) {
  const [show, setShow] = useState(false);
  return (
    <Fragment>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>Are You Sure?</Modal.Header>
        <Modal.Body>
          <Button
            variant="nice"
            style={{ marginRight: "2rem" }}
            onClick={() => {
              setShow(false);
              props.onClick();
            }}
          >
            Yes
          </Button>
          <Button variant="nice" onClick={() => setShow(false)}>
            No
          </Button>
        </Modal.Body>
      </Modal>
      <Button
        variant={props.variant}
        style={props.style}
        className="delete"
        onClick={() => setShow(true)}
      >
        {props.children}
      </Button>
    </Fragment>
  );
}
