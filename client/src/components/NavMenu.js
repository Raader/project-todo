import "../styles/Navbar.css";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";

export function NavMenu() {
  const history = useHistory();
  const user = useSelector(selectUser);
  return (
    <Navbar sticky="top">
      <Navbar.Brand onClick={() => history.push("/")}>
        <i class="fas fa-list-alt"></i> PROJECT-TODO
      </Navbar.Brand>
      <Navbar.Toggle></Navbar.Toggle>
      <Navbar.Collapse className="justify-content-end">
        {user && user.name ? (
          <Navbar.Text className="username">{user.name}</Navbar.Text>
        ) : (
          <Navbar.Text className="user-ops">
            <span className="login-link" onClick={() => history.push("/login")}>
              Login
            </span>{" "}
            /{" "}
            <span
              className="register-link"
              onClick={() => history.push("/register")}
            >
              register
            </span>
          </Navbar.Text>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
