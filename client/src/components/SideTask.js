import { useEffect, useState } from "react";

export function SideTask(props) {
  const [name, setName] = useState("");
  useEffect(() => {
    if (props.name) {
      setName(props.name);
    }
  }, [props.name]);
  return (
    <div className="side-item">
      <i class="far fa-square"></i>
      <input
        className="cleaner-input side-item-main"
        placeholder="write a sidetask here"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <span className="append">
        <i class="fas fa-trash" id="delete"></i>
      </span>
    </div>
  );
}
