import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import useAppContext from "../services/AppContext";

const NavbarComponent = () => {
  const appcontext = useAppContext();
  return (
    // Styles
    //
    // Full-Width
    // Navbar Classes: mb-4
    // Container: fluid attribute
    // Container Classes:
    //
    // Middle Center
    // Navbar Classes: mb-4
    // Container: remove fluid attribute
    // Container Classes: bg-body-tertiary p-3 rounded
    //
    // You can also add "rounded" class
    <Navbar expand="lg" className="bg-body-tertiary mb-4">
      <Container>
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
            <NavLink to="/checkout" className="nav-link">
              Checkout
            </NavLink>
            <NavLink to="/not-found" className="nav-link">
              404 Not Found
            </NavLink>
            {appcontext.sessionData && (
              <>
                <NavLink to="/tasks" className="nav-link">
                  Tasks
                </NavLink>
                <NavLink to="/recorder" className="nav-link">
                  Recorder
                </NavLink>
              </>
            )}
          </Nav>
          <div className="col-lg-4 justify-content-end">
            {appcontext.sessionData ? (
              <Dropdown>
                <Dropdown.Toggle
                  variant="secondary"
                  id="dropdown-basic"
                  className="float-end"
                >
                  {appcontext.sessionData?.user?.name_first
                    ? appcontext.sessionData.user.name_first
                    : "Logged In"}
                </Dropdown.Toggle>
                <Dropdown.Menu align="end" className="mt-5">
                  <Dropdown.ItemText>
                    <Link to="/profile" className="nav-link">
                      Profile
                    </Link>
                  </Dropdown.ItemText>
                  <Dropdown.ItemText>
                    <Link to="/account" className="nav-link">
                      Account
                    </Link>
                  </Dropdown.ItemText>
                  <Dropdown.Divider />
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
