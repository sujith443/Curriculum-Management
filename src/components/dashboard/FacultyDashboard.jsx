import React, { useContext, useState, useEffect } from 'react';
import { Card, Row, Col, Button, Badge, Toast, Nav, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaUpload, 
  FaEdit, 
  FaChartBar, 
  FaCalendarAlt, 
  FaBook, 
  FaDownload, 
  FaEye,
  FaBullhorn,
  FaLink
} from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';
import { downloadCurriculumPDF } from '../../utils/pdfUtils';
import AnnouncementsList from '../announcements/AnnouncementsList';
import AcademicCalendar from '../calendar/AcademicCalendar';
import ResourcesList from '../resources/ResourcesList';

const FacultyDashboard = () => {
  const { user } = useContext(AuthContext);
  const [myCurriculum, setMyCurriculum] = useState([]);
  const [stats, setStats] = useState({ 
    total: 0, 
    published: 0, 
    drafts: 0, 
    recentViews: 0 
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Toast notification state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');
  
  useEffect(() => {
    // Simulate API call to fetch faculty curriculum and stats
    const fetchFacultyData = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock curriculum data
        const mockCurriculum = [
          {
            id: 1,
            title: 'Advanced Database Systems',
            department: 'CSE',
            year: '3',
            semester: 'Odd',
            status: 'published',
            lastUpdated: '2024-02-10',
            views: 45,
            faculty: 'Dr. Jane Smith',
            description: 'Advanced concepts in database management systems',
            objectives: [
              "Understand advanced database concepts",
              "Learn database optimization techniques"
            ],
            outcomes: [
              "Design complex database systems",
              "Implement query optimization strategies"
            ],
            units: [
              {
                title: "Advanced SQL",
                description: "Complex SQL operations",
                topics: ["Stored Procedures", "Triggers", "Views"]
              }
            ],
            textbooks: ["Database System Concepts by Silberschatz"],
            references: ["Fundamentals of Database Systems by Elmasri"]
          },
          {
            id: 2,
            title: 'Artificial Intelligence',
            department: 'CSE',
            year: '4',
            semester: 'Even',
            status: 'published',
            lastUpdated: '2024-01-15',
            views: 38,
            faculty: 'Dr. Jane Smith',
            description: 'Introduction to artificial intelligence concepts',
            objectives: [
              "Understand AI fundamentals",
              "Learn problem-solving techniques"
            ],
            outcomes: [
              "Implement search algorithms",
              "Design intelligent systems"
            ],
            units: [
              {
                title: "Problem Solving",
                description: "AI problem-solving methods",
                topics: ["Search Algorithms", "Heuristics", "Game Theory"]
              }
            ],
            textbooks: ["Artificial Intelligence: A Modern Approach by Russell and Norvig"],
            references: ["Introduction to Artificial Intelligence by Ertel"]
          },
          {
            id: 3,
            title: 'Machine Learning',
            department: 'CSE',
            year: '4',
            semester: 'Odd',
            status: 'draft',
            lastUpdated: '2024-03-01',
            views: 0,
            faculty: 'Dr. Jane Smith',
            description: 'Introduction to machine learning algorithms',
            objectives: [
              "Understand machine learning concepts",
              "Learn different learning paradigms"
            ],
            outcomes: [
              "Implement supervised learning algorithms",
              "Design unsupervised learning systems"
            ],
            units: [
              {
                title: "Supervised Learning",
                description: "Learning with labeled data",
                topics: ["Regression", "Classification", "Neural Networks"]
              }
            ],
            textbooks: ["Pattern Recognition and Machine Learning by Bishop"],
            references: ["Machine Learning by Mitchell"]
          }
        ];
        
        setMyCurriculum(mockCurriculum);
        
        // Calculate stats
        const total = mockCurriculum.length;
        const published = mockCurriculum.filter(c => c.status === 'published').length;
        const drafts = mockCurriculum.filter(c => c.status === 'draft').length;
        const recentViews = mockCurriculum.reduce((sum, curr) => sum + curr.views, 0);
        
        setStats({ total, published, drafts, recentViews });
      } catch (error) {
        console.error('Error fetching faculty data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFacultyData();
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
      {/* Toast notification */}
      <Toast 
        show={showToast} 
        onClose={() => setShowToast(false)} 
        delay={3000} 
        autohide
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 9999
        }}
        bg={toastVariant}
      >
        <Toast.Header>
          <strong className="me-auto">
            {toastVariant === 'success' ? 'Success' : 'Error'}
          </strong>
        </Toast.Header>
        <Toast.Body className={toastVariant === 'success' ? '' : 'text-white'}>
          {toastMessage}
        </Toast.Body>
      </Toast>
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Faculty Dashboard</h2>
        <div>
          <span className="text-muted">Welcome, </span>
          <span className="fw-bold">{user?.name}</span>
          <span className="ms-2 text-muted">({user?.department})</span>
        </div>
      </div>
      
      <Tab.Container id="faculty-tabs" activeKey={activeTab} onSelect={handleTabSelect}>
        <Row className="mb-4">
          <Col>
            <Nav variant="pills" className="faculty-nav">
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
            {/* Stats Cards */}
            <Row className="g-4 mb-4">
              <Col md={6} xl={3}>
                <Card className="bg-primary text-white h-100">
                  <Card.Body className="d-flex flex-column align-items-center p-4">
                    <FaBook className="display-4 mb-2" />
                    <h3 className="fw-bold mb-0">{stats.total}</h3>
                    <p className="mb-0">Total Curriculum</p>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={6} xl={3}>
                <Card className="bg-success text-white h-100">
                  <Card.Body className="d-flex flex-column align-items-center p-4">
                    <FaUpload className="display-4 mb-2" />
                    <h3 className="fw-bold mb-0">{stats.published}</h3>
                    <p className="mb-0">Published</p>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={6} xl={3}>
                <Card className="bg-warning text-dark h-100">
                  <Card.Body className="d-flex flex-column align-items-center p-4">
                    <FaEdit className="display-4 mb-2" />
                    <h3 className="fw-bold mb-0">{stats.drafts}</h3>
                    <p className="mb-0">Drafts</p>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={6} xl={3}>
                <Card className="bg-info text-white h-100">
                  <Card.Body className="d-flex flex-column align-items-center p-4">
                    <FaChartBar className="display-4 mb-2" />
                    <h3 className="fw-bold mb-0">{stats.recentViews}</h3>
                    <p className="mb-0">Recent Views</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            
            <Row className="g-4">
              {/* Quick Actions */}
              <Col lg={4}>
                <Card className="shadow-sm h-100">
                  <Card.Header className="bg-primary text-white">
                    <h5 className="mb-0">Quick Actions</h5>
                  </Card.Header>
                  <Card.Body className="d-grid gap-3">
                    <Button as={Link} to="/curriculum/upload" variant="primary" size="lg" className="d-flex align-items-center justify-content-center">
                      <FaUpload className="me-2" /> Upload New Curriculum
                    </Button>
                    <Button as={Link} to="/curriculum/list" variant="outline-primary" size="lg" className="d-flex align-items-center justify-content-center">
                      <FaBook className="me-2" /> View All Curriculum
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      size="lg" 
                      className="d-flex align-items-center justify-content-center"
                      onClick={() => setActiveTab('calendar')}
                    >
                      <FaCalendarAlt className="me-2" /> Academic Calendar
                    </Button>
                    <Button 
                      variant="outline-info" 
                      size="lg" 
                      className="d-flex align-items-center justify-content-center"
                      onClick={() => setActiveTab('announcements')}
                    >
                      <FaBullhorn className="me-2" /> View Announcements
                    </Button>
                    <Button 
                      variant="outline-success" 
                      size="lg" 
                      className="d-flex align-items-center justify-content-center"
                      onClick={() => setActiveTab('resources')}
                    >
                      <FaLink className="me-2" /> Important Links
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              
              {/* My Uploaded Curriculum */}
              <Col lg={8}>
                <Card className="shadow-sm h-100">
                  <Card.Header className="bg-primary text-white">
                    <h5 className="mb-0">My Uploaded Curriculum</h5>
                  </Card.Header>
                  <Card.Body>
                    {loading ? (
                      <p className="text-center my-4">Loading your curriculum data...</p>
                    ) : (
                      <>
                        {myCurriculum.length > 0 ? (
                          <div className="table-responsive">
                            <table className="table table-hover">
                              <thead>
                                <tr>
                                  <th>Title</th>
                                  <th>Year</th>
                                  <th>Semester</th>
                                  <th>Status</th>
                                  <th>Last Updated</th>
                                  <th>Views</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {myCurriculum.map(item => (
                                  <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>{item.year}</td>
                                    <td>{item.semester}</td>
                                    <td>
                                      {item.status === 'published' ? (
                                        <Badge bg="success">Published</Badge>
                                      ) : (
                                        <Badge bg="warning" text="dark">Draft</Badge>
                                      )}
                                    </td>
                                    <td>{item.lastUpdated}</td>
                                    <td>{item.views}</td>
                                    <td>
                                      <Button
                                        as={Link}
                                        to={`/curriculum/view/${item.id}`}
                                        variant="outline-primary"
                                        size="sm"
                                        className="me-2"
                                        title="View"
                                      >
                                        <FaEye />
                                      </Button>
                                      <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        className="me-2"
                                        title="Edit"
                                      >
                                        <FaEdit />
                                      </Button>
                                      {item.status === 'published' && (
                                        <Button
                                          variant="outline-success"
                                          size="sm"
                                          title="Download"
                                          onClick={() => handleDownloadCurriculum(item)}
                                        >
                                          <FaDownload />
                                        </Button>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="text-center my-4">
                            <p>You haven't uploaded any curriculum yet.</p>
                            <Button as={Link} to="/curriculum/upload" variant="primary">
                              Upload Your First Curriculum
                            </Button>
                          </div>
                        )}
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

export default FacultyDashboard;