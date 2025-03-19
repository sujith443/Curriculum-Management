import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaBook, 
  FaUpload, 
  FaList, 
  FaSearch, 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaUserCog 
} from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  
  // Function to check if the current path is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="sidebar bg-light h-100 d-flex flex-column">
      <div className="p-3 text-center">
        {user?.role === 'student' && (
          <div className="py-2">
            <FaUserGraduate size={40} className="text-primary mb-2" />
            <h5 className="mb-0">Student</h5>
          </div>
        )}
        
        {user?.role === 'faculty' && (
          <div className="py-2">
            <FaChalkboardTeacher size={40} className="text-primary mb-2" />
            <h5 className="mb-0">Faculty</h5>
          </div>
        )}
        
        {user?.role === 'admin' && (
          <div className="py-2">
            <FaUserCog size={40} className="text-primary mb-2" />
            <h5 className="mb-0">Administrator</h5>
          </div>
        )}
      </div>
      
      <Nav className="flex-column mt-2">
        {/* Dashboard Link */}
        <Nav.Link 
          as={Link} 
          to={`/dashboard/${user?.role}`}
          className={`sidebar-link ${isActive(`/dashboard/${user?.role}`) ? 'active' : ''}`}
        >
          <FaHome className="me-2" /> Dashboard
        </Nav.Link>
        
        {/* Curriculum Management Links */}
        <div className="sidebar-heading px-3 mt-3 mb-1 text-muted">
          Curriculum
        </div>
        
        {/* Upload Curriculum - Only for Faculty and Admin */}
        {(user?.role === 'faculty' || user?.role === 'admin') && (
          <Nav.Link 
            as={Link} 
            to="/curriculum/upload"
            className={`sidebar-link ${isActive('/curriculum/upload') ? 'active' : ''}`}
          >
            <FaUpload className="me-2" /> Upload Curriculum
          </Nav.Link>
        )}
        
        {/* View Curriculum - All Users */}
        <Nav.Link 
          as={Link} 
          to="/curriculum/list"
          className={`sidebar-link ${isActive('/curriculum/list') ? 'active' : ''}`}
        >
          <FaList className="me-2" /> View Curriculum
        </Nav.Link>
        
        {/* Search Curriculum - All Users */}
        <Nav.Link 
          as={Link} 
          to="/curriculum/search"
          className={`sidebar-link ${isActive('/curriculum/search') ? 'active' : ''}`}
        >
          <FaSearch className="me-2" /> Search Curriculum
        </Nav.Link>
      </Nav>
      
      <div className="mt-auto p-3 text-center">
        <div className="text-muted small">
          SVIT Curriculum Management <br />
          © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;