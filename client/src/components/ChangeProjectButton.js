import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getProject,
  listProjects,
  selectProject,
  selectProjectList,
  setProject,
} from "../features/project/projectSlice";
import "../styles/ChangeProject.css";

export function ChangeProjectButton(props) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);
  const [projects, setProjects] = useState([]);
  const ps = useSelector(selectProjectList);
  const dispatch = useDispatch();
  useEffect(() => {
    const list = [];
    for (let i = 0; i < 100; i++) {
      list.push({ name: "project-TODO", count: "5" });
    }
    dispatch(listProjects());
    setProjects(list);
  }, [dispatch]);
  return (
    <div>
      <Modal show={show} onHide={handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Your Projects</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="project-list">
            {ps ? (
              ps.map((val) => (
                <div
                  className="list-project"
                  onClick={() => {
                    handleHide();
                    dispatch(getProject(val));
                  }}
                >
                  <i class="fas fa-bars"></i> {val.name}
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="nice">Create</Button>
        </Modal.Footer>
      </Modal>

      <Button variant={props.variant} onClick={handleShow}>
        <i class="fas fa-exchange-alt"></i> Change Project
      </Button>
    </div>
  );
}
