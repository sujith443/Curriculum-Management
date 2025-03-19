import React, { useContext, useState, useEffect } from 'react';
import { Card, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaDownload, FaEye, FaBook, FaCalendarAlt, FaNewspaper } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [recentCurriculum, setRecentCurriculum] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
            lastUpdated: '2024-02-15'
          },
          {
            id: 2,
            title: 'Computer Networks',
            department: 'CSE',
            year: '3',
            semester: 'Even',
            lastUpdated: '2024-01-20'
          },
          {
            id: 3,
            title: 'Database Management Systems',
            department: 'CSE',
            year: '2',
            semester: 'Even',
            lastUpdated: '2024-03-05'
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
  
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Student Dashboard</h2>
        <div>
          <span className="text-muted">Welcome, </span>
          <span className="fw-bold">{user?.name}</span>
        </div>
      </div>
      
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
                <ListGroup.Item action className="d-flex align-items-center py-3">
                  <FaCalendarAlt className="me-3 text-primary" />
                  Academic Calendar
                </ListGroup.Item>
                <ListGroup.Item action className="d-flex align-items-center py-3">
                  <FaNewspaper className="me-3 text-primary" />
                  Announcements
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
    </div>
  );
};

export default StudentDashboard;