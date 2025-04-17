import React, { useContext, useState, useEffect } from 'react';
import { Card, Row, Col, Button, ProgressBar, Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaBook, 
  FaChalkboardTeacher, 
  FaUserGraduate,
  FaEye,
  FaUpload,
  FaEdit,
  FaBullhorn,
  FaCalendarAlt,
  FaLink
} from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';
import AnnouncementManager from '../announcements/AnnouncementManager';
import CalendarManager from '../calendar/CalendarManager';
import ResourceManager from '../resources/ResourceManager';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalCurriculum: 0,
    totalFaculty: 0,
    totalStudents: 0,
    departmentStats: []
  });
  const [recentUploads, setRecentUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    // Simulate API call to fetch admin dashboard data
    const fetchAdminData = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock statistics
        const mockStats = {
          totalCurriculum: 56,
          totalFaculty: 34,
          totalStudents: 1205,
          departmentStats: [
            { 
              department: 'CSE',
              curriculumCount: 18,
              facultyCount: 12,
              completionPercentage: 95
            },
            { 
              department: 'ECE',
              curriculumCount: 15,
              facultyCount: 8,
              completionPercentage: 88
            },
            { 
              department: 'EEE',
              curriculumCount: 10,
              facultyCount: 6,
              completionPercentage: 82
            },
            { 
              department: 'MECH',
              curriculumCount: 8,
              facultyCount: 5,
              completionPercentage: 75
            },
            { 
              department: 'CIVIL',
              curriculumCount: 5,
              facultyCount: 3,
              completionPercentage: 70
            }
          ]
        };
        
        // Mock recent uploads
        const mockRecentUploads = [
          {
            id: 1,
            title: 'Big Data Analytics',
            department: 'CSE',
            year: '4',
            faculty: 'Dr. Ramesh Kumar',
            uploadDate: '2024-03-07',
            status: 'published'
          },
          {
            id: 2,
            title: 'VLSI Design',
            department: 'ECE',
            year: '3',
            faculty: 'Dr. Priya Singh',
            uploadDate: '2024-03-05',
            status: 'published'
          },
          {
            id: 3,
            title: 'Power Electronics',
            department: 'EEE',
            year: '3',
            faculty: 'Prof. Suresh Reddy',
            uploadDate: '2024-03-02',
            status: 'draft'
          },
          {
            id: 4,
            title: 'Heat Transfer',
            department: 'MECH',
            year: '2',
            faculty: 'Dr. Manoj Verma',
            uploadDate: '2024-02-28',
            status: 'published'
          },
          {
            id: 5,
            title: 'Structural Engineering',
            department: 'CIVIL',
            year: '3',
            faculty: 'Prof. Anil Sharma',
            uploadDate: '2024-02-25',
            status: 'published'
          }
        ];
        
        setStats(mockStats);
        setRecentUploads(mockRecentUploads);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAdminData();
  }, []);
  
  // Handle tab selection
  const handleTabSelect = (key) => {
    setActiveTab(key);
  };
  
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Administrator Dashboard</h2>
        <div>
          <span className="text-muted">Welcome, </span>
          <span className="fw-bold">{user?.name}</span>
        </div>
      </div>
      
      <Tab.Container id="admin-tabs" activeKey={activeTab} onSelect={handleTabSelect}>
        <Row className="mb-4">
          <Col>
            <Nav variant="pills" className="admin-nav">
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
            {/* Stats Overview */}
            <Row className="g-4 mb-4">
              <Col md={4}>
                <Card className="bg-primary text-white h-100">
                  <Card.Body className="d-flex align-items-center p-4">
                    <div className="rounded-circle bg-white p-3 me-3">
                      <FaBook className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="fw-bold mb-0">{stats.totalCurriculum}</h3>
                      <p className="mb-0">Total Curriculum</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={4}>
                <Card className="bg-success text-white h-100">
                  <Card.Body className="d-flex align-items-center p-4">
                    <div className="rounded-circle bg-white p-3 me-3">
                      <FaChalkboardTeacher className="text-success" size={24} />
                    </div>
                    <div>
                      <h3 className="fw-bold mb-0">{stats.totalFaculty}</h3>
                      <p className="mb-0">Faculty Members</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={4}>
                <Card className="bg-info text-white h-100">
                  <Card.Body className="d-flex align-items-center p-4">
                    <div className="rounded-circle bg-white p-3 me-3">
                      <FaUserGraduate className="text-info" size={24} />
                    </div>
                    <div>
                      <h3 className="fw-bold mb-0">{stats.totalStudents}</h3>
                      <p className="mb-0">Students</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            
            <Row className="g-4">
              {/* Department Stats */}
              <Col lg={5}>
                <Card className="shadow-sm h-100">
                  <Card.Header className="bg-primary text-white">
                    <h5 className="mb-0">Department Statistics</h5>
                  </Card.Header>
                  <Card.Body>
                    {loading ? (
                      <p className="text-center my-4">Loading department statistics...</p>
                    ) : (
                      <>
                        {stats.departmentStats.map((dept, index) => (
                          <div key={index} className="mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                              <h6 className="mb-0">{dept.department}</h6>
                              <span className="badge bg-primary">{dept.curriculumCount} Curriculum</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <small className="text-muted">{dept.facultyCount} Faculty Members</small>
                              <small className="fw-bold">{dept.completionPercentage}% Complete</small>
                            </div>
                            <ProgressBar 
                              now={dept.completionPercentage} 
                              variant={
                                dept.completionPercentage >= 90 ? 'success' : 
                                dept.completionPercentage >= 75 ? 'primary' : 
                                dept.completionPercentage >= 60 ? 'info' : 'warning'
                              }
                            />
                          </div>
                        ))}
                        
                        <div className="text-center mt-4">
                          <Button variant="outline-primary">View Detailed Report</Button>
                        </div>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              
              {/* Recent Uploads and Quick Actions */}
              <Col lg={7}>
                <Card className="shadow-sm h-100">
                  <Card.Header className="bg-primary text-white">
                    <h5 className="mb-0">Recent Activities</h5>
                  </Card.Header>
                  <Card.Body>
                    <Tab.Container defaultActiveKey="recent">
                      <Nav variant="tabs" className="mb-3">
                        <Nav.Item>
                          <Nav.Link eventKey="recent">Recent Uploads</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="actions">Quick Actions</Nav.Link>
                        </Nav.Item>
                      </Nav>
                      
                      <Tab.Content>
                        <Tab.Pane eventKey="recent">
                          {loading ? (
                            <p className="text-center my-4">Loading recent uploads...</p>
                          ) : (
                            <div className="table-responsive">
                              <table className="table table-hover">
                                <thead>
                                  <tr>
                                    <th>Title</th>
                                    <th>Department</th>
                                    <th>Year</th>
                                    <th>Faculty</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {recentUploads.map(item => (
                                    <tr key={item.id}>
                                      <td>{item.title}</td>
                                      <td>{item.department}</td>
                                      <td>{item.year}</td>
                                      <td>{item.faculty}</td>
                                      <td>{item.uploadDate}</td>
                                      <td>
                                        <span className={`badge ${item.status === 'published' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                          {item.status === 'published' ? 'Published' : 'Draft'}
                                        </span>
                                      </td>
                                      <td>
                                        <Button
                                          as={Link}
                                          to={`/curriculum/view/${item.id}`}
                                          variant="outline-primary"
                                          size="sm"
                                          className="me-1"
                                        >
                                          <FaEye />
                                        </Button>
                                        <Button
                                          variant="outline-secondary"
                                          size="sm"
                                        >
                                          <FaEdit />
                                        </Button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </Tab.Pane>
                        
                        <Tab.Pane eventKey="actions">
                          <div className="d-grid gap-3 p-2">
                            <Button as={Link} to="/curriculum/upload" variant="primary" size="lg" className="d-flex align-items-center justify-content-center">
                              <FaUpload className="me-2" /> Upload New Curriculum
                            </Button>
                            <Button as={Link} to="/curriculum/list" variant="outline-primary" size="lg" className="d-flex align-items-center justify-content-center">
                              <FaBook className="me-2" /> Manage All Curriculum
                            </Button>
                            <Button 
                              variant="outline-success" 
                              size="lg" 
                              className="d-flex align-items-center justify-content-center"
                              onClick={() => setActiveTab('announcements')}
                            >
                              <FaBullhorn className="me-2" /> Manage Announcements
                            </Button>
                            <Button 
                              variant="outline-info" 
                              size="lg" 
                              className="d-flex align-items-center justify-content-center"
                              onClick={() => setActiveTab('calendar')}
                            >
                              <FaCalendarAlt className="me-2" /> Manage Academic Calendar
                            </Button>
                            <Button 
                              variant="outline-warning" 
                              size="lg" 
                              className="d-flex align-items-center justify-content-center"
                              onClick={() => setActiveTab('resources')}
                            >
                              <FaLink className="me-2" /> Manage Resources & Links
                            </Button>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab.Pane>
          
          {/* Announcements Management Tab */}
          <Tab.Pane eventKey="announcements">
            <AnnouncementManager />
          </Tab.Pane>
          
          {/* Academic Calendar Management Tab */}
          <Tab.Pane eventKey="calendar">
            <CalendarManager />
          </Tab.Pane>
          
          {/* Resources Management Tab */}
          <Tab.Pane eventKey="resources">
            <ResourceManager />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default AdminDashboard;