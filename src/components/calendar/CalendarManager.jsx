import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Form, Modal, Row, Col, Badge, Alert } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaLink, FaCalendarAlt } from 'react-icons/fa';
import { 
  getAllCalendarEvents, 
  addCalendarEvent, 
  updateCalendarEvent, 
  deleteCalendarEvent 
} from '../../services/calendarService';
import { formatDate } from '../../utils/helpers';

const CalendarManager = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    start: '',
    end: '',
    description: '',
    type: 'academic',
    links: []
  });
  
  // Current link being added
  const [currentLink, setCurrentLink] = useState({
    title: '',
    url: ''
  });
  
  // Event types
  const eventTypes = [
    { value: 'academic', label: 'Academic', color: 'primary' },
    { value: 'exam', label: 'Examination', color: 'danger' },
    { value: 'event', label: 'Event', color: 'success' },
    { value: 'holiday', label: 'Holiday', color: 'info' }
  ];
  
  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);
  
  // Fetch all calendar events
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getAllCalendarEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      setError('Failed to load calendar events. Please try again.');
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
  
  // Handle link input change
  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    setCurrentLink({
      ...currentLink,
      [name]: value
    });
  };
  
  // Add link to form data
  const handleAddLink = () => {
    if (currentLink.title.trim() && currentLink.url.trim()) {
      setFormData({
        ...formData,
        links: [...formData.links, { ...currentLink }]
      });
      
      // Reset current link
      setCurrentLink({
        title: '',
        url: ''
      });
    }
  };
  
  // Remove link from form data
  const handleRemoveLink = (index) => {
    const updatedLinks = [...formData.links];
    updatedLinks.splice(index, 1);
    
    setFormData({
      ...formData,
      links: updatedLinks
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditing) {
        // Update existing event
        await updateCalendarEvent(formData.id, formData);
        setSuccessMessage('Calendar event updated successfully!');
      } else {
        // Add new event
        await addCalendarEvent(formData);
        setSuccessMessage('Calendar event added successfully!');
      }
      
      // Refresh events and close modal
      fetchEvents();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving calendar event:', error);
      setError('Failed to save calendar event. Please try again.');
    }
  };
  
  // Handle event deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this calendar event?')) {
      try {
        await deleteCalendarEvent(id);
        setSuccessMessage('Calendar event deleted successfully!');
        fetchEvents();
      } catch (error) {
        console.error('Error deleting calendar event:', error);
        setError('Failed to delete calendar event. Please try again.');
      }
    }
  };
  
  // Handle event edit
  const handleEdit = (event) => {
    setFormData({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      description: event.description,
      type: event.type,
      links: event.links || []
    });
    
    setIsEditing(true);
    setShowModal(true);
  };
  
  // Open modal for adding a new event
  const handleAddNew = () => {
    const today = new Date().toISOString().split('T')[0];
    
    setFormData({
      id: null,
      title: '',
      start: today,
      end: today,
      description: '',
      type: 'academic',
      links: []
    });
    
    setIsEditing(false);
    setShowModal(true);
  };
  
  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentLink({
      title: '',
      url: ''
    });
  };
  
  // Dismiss success message
  const dismissSuccessMessage = () => {
    setSuccessMessage('');
  };
  
  // Dismiss error message
  const dismissErrorMessage = () => {
    setError(null);
  };
  
  // Get badge color for event type
  const getEventTypeBadge = (type) => {
    const eventType = eventTypes.find(t => t.value === type) || eventTypes[0];
    return <Badge bg={eventType.color}>{eventType.label}</Badge>;
  };
  
  return (
    <div>
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Manage Academic Calendar</h5>
          <Button 
            variant="light" 
            size="sm" 
            onClick={handleAddNew}
            className="d-flex align-items-center"
          >
            <FaPlus className="me-1" /> Add New Event
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
            <p className="text-center my-4">Loading calendar events...</p>
          ) : events.length === 0 ? (
            <p className="text-center my-4">No calendar events found. Add a new event to get started.</p>
          ) : (
            <div className="table-responsive">
              <Table hover>
                <thead>
                  <tr>
                    <th style={{ width: '30%' }}>Title</th>
                    <th style={{ width: '15%' }}>Start Date</th>
                    <th style={{ width: '15%' }}>End Date</th>
                    <th style={{ width: '15%' }}>Type</th>
                    <th style={{ width: '10%' }}>Links</th>
                    <th style={{ width: '15%' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(event => (
                    <tr key={event.id}>
                      <td>{event.title}</td>
                      <td>{formatDate(event.start)}</td>
                      <td>{formatDate(event.end)}</td>
                      <td>{getEventTypeBadge(event.type)}</td>
                      <td>
                        {event.links && event.links.length > 0 ? (
                          <Badge bg="info">{event.links.length} link(s)</Badge>
                        ) : (
                          <Badge bg="secondary">None</Badge>
                        )}
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(event)}
                          title="Edit"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(event.id)}
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
      
      {/* Add/Edit Calendar Event Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? 'Edit Calendar Event' : 'Add New Calendar Event'}
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
                placeholder="Enter event title"
              />
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Start Date <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="date"
                    name="start"
                    value={formData.start}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>End Date <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="date"
                    name="end"
                    value={formData.end}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Event Type</Form.Label>
                  <Form.Select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    {eventTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter event description"
              />
            </Form.Group>
            
            <hr />
            
            <h6>Links</h6>
            
            {/* Links List */}
            {formData.links.length > 0 && (
              <div className="mb-3">
                <Table size="sm" bordered>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>URL</th>
                      <th style={{ width: '10%' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.links.map((link, index) => (
                      <tr key={index}>
                        <td>{link.title}</td>
                        <td>
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.url}
                          </a>
                        </td>
                        <td>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleRemoveLink(index)}
                            title="Remove Link"
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
            
            {/* Add New Link */}
            <div className="mb-3">
              <Row className="align-items-end g-2">
                <Col>
                  <Form.Label>Link Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={currentLink.title}
                    onChange={handleLinkChange}
                    placeholder="Enter link title"
                  />
                </Col>
                <Col>
                  <Form.Label>URL</Form.Label>
                  <Form.Control
                    type="url"
                    name="url"
                    value={currentLink.url}
                    onChange={handleLinkChange}
                    placeholder="https://example.com"
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    variant="primary"
                    onClick={handleAddLink}
                    className="d-flex align-items-center"
                    disabled={!currentLink.title || !currentLink.url}
                  >
                    <FaLink className="me-1" /> Add
                  </Button>
                </Col>
              </Row>
            </div>
          </Modal.Body>
          
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Update' : 'Save'} Event
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default CalendarManager;