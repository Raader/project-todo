import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, selectUser } from "./userSlice";

export function User() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div>
      <input
        placeholder="name"
        onInput={(e) => setName(e.target.value)}
      ></input>
      <input
        placeholder="email"
        type="email"
        onInput={(e) => setEmail(e.target.value)}
      ></input>
      <input
        placeholder="password"
        type="password"
        onInput={(e) => setPassword(e.target.value)}
      ></input>

      <button onClick={() => dispatch(registerUser({ name, email, password }))}>
        register
      </button>
    </div>
  );
}
