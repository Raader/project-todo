import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, selectUser } from "./userSlice";

export function Login() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div>
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

      <button onClick={() => dispatch(loginUser({ email, password }))}>
        login
      </button>
    </div>
  );
}
