import { SideTask } from "./SideTask";
import { useDispatch, useSelector } from "react-redux";
import {
  addSideTask,
  selectCurrentTodo,
  selectSideTasks,
} from "../features/project/projectSlice";
export function SideTasks(props) {
  const todo = useSelector(selectCurrentTodo);
  const dispatch = useDispatch();
  return (
    <div className="side-cont">
      <div className="side-head">
        Side Tasks{" "}
        <span
          className="append"
          onClick={() => dispatch(addSideTask(todo, { name: "" }))}
        >
          <i class="fas fa-plus"></i>
        </span>
      </div>
      <div className="side-body">
        {todo?.sides?.map((val) => (
          <SideTask name={val.name}></SideTask>
        ))}
      </div>
    </div>
  );
}
