import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editSideTask } from "../features/project/projectSlice";

export function SideTask(props) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.side.name) {
      setName(props.side.name);
    }
  }, [props.side]);
  return (
    <div className="side-item">
      <i class="far fa-square"></i>
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
      <span className="append">
        <i class="fas fa-trash" id="delete"></i>
      </span>
    </div>
  );
}
