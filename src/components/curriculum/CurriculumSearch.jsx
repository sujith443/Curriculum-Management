import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaBookOpen, FaFilter } from 'react-icons/fa';
import Loader from '../common/Loader';

const CurriculumSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  
  const [advancedFilters, setAdvancedFilters] = useState({
    department: '',
    year: '',
    semester: '',
    faculty: '',
    keyword: ''
  });
  
  // Handle basic search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle advanced filter changes
  const handleAdvancedFilterChange = (e) => {
    const { name, value } = e.target;
    setAdvancedFilters({
      ...advancedFilters,
      [name]: value
    });
  };
  
  // Perform basic search
  const handleBasicSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setSearched(true);
    
    // Simulate API call for search
    setTimeout(() => {
      performSearch(searchQuery);
      setLoading(false);
    }, 1000);
  };
  
  // Perform advanced search
  const handleAdvancedSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    
    // Simulate API call for advanced search
    setTimeout(() => {
      performAdvancedSearch(advancedFilters);
      setLoading(false);
    }, 1000);
  };
  
  // Mock search function
  const performSearch = (query) => {
    // Mock data for search results
    const mockData = [
      {
        id: 1,
        title: "Data Structures and Algorithms",
        department: "CSE",
        year: "2",
        semester: "Odd",
        faculty: "Prof. Meena Rani",
        description: "This course introduces fundamental data structures and algorithms that form the building blocks for efficient problem-solving in computer science."
      },
      {
        id: 3,
        title: "Computer Networks",
        department: "CSE",
        year: "3",
        semester: "Odd",
        faculty: "Dr. Sunil Reddy",
        description: "This course covers the principles and practice of computer networking, focusing on the Internet protocol suite and network applications."
      },
      {
        id: 5,
        title: "Database Management Systems",
        department: "CSE",
        year: "2",
        semester: "Even",
        faculty: "Dr. Ananya Singh",
        description: "This course introduces the fundamental concepts of database management systems, including data models, database design, and query languages."
      }
    ];
    
    // Filter based on search query
    const results = mockData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.faculty.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(results);
  };
  
  // Mock advanced search function
  const performAdvancedSearch = (filters) => {
    // Mock data for search results
    const mockData = [
      {
        id: 1,
        title: "Data Structures and Algorithms",
        department: "CSE",
        year: "2",
        semester: "Odd",
        faculty: "Prof. Meena Rani",
        description: "This course introduces fundamental data structures and algorithms that form the building blocks for efficient problem-solving in computer science."
      },
      {
        id: 2,
        title: "Object-Oriented Programming",
        department: "CSE",
        year: "1",
        semester: "Even",
        faculty: "Dr. Ramesh Kumar",
        description: "This course covers object-oriented programming concepts using Java, including classes, inheritance, polymorphism, and encapsulation."
      },
      {
        id: 3,
        title: "Computer Networks",
        department: "CSE",
        year: "3",
        semester: "Odd",
        faculty: "Dr. Sunil Reddy",
        description: "This course covers the principles and practice of computer networking, focusing on the Internet protocol suite and network applications."
      },
      {
        id: 4,
        title: "Digital Electronics",
        department: "ECE",
        year: "2",
        semester: "Odd",
        faculty: "Prof. Ravi Teja",
        description: "This course introduces the theory and practice of digital electronics, including combinational and sequential logic design."
      },
      {
        id: 5,
        title: "Database Management Systems",
        department: "CSE",
        year: "2",
        semester: "Even",
        faculty: "Dr. Ananya Singh",
        description: "This course introduces the fundamental concepts of database management systems, including data models, database design, and query languages."
      }
    ];
    
    // Apply filters
    let results = [...mockData];
    
    if (filters.department) {
      results = results.filter(item => item.department === filters.department);
    }
    
    if (filters.year) {
      results = results.filter(item => item.year === filters.year);
    }
    
    if (filters.semester) {
      results = results.filter(item => item.semester === filters.semester);
    }
    
    if (filters.faculty) {
      results = results.filter(item => 
        item.faculty.toLowerCase().includes(filters.faculty.toLowerCase())
      );
    }
    
    if (filters.keyword) {
      results = results.filter(item => 
        item.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        item.description.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }
    
    setSearchResults(results);
  };
  
  // Reset search
  const handleResetSearch = () => {
    setSearchQuery('');
    setAdvancedFilters({
      department: '',
      year: '',
      semester: '',
      faculty: '',
      keyword: ''
    });
    setSearchResults([]);
    setSearched(false);
  };
  
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Search Curriculum</h2>
      </div>
      
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">
                {advancedSearch ? 'Advanced Search' : 'Quick Search'}
              </h5>
              <Button
                variant="link"
                onClick={() => setAdvancedSearch(!advancedSearch)}
              >
                {advancedSearch ? 'Switch to Basic Search' : 'Advanced Search Options'}
              </Button>
            </div>
            
            {!advancedSearch ? (
              <Form onSubmit={handleBasicSearch}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search by course title, description, or faculty name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <Button type="submit" variant="primary">
                    <FaSearch className="me-1" /> Search
                  </Button>
                </InputGroup>
              </Form>
            ) : (
              <Form onSubmit={handleAdvancedSearch}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Keywords</Form.Label>
                      <Form.Control
                        type="text"
                        name="keyword"
                        value={advancedFilters.keyword}
                        onChange={handleAdvancedFilterChange}
                        placeholder="Search in course title and description"
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Faculty Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="faculty"
                        value={advancedFilters.faculty}
                        onChange={handleAdvancedFilterChange}
                        placeholder="Enter faculty name"
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Department</Form.Label>
                      <Form.Select
                        name="department"
                        value={advancedFilters.department}
                        onChange={handleAdvancedFilterChange}
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
                        value={advancedFilters.year}
                        onChange={handleAdvancedFilterChange}
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
                        value={advancedFilters.semester}
                        onChange={handleAdvancedFilterChange}
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
                    className="me-2"
                    onClick={handleResetSearch}
                  >
                    Reset
                  </Button>
                  <Button type="submit" variant="primary">
                    <FaFilter className="me-1" /> Apply Filters
                  </Button>
                </div>
              </Form>
            )}
          </div>
          
          {/* Search Results */}
          <div>
            {loading ? (
              <Loader message="Searching curriculum..." />
            ) : (
              <>
                {searched && (
                  <div className="mb-3">
                    <h5>
                      Search Results {searchResults.length > 0 ? `(${searchResults.length})` : ''}
                    </h5>
                    {searchResults.length === 0 && (
                      <p className="text-muted">No matching curriculum found. Try different search terms.</p>
                    )}
                  </div>
                )}
                
                {searchResults.length > 0 && (
                  <div className="mt-3">
                    {searchResults.map(result => (
                      <Card key={result.id} className="mb-3">
                        <Card.Body>
                          <Row>
                            <Col md={9}>
                              <h5>{result.title}</h5>
                              <p className="text-muted mb-2">
                                <strong>Department:</strong> {result.department} | 
                                <strong> Year:</strong> {result.year} | 
                                <strong> Semester:</strong> {result.semester} | 
                                <strong> Faculty:</strong> {result.faculty}
                              </p>
                              <p className="mb-0">{result.description}</p>
                            </Col>
                            <Col md={3} className="d-flex align-items-center justify-content-end">
                              <Button
                                as={Link}
                                to={`/curriculum/view/${result.id}`}
                                variant="primary"
                              >
                                <FaBookOpen className="me-1" /> View Curriculum
                              </Button>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default CurriculumSearch;
