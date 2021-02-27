import "../styles/Navbar.css";
import { Nav, Navbar } from "react-bootstrap";

export function NavMenu() {
  return (
    <Navbar sticky="top">
      <Navbar.Brand>
        <i class="fas fa-list-alt"></i> PROJECT-TODO
      </Navbar.Brand>
      <Navbar.Toggle></Navbar.Toggle>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className="user-ops">
          <span className="login-link">Login</span> /{" "}
          <span className="register-link">register</span>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}
