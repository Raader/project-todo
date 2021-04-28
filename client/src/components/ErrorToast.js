import { useState } from "react";
import { Toast } from "react-bootstrap";

export function ErrorToast() {
  const [show, setShow] = useState(true);
  return (
    <Toast show={show} className="error-toast" onClose={() => setShow(false)}>
      <Toast.Header>
        <span className="mr-auto" style={{ color: "red" }}>
          {" "}
          <i class="fas fa-exclamation-triangle"></i> An error occured
        </span>
      </Toast.Header>
      <Toast.Body>Username and password does not match</Toast.Body>
    </Toast>
  );
}
