import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Row, Col, Badge, Button, ListGroup, Tab, Nav, Toast } from 'react-bootstrap';
import { FaDownload, FaArrowLeft, FaCalendarAlt, FaUser, FaBook, FaClipboardList, FaGraduationCap } from 'react-icons/fa';
import Loader from '../common/Loader';
import { downloadCurriculumPDF } from '../../utils/pdfUtils';

const CurriculumView = () => {
  const { id } = useParams();
  const [curriculum, setCurriculum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');
  
  useEffect(() => {
    // Simulate API call to fetch curriculum details
    const fetchCurriculumDetails = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data for a single curriculum
        const mockCurriculum = {
          id: parseInt(id),
          title: "Data Structures and Algorithms",
          department: "CSE",
          year: "2",
          semester: "Odd",
          faculty: "Prof. Meena Rani",
          lastUpdated: "2024-01-15",
          status: "published",
          description: "This course introduces fundamental data structures and algorithms that form the building blocks for efficient problem-solving in computer science. Students will learn about array and linked-based structures, trees, graphs, and various algorithm design techniques.",
          objectives: [
            "Understand the concepts of abstract data types and data structures",
            "Analyze the performance of algorithms and determine their time and space complexity",
            "Implement fundamental data structures and algorithms in a high-level programming language",
            "Apply appropriate data structures and algorithms to solve computational problems"
          ],
          outcomes: [
            "Ability to analyze and compare algorithms based on time and space complexity",
            "Proficiency in implementing and using linear and non-linear data structures",
            "Skills to design and implement efficient algorithms for solving complex problems",
            "Capability to select appropriate data structures for specific applications"
          ],
          units: [
            {
              title: "Introduction to Algorithms and Analysis",
              description: "Basic concepts of algorithms, time and space complexity, asymptotic analysis",
              topics: [
                "Introduction to Algorithms and Their Importance",
                "Asymptotic Notation: Big-O, Theta, and Omega",
                "Best, Worst, and Average Case Analysis",
                "Recursion and Recurrence Relations"
              ]
            },
            {
              title: "Linear Data Structures",
              description: "Implementation and applications of linear data structures",
              topics: [
                "Arrays and Dynamic Arrays",
                "Linked Lists: Singly, Doubly, and Circular",
                "Stacks and Their Applications",
                "Queues and Their Applications"
              ]
            },
            {
              title: "Tree Data Structures",
              description: "Different types of trees and their applications",
              topics: [
                "Binary Trees and Their Properties",
                "Binary Search Trees",
                "AVL Trees and Balancing",
                "B-Trees and B+ Trees"
              ]
            },
            {
              title: "Graph Algorithms",
              description: "Graph representation and algorithms for graph problems",
              topics: [
                "Graph Representation: Adjacency Matrix and Adjacency List",
                "Graph Traversals: BFS and DFS",
                "Shortest Path Algorithms: Dijkstra's and Bellman-Ford",
                "Minimum Spanning Trees: Prim's and Kruskal's Algorithms"
              ]
            },
            {
              title: "Algorithm Design Techniques",
              description: "Various techniques for designing efficient algorithms",
              topics: [
                "Divide and Conquer: Merge Sort and Quick Sort",
                "Greedy Algorithms and Applications",
                "Dynamic Programming and Applications",
                "Backtracking and Branch & Bound"
              ]
            }
          ],
          textbooks: [
            "Introduction to Algorithms by Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein",
            "Data Structures and Algorithms in Python by Michael T. Goodrich, Roberto Tamassia, and Michael H. Goldwasser",
            "Algorithms by Robert Sedgewick and Kevin Wayne"
          ],
          references: [
            "Algorithm Design by Jon Kleinberg and Éva Tardos",
            "The Art of Computer Programming by Donald E. Knuth",
            "Data Structures and Algorithm Analysis in C++ by Mark Allen Weiss"
          ]
        };
        
        setCurriculum(mockCurriculum);
      } catch (error) {
        console.error('Error fetching curriculum details:', error);
        setError('Failed to load curriculum details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCurriculumDetails();
  }, [id]);
  
  // Handle curriculum download
  const handleDownload = () => {
    try {
      const success = downloadCurriculumPDF(curriculum);
      
      if (success) {
        setToastVariant('success');
        setToastMessage('Curriculum downloaded successfully!');
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
  
  if (loading) {
    return <Loader message="Loading curriculum details..." />;
  }
  
  if (error) {
    return (
      <div className="text-center my-5">
        <p className="text-danger">{error}</p>
        <Button as={Link} to="/curriculum/list" variant="primary">
          Back to Curriculum List
        </Button>
      </div>
    );
  }
  
  if (!curriculum) {
    return (
      <div className="text-center my-5">
        <p>Curriculum not found.</p>
        <Button as={Link} to="/curriculum/list" variant="primary">
          Back to Curriculum List
        </Button>
      </div>
    );
  }
  
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
        <div className="d-flex align-items-center">
          <Button 
            as={Link} 
            to="/curriculum/list" 
            variant="outline-primary" 
            className="me-3"
          >
            <FaArrowLeft /> Back
          </Button>
          <h2 className="mb-0">Curriculum Details</h2>
        </div>
        <Button variant="success" onClick={handleDownload}>
          <FaDownload className="me-2" /> Download
        </Button>
      </div>
      
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-0">{curriculum.title}</h3>
            <Badge bg="light" text="primary">{curriculum.department}</Badge>
          </div>
        </Card.Header>
        
        <Card.Body>
          <Row className="mb-4">
            <Col md={6}>
              <div className="d-flex align-items-center mb-2">
                <FaUser className="text-primary me-2" />
                <span className="text-muted me-2">Faculty:</span>
                <span>{curriculum.faculty}</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <FaGraduationCap className="text-primary me-2" />
                <span className="text-muted me-2">Year:</span>
                <span>{curriculum.year}{curriculum.year === '1' ? 'st' : curriculum.year === '2' ? 'nd' : curriculum.year === '3' ? 'rd' : 'th'} Year</span>
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex align-items-center mb-2">
                <FaCalendarAlt className="text-primary me-2" />
                <span className="text-muted me-2">Semester:</span>
                <span>{curriculum.semester} Semester</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <FaBook className="text-primary me-2" />
                <span className="text-muted me-2">Last Updated:</span>
                <span>{curriculum.lastUpdated}</span>
              </div>
            </Col>
          </Row>
          
          <div className="mb-4">
            <h5>Course Description</h5>
            <p>{curriculum.description}</p>
          </div>
          
          <Tab.Container defaultActiveKey="units">
            <Nav variant="tabs" className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey="units">
                  <FaClipboardList className="me-1" /> Course Units
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="objectives">
                  <FaGraduationCap className="me-1" /> Objectives & Outcomes
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="references">
                  <FaBook className="me-1" /> Books & References
                </Nav.Link>
              </Nav.Item>
            </Nav>
            
            <Tab.Content>
              <Tab.Pane eventKey="units">
                <div className="p-2">
                  <h5>Course Units</h5>
                  <div className="mt-3">
                    {curriculum.units.map((unit, index) => (
                      <Card key={index} className="mb-3">
                        <Card.Header>
                          <h6 className="mb-0">Unit {index + 1}: {unit.title}</h6>
                        </Card.Header>
                        <Card.Body>
                          <p>{unit.description}</p>
                          <h6>Topics:</h6>
                          <ListGroup variant="flush">
                            {unit.topics.map((topic, topicIndex) => (
                              <ListGroup.Item key={topicIndex}>
                                {topic}
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </div>
              </Tab.Pane>
              
              <Tab.Pane eventKey="objectives">
                <div className="p-2">
                  <Row>
                    <Col md={6}>
                      <Card className="h-100">
                        <Card.Header>
                          <h5 className="mb-0">Course Objectives</h5>
                        </Card.Header>
                        <Card.Body>
                          <ListGroup variant="flush" numbered>
                            {curriculum.objectives.map((objective, index) => (
                              <ListGroup.Item key={index}>
                                {objective}
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </Card.Body>
                      </Card>
                    </Col>
                    
                    <Col md={6}>
                      <Card className="h-100">
                        <Card.Header>
                          <h5 className="mb-0">Course Outcomes</h5>
                        </Card.Header>
                        <Card.Body>
                          <ListGroup variant="flush" numbered>
                            {curriculum.outcomes.map((outcome, index) => (
                              <ListGroup.Item key={index}>
                                {outcome}
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Tab.Pane>
              
              <Tab.Pane eventKey="references">
                <div className="p-2">
                  <Row>
                    <Col md={6}>
                      <Card className="h-100">
                        <Card.Header>
                          <h5 className="mb-0">Textbooks</h5>
                        </Card.Header>
                        <Card.Body>
                          <ListGroup variant="flush" numbered>
                            {curriculum.textbooks.map((textbook, index) => (
                              <ListGroup.Item key={index}>
                                {textbook}
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </Card.Body>
                      </Card>
                    </Col>
                    
                    <Col md={6}>
                      <Card className="h-100">
                        <Card.Header>
                          <h5 className="mb-0">Reference Materials</h5>
                        </Card.Header>
                        <Card.Body>
                          <ListGroup variant="flush" numbered>
                            {curriculum.references.map((reference, index) => (
                              <ListGroup.Item key={index}>
                                {reference}
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CurriculumView;