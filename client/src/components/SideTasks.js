import { SideTask } from "./SideTask";
import { useDispatch, useSelector } from "react-redux";
import {
  addSideTask,
  selectCurrentTodo,
  selectSideTasks,
} from "../features/project/projectSlice";
import { useState } from "react";
export function SideTasks(props) {
  const todo = useSelector(selectCurrentTodo);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  return (
    <div className="side-cont">
      <div className="side-head" onClick={() => setShow(!show)}>
        {!show ? (
          <i class="fas fa-chevron-down"></i>
        ) : (
          <i class="fas fa-chevron-up"></i>
        )}{" "}
        Side Tasks{" "}
        <span
          className="append"
          style={show ? {} : { display: "none" }}
          onClick={() => dispatch(addSideTask(todo, { name: "" }))}
        >
          <i class="fas fa-plus"></i>
        </span>
      </div>
      <div className="side-body" style={show ? {} : { display: "none" }}>
        {todo?.sides?.map((val) => (
          <SideTask todo={todo} side={val}></SideTask>
        ))}
      </div>
    </div>
  );
}
