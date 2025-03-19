import React, { useContext } from 'react';
import { Navbar as BootstrapNavbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BootstrapNavbar bg="primary" variant="dark" expand="lg" className="py-2">
      <Container fluid>
        <button className="btn btn-primary d-md-inline-block d-none me-2" onClick={toggleSidebar}>
          <FaBars />
        </button>
        
        <BootstrapNavbar.Brand as={Link} to="/">
          <img
            src="/assets/images/svit-logo.png"
            alt="SVIT Logo"
            height="30"
            className="d-inline-block align-top me-2"
          />
          SVIT Curriculum Management
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user && (
              <>
                <NavDropdown 
                  title={
                    <span>
                      <FaUser className="me-1" />
                      {user.name}
                    </span>
                  } 
                  id="user-dropdown"
                >
                  <NavDropdown.Item as={Link} to={`/dashboard/${user.role}`}>Dashboard</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;