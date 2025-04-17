import React, { useContext, useState, useEffect } from 'react';
import { Card, Row, Col, ListGroup, Button, Nav, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaDownload, 
  FaEye, 
  FaBook, 
  FaCalendarAlt, 
  FaNewspaper, 
  FaBullhorn,
  FaLink
} from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';
import { downloadCurriculumPDF } from '../../utils/pdfUtils';
import AnnouncementsList from '../announcements/AnnouncementsList';
import AcademicCalendar from '../calendar/AcademicCalendar';
import ResourcesList from '../resources/ResourcesList';

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [recentCurriculum, setRecentCurriculum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Toast notification state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');
  
  useEffect(() => {
    // Simulate API call to fetch recent curriculum
    const fetchRecentCurriculum = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockCurriculum = [
          {
            id: 1,
            title: 'Data Structures and Algorithms',
            department: 'CSE',
            year: '2',
            semester: 'Odd',
            lastUpdated: '2024-02-15',
            faculty: 'Prof. Meena Rani',
            description: 'Study of fundamental data structures and algorithms',
            objectives: ["Understand data structures", "Analyze algorithms"],
            outcomes: ["Implement various data structures", "Apply efficient algorithms"],
            units: [{title: "Arrays and Linked Lists", description: "Basic data structures", topics: ["Arrays", "Linked Lists"]}],
            textbooks: ["Introduction to Algorithms by CLRS"],
            references: ["Algorithms by Robert Sedgewick"]
          },
          {
            id: 2,
            title: 'Computer Networks',
            department: 'CSE',
            year: '3',
            semester: 'Even',
            lastUpdated: '2024-01-20',
            faculty: 'Dr. Sunil Reddy',
            description: 'Study of computer networks and protocols',
            objectives: ["Understand network concepts", "Learn network protocols"],
            outcomes: ["Design network infrastructure", "Implement network protocols"],
            units: [{title: "Network Fundamentals", description: "Introduction to networking", topics: ["OSI Model", "TCP/IP"]}],
            textbooks: ["Computer Networks by Tanenbaum"],
            references: ["TCP/IP Protocol Suite by Forouzan"]
          },
          {
            id: 3,
            title: 'Database Management Systems',
            department: 'CSE',
            year: '2',
            semester: 'Even',
            lastUpdated: '2024-03-05',
            faculty: 'Prof. Ananya Singh',
            description: 'Study of database concepts and SQL',
            objectives: ["Understand database design", "Learn SQL"],
            outcomes: ["Design databases", "Write complex SQL queries"],
            units: [{title: "Database Concepts", description: "Basic database design", topics: ["ER Model", "Normalization"]}],
            textbooks: ["Database System Concepts by Silberschatz"],
            references: ["Fundamentals of Database Systems by Elmasri"]
          }
        ];
        
        setRecentCurriculum(mockCurriculum);
      } catch (error) {
        console.error('Error fetching recent curriculum:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecentCurriculum();
  }, []);
  
  // Handle curriculum download
  const handleDownloadCurriculum = (item) => {
    try {
      const success = downloadCurriculumPDF(item);
      
      if (success) {
        setToastVariant('success');
        setToastMessage(`${item.title} curriculum downloaded successfully!`);
      } else {
        setToastVariant('danger');
        setToastMessage('Failed to download curriculum. Please try again.');
      }
      
      setShowToast(true);
    } catch (error) {
      console.error('Error downloading curriculum:', error);
      setToastVariant('danger');
      setToastMessage('An error occurred while downloading. Please try again.');
      setShowToast(true);
    }
  };
  
  // Handle tab selection
  const handleTabSelect = (key) => {
    setActiveTab(key);
  };
  
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Student Dashboard</h2>
        <div>
          <span className="text-muted">Welcome, </span>
          <span className="fw-bold">{user?.name}</span>
        </div>
      </div>
      
      <Tab.Container id="student-tabs" activeKey={activeTab} onSelect={handleTabSelect}>
        <Row className="mb-4">
          <Col>
            <Nav variant="pills" className="student-nav">
              <Nav.Item>
                <Nav.Link eventKey="dashboard" className="d-flex align-items-center">
                  <FaBook className="me-2" /> Dashboard
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="announcements" className="d-flex align-items-center">
                  <FaBullhorn className="me-2" /> Announcements
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="calendar" className="d-flex align-items-center">
                  <FaCalendarAlt className="me-2" /> Academic Calendar
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="resources" className="d-flex align-items-center">
                  <FaLink className="me-2" /> Resources & Links
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        
        <Tab.Content>
          {/* Dashboard Tab */}
          <Tab.Pane eventKey="dashboard">
            <Row className="g-4">
              {/* Quick Links */}
              <Col lg={4}>
                <Card className="shadow-sm h-100">
                  <Card.Header className="bg-primary text-white">
                    <h5 className="mb-0">Quick Links</h5>
                  </Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item action as={Link} to="/curriculum/list" className="d-flex align-items-center py-3">
                        <FaBook className="me-3 text-primary" />
                        View All Curriculum
                      </ListGroup.Item>
                      <ListGroup.Item action as={Link} to="/curriculum/search" className="d-flex align-items-center py-3">
                        <FaEye className="me-3 text-primary" />
                        Search Curriculum
                      </ListGroup.Item>
                      <ListGroup.Item 
                        action 
                        className="d-flex align-items-center py-3"
                        onClick={() => setActiveTab('calendar')}
                      >
                        <FaCalendarAlt className="me-3 text-primary" />
                        Academic Calendar
                      </ListGroup.Item>
                      <ListGroup.Item 
                        action 
                        className="d-flex align-items-center py-3"
                        onClick={() => setActiveTab('announcements')}
                      >
                        <FaNewspaper className="me-3 text-primary" />
                        Announcements
                      </ListGroup.Item>
                      <ListGroup.Item 
                        action 
                        className="d-flex align-items-center py-3"
                        onClick={() => setActiveTab('resources')}
                      >
                        <FaLink className="me-3 text-primary" />
                        Important Links & Resources
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
              
              {/* Recent Curriculum */}
              <Col lg={8}>
                <Card className="shadow-sm h-100">
                  <Card.Header className="bg-primary text-white">
                    <h5 className="mb-0">Recent Curriculum Updates</h5>
                  </Card.Header>
                  <Card.Body>
                    {loading ? (
                      <p className="text-center my-4">Loading recent curriculum...</p>
                    ) : (
                      <>
                        {recentCurriculum.length > 0 ? (
                          <div className="table-responsive">
                            <table className="table table-hover">
                              <thead>
                                <tr>
                                  <th>Title</th>
                                  <th>Department</th>
                                  <th>Year</th>
                                  <th>Semester</th>
                                  <th>Last Updated</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {recentCurriculum.map(item => (
                                  <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>{item.department}</td>
                                    <td>{item.year}</td>
                                    <td>{item.semester}</td>
                                    <td>{item.lastUpdated}</td>
                                    <td>
                                      <Button
                                        as={Link}
                                        to={`/curriculum/view/${item.id}`}
                                        variant="outline-primary"
                                        size="sm"
                                        className="me-2"
                                      >
                                        <FaEye /> View
                                      </Button>
                                      <Button
                                        variant="outline-success"
                                        size="sm"
                                        onClick={() => handleDownloadCurriculum(item)}
                                      >
                                        <FaDownload /> Download
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="text-center my-4">No recent curriculum updates found.</p>
                        )}
                        
                        <div className="text-end mt-3">
                          <Button as={Link} to="/curriculum/list" variant="primary">
                            View All Curriculum
                          </Button>
                        </div>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab.Pane>
          
          {/* Announcements Tab */}
          <Tab.Pane eventKey="announcements">
            <AnnouncementsList />
          </Tab.Pane>
          
          {/* Academic Calendar Tab */}
          <Tab.Pane eventKey="calendar">
            <AcademicCalendar />
          </Tab.Pane>
          
          {/* Resources & Links Tab */}
          <Tab.Pane eventKey="resources">
            <ResourcesList />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default StudentDashboard;