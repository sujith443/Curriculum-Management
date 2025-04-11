import React, { useState, useEffect, useContext } from 'react';
import { Card, Form, Button, Row, Col, Badge, Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaEye, FaDownload, FaFilter, FaSort, FaFilePdf } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';
import Loader from '../common/Loader';
import { downloadCurriculumPDF, downloadCurriculumListPDF } from '../../utils/pdfUtils';

const CurriculumList = () => {
  const { user } = useContext(AuthContext);
  const [curriculumList, setCurriculumList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Toast notification state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');
  
  // Filter states
  const [filters, setFilters] = useState({
    department: '',
    year: '',
    semester: ''
  });
  
  // Sort state
  const [sortConfig, setSortConfig] = useState({
    key: 'lastUpdated',
    direction: 'desc'
  });
  
  // Toggle filter visibility
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    // Simulate API call to fetch curriculum data
    const fetchCurriculumData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockCurriculum = [
          {
            id: 1,
            title: 'Programming in Python',
            department: 'CSE',
            year: '1',
            semester: 'Odd',
            faculty: 'Dr. Arun Kumar',
            lastUpdated: '2024-02-20',
            status: 'published',
            description: 'Introduction to programming concepts using Python language',
            objectives: [
              "Understand basic programming concepts",
              "Learn Python syntax and semantics",
              "Develop problem-solving skills"
            ],
            outcomes: [
              "Ability to write Python programs",
              "Capability to solve computational problems",
              "Foundation for advanced programming courses"
            ],
            units: [
              {
                title: "Introduction to Python",
                description: "Basics of Python programming",
                topics: ["Python History and Installation", "Python Syntax and Variables", "Basic Data Types"]
              }
            ],
            textbooks: ["Python Programming: An Introduction to Computer Science by John Zelle"],
            references: ["Think Python by Allen B. Downey"]
          },
          {
            id: 2,
            title: 'Data Structures and Algorithms',
            department: 'CSE',
            year: '2',
            semester: 'Even',
            faculty: 'Prof. Meena Rani',
            lastUpdated: '2024-01-15',
            status: 'published',
            description: 'Study of fundamental data structures and algorithms',
            objectives: ["Understand data structures", "Analyze algorithms"],
            outcomes: ["Implement various data structures", "Apply efficient algorithms"],
            units: [{title: "Arrays and Linked Lists", description: "Basic data structures", topics: ["Arrays", "Linked Lists"]}],
            textbooks: ["Introduction to Algorithms by CLRS"],
            references: ["Algorithms by Robert Sedgewick"]
          },
          {
            id: 3,
            title: 'Computer Networks',
            department: 'CSE',
            year: '3',
            semester: 'Odd',
            faculty: 'Dr. Sunil Reddy',
            lastUpdated: '2024-03-05',
            status: 'published',
            description: 'Study of computer networks and protocols',
            objectives: ["Understand network concepts", "Learn network protocols"],
            outcomes: ["Design network infrastructure", "Implement network protocols"],
            units: [{title: "Network Fundamentals", description: "Introduction to networking", topics: ["OSI Model", "TCP/IP"]}],
            textbooks: ["Computer Networks by Tanenbaum"],
            references: ["TCP/IP Protocol Suite by Forouzan"]
          },
          {
            id: 4,
            title: 'Database Management Systems',
            department: 'CSE',
            year: '2',
            semester: 'Odd',
            faculty: 'Prof. Ananya Singh',
            lastUpdated: '2024-01-10',
            status: 'published',
            description: 'Study of database concepts and SQL',
            objectives: ["Understand database design", "Learn SQL"],
            outcomes: ["Design databases", "Write complex SQL queries"],
            units: [{title: "Database Concepts", description: "Basic database design", topics: ["ER Model", "Normalization"]}],
            textbooks: ["Database System Concepts by Silberschatz"],
            references: ["Fundamentals of Database Systems by Elmasri"]
          },
          {
            id: 5,
            title: 'Digital Signal Processing',
            department: 'ECE',
            year: '3',
            semester: 'Even',
            faculty: 'Dr. Ravi Teja',
            lastUpdated: '2024-02-28',
            status: 'published',
            description: 'Study of digital signal processing techniques',
            objectives: ["Understand digital signals", "Learn signal processing algorithms"],
            outcomes: ["Implement signal processing systems", "Apply filtering techniques"],
            units: [{title: "Signals and Systems", description: "Introduction to signals", topics: ["Continuous Signals", "Discrete Signals"]}],
            textbooks: ["Digital Signal Processing by Proakis"],
            references: ["Discrete-Time Signal Processing by Oppenheim"]
          },
          {
            id: 6,
            title: 'Electromagnetic Theory',
            department: 'ECE',
            year: '2',
            semester: 'Odd',
            faculty: 'Prof. Shalini Verma',
            lastUpdated: '2024-02-10',
            status: 'published',
            description: 'Study of electromagnetic fields and waves',
            objectives: ["Understand Maxwell's equations", "Learn wave propagation"],
            outcomes: ["Analyze electromagnetic fields", "Design transmission lines"],
            units: [{title: "Electrostatics", description: "Static electric fields", topics: ["Coulomb's Law", "Electric Potential"]}],
            textbooks: ["Elements of Electromagnetics by Sadiku"],
            references: ["Engineering Electromagnetics by Hayt"]
          },
          {
            id: 7,
            title: 'Power Systems',
            department: 'EEE',
            year: '3',
            semester: 'Odd',
            faculty: 'Dr. Ramesh Iyer',
            lastUpdated: '2024-03-02',
            status: 'published',
            description: 'Study of electrical power systems',
            objectives: ["Understand power generation", "Learn power transmission"],
            outcomes: ["Design power systems", "Analyze power distribution"],
            units: [{title: "Power Generation", description: "Electric power sources", topics: ["Thermal Power", "Hydroelectric Power"]}],
            textbooks: ["Power System Engineering by Nagrath and Kothari"],
            references: ["Electric Power Systems by Weedy"]
          },
          {
            id: 8,
            title: 'Thermodynamics',
            department: 'MECH',
            year: '2',
            semester: 'Even',
            faculty: 'Prof. Suresh Kumar',
            lastUpdated: '2024-01-25',
            status: 'published',
            description: 'Study of thermal energy and work',
            objectives: ["Understand thermodynamic laws", "Learn energy transformation"],
            outcomes: ["Analyze thermal systems", "Design engines and refrigerators"],
            units: [{title: "Laws of Thermodynamics", description: "Fundamental laws", topics: ["First Law", "Second Law"]}],
            textbooks: ["Fundamentals of Thermodynamics by Sonntag"],
            references: ["Thermodynamics: An Engineering Approach by Cengel"]
          }
        ];
        
        setCurriculumList(mockCurriculum);
      } catch (error) {
        console.error('Error fetching curriculum data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCurriculumData();
  }, []);
  
  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      department: '',
      year: '',
      semester: ''
    });
    setSearchQuery('');
  };
  
  // Download single curriculum
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
  
  // Download entire list as PDF
  const handleDownloadList = () => {
    try {
      const filteredCurriculum = getFilteredAndSortedCurriculum();
      const success = downloadCurriculumListPDF(filteredCurriculum);
      
      if (success) {
        setToastVariant('success');
        setToastMessage(`Curriculum list with ${filteredCurriculum.length} items downloaded successfully!`);
      } else {
        setToastVariant('danger');
        setToastMessage('Failed to download curriculum list. Please try again.');
      }
      
      setShowToast(true);
    } catch (error) {
      console.error('Error downloading curriculum list:', error);
      setToastVariant('danger');
      setToastMessage('An error occurred while downloading. Please try again.');
      setShowToast(true);
    }
  };
  
  // Apply filters and sorting to the curriculum list
  const getFilteredAndSortedCurriculum = () => {
    let filtered = [...curriculumList];
    
    // Apply department filter
    if (filters.department) {
      filtered = filtered.filter(item => item.department === filters.department);
    }
    
    // Apply year filter
    if (filters.year) {
      filtered = filtered.filter(item => item.year === filters.year);
    }
    
    // Apply semester filter
    if (filters.semester) {
      filtered = filtered.filter(item => item.semester === filters.semester);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        item => 
          item.title.toLowerCase().includes(query) ||
          item.faculty.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    return filtered;
  };
  
  const filteredCurriculum = getFilteredAndSortedCurriculum();
  
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
        <h2>Curriculum List</h2>
        {filteredCurriculum.length > 0 && (
          <Button 
            variant="success" 
            onClick={handleDownloadList}
            className="d-flex align-items-center"
          >
            <FaFilePdf className="me-2" /> Download List as PDF
          </Button>
        )}
      </div>
      
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between mb-3">
            {/* Search */}
            <div className="d-flex flex-grow-1">
              <Form.Control
                type="text"
                placeholder="Search by course title or faculty name"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button variant="primary" className="ms-2">
                <FaSearch />
              </Button>
            </div>
            
            {/* Filter toggle */}
            <div>
              <Button 
                variant="outline-secondary" 
                onClick={() => setShowFilters(!showFilters)}
                className="d-flex align-items-center"
              >
                <FaFilter className="me-1" /> {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
          </div>
          
          {/* Filters */}
          {showFilters && (
            <div className="bg-light p-3 rounded mb-3">
              <Row className="g-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Department</Form.Label>
                    <Form.Select
                      name="department"
                      value={filters.department}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Departments</option>
                      <option value="CSE">Computer Science & Engineering</option>
                      <option value="ECE">Electronics & Communication</option>
                      <option value="EEE">Electrical & Electronics</option>
                      <option value="MECH">Mechanical Engineering</option>
                      <option value="CIVIL">Civil Engineering</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Year</Form.Label>
                    <Form.Select
                      name="year"
                      value={filters.year}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Years</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Semester</Form.Label>
                    <Form.Select
                      name="semester"
                      value={filters.semester}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Semesters</option>
                      <option value="Odd">Odd Semester</option>
                      <option value="Even">Even Semester</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              
              <div className="d-flex justify-content-end mt-3">
                <Button 
                  variant="outline-secondary" 
                  size="sm"
                  onClick={handleResetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          )}
          
          {/* Results */}
          <div className="mb-2">
            <small className="text-muted">
              Showing {filteredCurriculum.length} of {curriculumList.length} curriculum items
            </small>
          </div>
          
          {loading ? (
            <Loader message="Loading curriculum data..." />
          ) : (
            <>
              {filteredCurriculum.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th onClick={() => handleSort('title')} className="cursor-pointer">
                          Title <FaSort className="ms-1" />
                        </th>
                        <th onClick={() => handleSort('department')} className="cursor-pointer">
                          Department <FaSort className="ms-1" />
                        </th>
                        <th onClick={() => handleSort('year')} className="cursor-pointer">
                          Year <FaSort className="ms-1" />
                        </th>
                        <th onClick={() => handleSort('semester')} className="cursor-pointer">
                          Semester <FaSort className="ms-1" />
                        </th>
                        <th onClick={() => handleSort('faculty')} className="cursor-pointer">
                          Faculty <FaSort className="ms-1" />
                        </th>
                        <th onClick={() => handleSort('lastUpdated')} className="cursor-pointer">
                          Last Updated <FaSort className="ms-1" />
                        </th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCurriculum.map(item => (
                        <tr key={item.id}>
                          <td>{item.title}</td>
                          <td>
                            <Badge bg="info">{item.department}</Badge>
                          </td>
                          <td>{item.year}</td>
                          <td>{item.semester}</td>
                          <td>{item.faculty}</td>
                          <td>{item.lastUpdated}</td>
                          <td>
                            <Button
                              as={Link}
                              to={`/curriculum/view/${item.id}`}
                              variant="outline-primary"
                              size="sm"
                              className="me-2"
                              title="View Details"
                            >
                              <FaEye />
                            </Button>
                            <Button
                              variant="outline-success"
                              size="sm"
                              title="Download"
                              onClick={() => handleDownloadCurriculum(item)}
                            >
                              <FaDownload />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center p-4">
                  <p className="mb-0">No curriculum found matching your search criteria.</p>
                </div>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CurriculumList;