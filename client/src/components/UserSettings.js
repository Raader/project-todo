import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { logoutUser, selectUser } from "../features/user/userSlice";
import { Returner } from "./Returner";

export function UserSettings() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
  return (
    <div className="us-cont">
      <Returner></Returner>
      <div className="us-portrait">
        <i className="fas fa-user-circle"></i>
      </div>
      <div className="us-name">{user.name}</div>
      <div className="us-email">{user.email}</div>
      <div className="us-stats">
        <div className="us-stat">
          <i class="fas fa-calendar-week"></i> Joined: 23.04.2021
        </div>
      </div>
      <div className="us-options">
        <Button
          variant="nice"
          onClick={() => {
            dispatch(logoutUser());
            history.push("/");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
