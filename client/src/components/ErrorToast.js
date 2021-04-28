import { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectError, setError } from "../features/user/userSlice";

export function ErrorToast() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (error) {
      setMessage(error);
      setShow(true);
    }
  }, [error]);

  const handleClose = () => {
    setShow(false);
    dispatch(setError(""));
  };
  return (
    <Toast
      show={show}
      className="error-toast"
      onClose={handleClose}
      delay={3000}
      autohide
    >
      <Toast.Header>
        <span className="mr-auto" style={{ color: "red" }}>
          {" "}
          <i class="fas fa-exclamation-triangle"></i> An error occured
        </span>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}
