import React, { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import { AuthContext } from '../../contexts/AuthContext';

const MainLayout = () => {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // If no user, only show the outlet (which will redirect to login)
  if (!user) {
    return <Outlet />;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar toggleSidebar={toggleSidebar} />
      
      <Container fluid className="flex-grow-1 p-0">
        <Row className="g-0 h-100">
          {sidebarOpen && (
            <Col xs={12} md={3} lg={2} className="sidebar-container">
              <Sidebar />
            </Col>
          )}
          
          <Col xs={12} md={sidebarOpen ? 9 : 12} lg={sidebarOpen ? 10 : 12} className="main-content py-4 px-4">
            <Outlet />
          </Col>
        </Row>
      </Container>
      
      <Footer />
    </div>
  );
};

export default MainLayout;