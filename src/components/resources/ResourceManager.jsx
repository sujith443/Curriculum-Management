import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Form, Modal, Row, Col, Badge, Alert } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaLink, FaEye, FaEyeSlash } from 'react-icons/fa';
import { 
  getAllResources, 
  addResource, 
  updateResource, 
  deleteResource 
} from '../../services/resourcesService';

const ResourceManager = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    url: '',
    description: '',
    category: 'academic',
    addedBy: 'Admin User',
    visibility: ['student', 'faculty', 'admin']
  });
  
  // Resource categories
  const categories = [
    { value: 'academic', label: 'Academic Resources', color: 'primary' },
    { value: 'official', label: 'Official Portals', color: 'success' },
    { value: 'placement', label: 'Placement Resources', color: 'info' },
    { value: 'library', label: 'Library Resources', color: 'warning' },
    { value: 'other', label: 'Other Resources', color: 'secondary' }
  ];
  
  // User roles
  const roles = [
    { value: 'student', label: 'Students' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'admin', label: 'Administrators' }
  ];
  
  // Fetch resources on component mount
  useEffect(() => {
    fetchResources();
  }, []);
  
  // Fetch all resources
  const fetchResources = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getAllResources();
      setResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
      setError('Failed to load resources. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle visibility checkbox change
  const handleVisibilityChange = (role) => {
    const currentVisibility = [...formData.visibility];
    
    if (currentVisibility.includes(role)) {
      // Remove role if already included
      setFormData({
        ...formData,
        visibility: currentVisibility.filter(r => r !== role)
      });
    } else {
      // Add role if not included
      setFormData({
        ...formData,
        visibility: [...currentVisibility, role]
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditing) {
        // Update existing resource
        await updateResource(formData.id, formData);
        setSuccessMessage('Resource updated successfully!');
      } else {
        // Add new resource
        await addResource(formData);
        setSuccessMessage('Resource added successfully!');
      }
      
      // Refresh resources and close modal
      fetchResources();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving resource:', error);
      setError('Failed to save resource. Please try again.');
    }
  };
  
  // Handle resource deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await deleteResource(id);
        setSuccessMessage('Resource deleted successfully!');
        fetchResources();
      } catch (error) {
        console.error('Error deleting resource:', error);
        setError('Failed to delete resource. Please try again.');
      }
    }
  };
  
  // Handle resource edit
  const handleEdit = (resource) => {
    setFormData({
      id: resource.id,
      title: resource.title,
      url: resource.url,
      description: resource.description,
      category: resource.category,
      addedBy: resource.addedBy,
      visibility: resource.visibility || ['student', 'faculty', 'admin']
    });
    
    setIsEditing(true);
    setShowModal(true);
  };
  
  // Open modal for adding a new resource
  const handleAddNew = () => {
    setFormData({
      id: null,
      title: '',
      url: '',
      description: '',
      category: 'academic',
      addedBy: 'Admin User',
      visibility: ['student', 'faculty', 'admin']
    });
    
    setIsEditing(false);
    setShowModal(true);
  };
  
  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  // Dismiss success message
  const dismissSuccessMessage = () => {
    setSuccessMessage('');
  };
  
  // Dismiss error message
  const dismissErrorMessage = () => {
    setError(null);
  };
  
  // Get badge color for category
  const getCategoryBadge = (category) => {
    const cat = categories.find(c => c.value === category) || categories[4]; // Default to 'other'
    return <Badge bg={cat.color}>{cat.label}</Badge>;
  };
  
  // Render visibility badges
  const renderVisibilityBadges = (visibility) => {
    return (
      <div className="d-flex flex-wrap gap-1">
        {roles.map(role => (
          <Badge 
            key={role.value} 
            bg={visibility.includes(role.value) ? 'success' : 'secondary'}
            className="opacity-75"
          >
            {role.label}
          </Badge>
        ))}
      </div>
    );
  };
  
  return (
    <div>
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Manage Resources & Links</h5>
          <Button 
            variant="light" 
            size="sm" 
            onClick={handleAddNew}
            className="d-flex align-items-center"
          >
            <FaPlus className="me-1" /> Add New Resource
          </Button>
        </Card.Header>
        
        <Card.Body>
          {successMessage && (
            <Alert 
              variant="success" 
              dismissible 
              onClose={dismissSuccessMessage}
              className="mb-3"
            >
              {successMessage}
            </Alert>
          )}
          
          {error && (
            <Alert 
              variant="danger" 
              dismissible 
              onClose={dismissErrorMessage}
              className="mb-3"
            >
              {error}
            </Alert>
          )}
          
          {loading ? (
            <p className="text-center my-4">Loading resources...</p>
          ) : resources.length === 0 ? (
            <p className="text-center my-4">No resources found. Add a new resource to get started.</p>
          ) : (
            <div className="table-responsive">
              <Table hover>
                <thead>
                  <tr>
                    <th style={{ width: '25%' }}>Title</th>
                    <th style={{ width: '25%' }}>URL</th>
                    <th style={{ width: '15%' }}>Category</th>
                    <th style={{ width: '20%' }}>Visible To</th>
                    <th style={{ width: '15%' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {resources.map(resource => (
                    <tr key={resource.id}>
                      <td>{resource.title}</td>
                      <td>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          {resource.url.length > 30 ? resource.url.substring(0, 30) + '...' : resource.url}
                        </a>
                      </td>
                      <td>{getCategoryBadge(resource.category)}</td>
                      <td>{renderVisibilityBadges(resource.visibility)}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(resource)}
                          title="Edit"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(resource.id)}
                          title="Delete"
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
      
      {/* Add/Edit Resource Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? 'Edit Resource' : 'Add New Resource'}
          </Modal.Title>
        </Modal.Header>
        
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter resource title"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>URL <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                required
                placeholder="https://example.com"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter resource description"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Visible To</Form.Label>
              <div className="ms-2">
                {roles.map(role => (
                  <Form.Check
                    key={role.value}
                    type="checkbox"
                    id={`visibility-${role.value}`}
                    label={role.label}
                    checked={formData.visibility.includes(role.value)}
                    onChange={() => handleVisibilityChange(role.value)}
                    className="mb-2"
                  />
                ))}
              </div>
            </Form.Group>
          </Modal.Body>
          
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Update' : 'Save'} Resource
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ResourceManager;