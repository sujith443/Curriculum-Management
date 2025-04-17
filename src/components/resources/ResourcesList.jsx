import React, { useState, useEffect, useContext } from 'react';
import { Card, Alert, Button, Form, InputGroup, Row, Col, Badge } from 'react-bootstrap';
import { FaLink, FaSearch, FaExternalLinkAlt } from 'react-icons/fa';
import { getResourcesByRole, searchResources } from '../../services/resourcesService';
import { AuthContext } from '../../contexts/AuthContext';

const ResourcesList = () => {
  const { user } = useContext(AuthContext);
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Resource categories
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'academic', label: 'Academic Resources', color: 'primary' },
    { value: 'official', label: 'Official Portals', color: 'success' },
    { value: 'placement', label: 'Placement Resources', color: 'info' },
    { value: 'library', label: 'Library Resources', color: 'warning' },
    { value: 'other', label: 'Other Resources', color: 'secondary' }
  ];
  
  useEffect(() => {
    fetchResources();
  }, [user]);
  
  const fetchResources = async () => {
    if (!user || !user.role) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getResourcesByRole(user.role);
      setResources(data);
      setFilteredResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
      setError('Failed to load resources. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterResources(e.target.value, selectedCategory);
  };
  
  // Handle category filter change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterResources(searchQuery, category);
  };
  
  // Filter resources based on search query and/or category
  const filterResources = (query, category) => {
    let filtered = [...resources];
    
    // Apply search filter
    if (query.trim()) {
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(query.toLowerCase()) ||
        resource.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Apply category filter
    if (category !== 'all') {
      filtered = filtered.filter(resource => resource.category === category);
    }
    
    setFilteredResources(filtered);
  };
  
  // Search resources through API
  const handleSearch = async () => {
    if (!searchQuery.trim() || !user || !user.role) return;
    
    setLoading(true);
    
    try {
      const results = await searchResources(searchQuery, user.role);
      
      // Apply category filter to search results if needed
      let filtered = results;
      if (selectedCategory !== 'all') {
        filtered = results.filter(resource => resource.category === selectedCategory);
      }
      
      setFilteredResources(filtered);
    } catch (error) {
      console.error('Error searching resources:', error);
      setError('Failed to search resources. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Get badge for category
  const getCategoryBadge = (category) => {
    const cat = categories.find(c => c.value === category) || categories[5]; // Default to 'other'
    return <Badge bg={cat.color}>{cat.label}</Badge>;
  };
  
  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setFilteredResources(resources);
  };
  
  if (loading && resources.length === 0) {
    return (
      <Card className="shadow-sm mb-4">
        <Card.Body className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading resources...</p>
        </Card.Body>
      </Card>
    );
  }
  
  if (error && resources.length === 0) {
    return (
      <Alert variant="danger">
        {error}
        <Button 
          variant="outline-danger" 
          size="sm" 
          className="ms-3"
          onClick={fetchResources}
        >
          Try Again
        </Button>
      </Alert>
    );
  }
  
  return (
    <div>
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0 d-flex align-items-center">
            <FaLink className="me-2" /> Important Links & Resources
          </h5>
        </Card.Header>
        <Card.Body>
          {/* Search and Filters */}
          <div className="mb-4">
            <Row className="g-3">
              <Col md={6}>
                <InputGroup>
                  <Form.Control
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button 
                    variant="primary" 
                    onClick={handleSearch}
                  >
                    <FaSearch />
                  </Button>
                </InputGroup>
              </Col>
              <Col md={4}>
                <Form.Select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={2}>
                <Button 
                  variant="outline-secondary" 
                  className="w-100"
                  onClick={resetFilters}
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </div>
          
          {/* Resources List */}
          {filteredResources.length === 0 ? (
            <Alert variant="info">
              No resources found. Try adjusting your search or filters.
            </Alert>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {filteredResources.map(resource => (
                <Col key={resource.id}>
                  <Card className="h-100 position-relative resource-card">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                      <h6 className="mb-0 text-truncate" title={resource.title}>
                        {resource.title}
                      </h6>
                      {getCategoryBadge(resource.category)}
                    </Card.Header>
                    <Card.Body className="d-flex flex-column">
                      <Card.Text className="flex-grow-1">
                        {resource.description}
                      </Card.Text>
                      <div className="mt-auto">
                        <a 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                        >
                          <FaExternalLinkAlt className="me-2" /> Open Link
                        </a>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ResourcesList;