import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  completeSideTask,
  editSideTask,
  removeSideTask,
} from "../features/project/projectSlice";

export function SideTask(props) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.side.name) {
      setName(props.side.name);
    }
  }, [props.side]);

  const renderTask = () => {
    if (props.side.completed) {
      return (
        <div
          className="side-item completed"
          onClick={() => dispatch(completeSideTask(props.todo, props.side))}
        >
          <i class="fas fa-square"></i>
          <input
            className="cleaner-input side-item-main"
            placeholder="write a sidetask here"
            value={name}
            disabled
          ></input>
          <span
            className="append"
            onClick={() => dispatch(removeSideTask(props.todo, props.side))}
          >
            <i class="fas fa-trash" id="delete"></i>
          </span>
        </div>
      );
    }
    return (
      <div className="side-item">
        <i
          class="far fa-square"
          onClick={() => dispatch(completeSideTask(props.todo, props.side))}
        ></i>
        <input
          className="cleaner-input side-item-main"
          placeholder="write a sidetask here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => {
            if (!props.todo.id || !props.side.id || props.side.name === name)
              return;
            dispatch(editSideTask(props.todo, { name, id: props.side.id }));
          }}
        ></input>
        <span
          className="append"
          onClick={() => dispatch(removeSideTask(props.todo, props.side))}
        >
          <i class="fas fa-trash" id="delete"></i>
        </span>
      </div>
    );
  };
  return renderTask();
}
