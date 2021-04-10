import "../styles/Navbar.css";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUser } from "../features/user/userSlice";

export function NavMenu() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <Navbar sticky="top">
      <Navbar.Brand className="main-title" onClick={() => history.push("/")}>
        <i class="fas fa-list-alt"></i> PROJECT-TODO
      </Navbar.Brand>
      <Navbar.Toggle></Navbar.Toggle>
      <Nav className="mr-auto">
        <Nav.Link onClick={() => history.push("/main")}>Main</Nav.Link>
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        {user && user.name ? (
          <Navbar.Text className="username">
            {user.name}{" "}
            <span className="logout" onClick={() => dispatch(logoutUser())}>
              Logout
            </span>
          </Navbar.Text>
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
