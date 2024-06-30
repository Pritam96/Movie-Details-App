import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
// import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Movie-Suggest</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Movies" id="basic-nav-dropdown">
                <LinkContainer to="/movies/popular">
                  <NavDropdown.Item>Popular</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/movies/now_playing">
                  <NavDropdown.Item>Now Playing</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/movies/upcoming">
                  <NavDropdown.Item>Upcoming</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/movies/top_rated">
                  <NavDropdown.Item>Top Rated</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
            {/* <Nav className="ms-auto">
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaSignInAlt size={17} />
                  &nbsp;Login
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link>
                  <FaUserPlus size={17} />
                  &nbsp;Register
                </Nav.Link>
              </LinkContainer>
            </Nav> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
