import { useState } from "react";

export function OrderBar(props) {
  const [importance, setImp] = useState(0);
  const [time, setTime] = useState(0);
  const [difficulty, setDiff] = useState(0);
  const handleClick = (name, state, set) => {
    const val = state;
    setImp(0);
    setTime(0);
    setDiff(0);
    if (val <= 0) {
      set(1);
      props.set(name, 1);
    } else if (val === 1) {
      set(2);
      props.set(name, 2);
    } else if (val === 2) {
      set(0);
      props.set(name, 0);
    }
  };
  const renderArrow = (num) => {
    if (num <= 0) {
      return;
    } else if (num === 1) {
      return <i class="fas fa-sort-up"></i>;
    } else if (num === 2) {
      return <i class="fas fa-sort-down"></i>;
    }
  };
  return (
    <span className="order-bar">
      <span
        className="order-btn"
        onClick={() => handleClick("importance", importance, setImp)}
      >
        <i class="fas fa-exclamation"></i>
        {renderArrow(importance)}
      </span>
      <span
        className="order-btn"
        onClick={() => handleClick("time", time, setTime)}
      >
        <i class="fas fa-hourglass"></i>
        {renderArrow(time)}
      </span>
      <span
        className="order-btn"
        onClick={() => handleClick("difficulty", difficulty, setDiff)}
      >
        <i class="fas fa-plus-circle"></i>
        {renderArrow(difficulty)}
      </span>
    </span>
  );
}
