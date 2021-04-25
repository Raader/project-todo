import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUser } from "../features/user/userSlice";

export function UserSettings() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <div className="us-cont">
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
        <Button variant="nice" onClick={() => dispatch(logoutUser())}>
          Logout
        </Button>
      </div>
    </div>
  );
}
