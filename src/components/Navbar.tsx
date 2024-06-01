import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function NavbarComponent() {
  return (
    <>
      <Navbar>
        <Container>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/register" className="nav-link">
            Register
          </NavLink>
          <NavLink to="/not-found" className="nav-link">
            404 - Not Found
          </NavLink>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
