import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import useAppContext from "../services/AppContext";

const NavbarComponent = () => {
  const appcontext = useAppContext();
  return (
    <Navbar expand="lg" className="bg-body-tertiary rounded mb-4">
      <Container fluid>
        <Navbar.Brand className="col-lg-3 me-0">
          <NavLink to="/" className="nav-link">
            Example
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="d-lg-flex justify-content-lg-evenly"
        >
          <Nav className="col-lg-8 justify-content-center">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
            <NavLink to="/not-found" className="nav-link">
              404 Not Found
            </NavLink>
          </Nav>
          <div className="col-lg-4 justify-content-end">
            {appcontext.sessionData ? (
              <Dropdown>
                <Dropdown.Toggle
                  variant="secondary"
                  id="dropdown-basic"
                  className="float-end"
                >
                  {appcontext.sessionData?.user?.name_first}
                </Dropdown.Toggle>
                <Dropdown.Menu align="end" className="mt-5">
                  <Dropdown.Item onClick={() => appcontext.logout()}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="float-end">
                <Link to="/login" className="btn btn-primary me-2">
                  Login
                </Link>
                <Link to="/register" className="btn btn-secondary">
                  Register
                </Link>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
