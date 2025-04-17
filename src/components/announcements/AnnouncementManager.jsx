import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Table, Form, Modal, Row, Col, Badge, Alert, InputGroup, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaLink, 
  FaStar, 
  FaRegStar, 
  FaEye, 
  FaFilter, 
  FaSort, 
  FaCalendarAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSearch,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaClock,
  FaBullhorn
} from 'react-icons/fa';
import { 
  getAllAnnouncements, 
  addAnnouncement, 
  updateAnnouncement, 
  deleteAnnouncement 
} from '../../services/announcementService';
import { formatDate } from '../../utils/helpers';
import { AuthContext } from '../../contexts/AuthContext';

const AnnouncementManager = () => {
  const { user } = useContext(AuthContext);
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'desc'
  });
  const [filterImportant, setFilterImportant] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    important: false,
    author: user?.name || 'Admin User',
    links: []
  });
  
  // Current announcement being viewed
  const [viewingAnnouncement, setViewingAnnouncement] = useState(null);
  
  // Current link being added
  const [currentLink, setCurrentLink] = useState({
    title: '',
    url: ''
  });
  
  // Fetch announcements on component mount
  useEffect(() => {
    fetchAnnouncements();
  }, []);
  
  // Fetch all announcements
  const fetchAnnouncements = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getAllAnnouncements();
      setAnnouncements(data);
      setFilteredAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setError('Failed to load announcements. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...announcements];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        announcement => 
          announcement.title.toLowerCase().includes(query) ||
          announcement.content.toLowerCase().includes(query) ||
          announcement.author.toLowerCase().includes(query)
      );
    }
    
    // Apply importance filter
    if (filterImportant) {
      result = result.filter(announcement => announcement.important);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortConfig.key === 'date') {
        // Date sorting (special case)
        const dateA = new Date(a[sortConfig.key]);
        const dateB = new Date(b[sortConfig.key]);
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        // Default string/boolean sorting
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      }
    });
    
    setFilteredAnnouncements(result);
  }, [announcements, searchQuery, filterImportant, sortConfig]);
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
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
        // Update existing announcement
        await updateAnnouncement(formData.id, formData);
        setSuccessMessage('Announcement updated successfully!');
      } else {
        // Add new announcement
        await addAnnouncement(formData);
        setSuccessMessage('Announcement added successfully!');
      }
      
      // Refresh announcements and close modal
      fetchAnnouncements();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving announcement:', error);
      setError('Failed to save announcement. Please try again.');
    }
  };
  
  // Set up delete confirmation
  const confirmDeleteAnnouncement = (id) => {
    setConfirmDelete(id);
  };
  
  // Cancel delete confirmation
  const cancelDelete = () => {
    setConfirmDelete(null);
  };
  
  // Handle announcement deletion
  const handleDelete = async (id) => {
    try {
      await deleteAnnouncement(id);
      setSuccessMessage('Announcement deleted successfully!');
      fetchAnnouncements();
      setConfirmDelete(null);
    } catch (error) {
      console.error('Error deleting announcement:', error);
      setError('Failed to delete announcement. Please try again.');
    }
  };
  
  // Handle announcement edit
  const handleEdit = (announcement) => {
    setFormData({
      id: announcement.id,
      title: announcement.title,
      content: announcement.content,
      date: announcement.date,
      important: announcement.important,
      author: announcement.author,
      links: announcement.links || []
    });
    
    setIsEditing(true);
    setShowModal(true);
  };
  
  // Handle viewing an announcement
  const handleViewAnnouncement = (announcement) => {
    setViewingAnnouncement(announcement);
    setShowViewModal(true);
  };
  
  // Toggle announcement importance
  const handleToggleImportance = async (announcement) => {
    try {
      const updatedAnnouncement = {
        ...announcement,
        important: !announcement.important
      };
      
      await updateAnnouncement(announcement.id, updatedAnnouncement);
      fetchAnnouncements();
    } catch (error) {
      console.error('Error updating announcement importance:', error);
      setError('Failed to update announcement. Please try again.');
    }
  };
  
  // Open modal for adding a new announcement
  const handleAddNew = () => {
    setFormData({
      id: null,
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      important: false,
      author: user?.name || 'Admin User',
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
  
  // Close view modal
  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewingAnnouncement(null);
  };
  
  // Dismiss success message
  const dismissSuccessMessage = () => {
    setSuccessMessage('');
  };
  
  // Dismiss error message
  const dismissErrorMessage = () => {
    setError(null);
  };
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle sort change
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // Toggle important filter
  const toggleImportantFilter = () => {
    setFilterImportant(!filterImportant);
  };
  
  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setFilterImportant(false);
    setSortConfig({
      key: 'date',
      direction: 'desc'
    });
  };
  
  // Get badge for the number of links
  const getLinksBadge = (linksCount) => {
    if (linksCount === 0) return <Badge bg="secondary">No links</Badge>;
    return <Badge bg="info">{linksCount} link{linksCount > 1 ? 's' : ''}</Badge>;
  };
  
  return (
    <div>
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0 d-flex align-items-center">
            <FaBullhorn className="me-2" /> Manage Announcements
          </h5>
          <Button 
            variant="light" 
            size="sm" 
            onClick={handleAddNew}
            className="d-flex align-items-center"
          >
            <FaPlus className="me-1" /> Add New
          </Button>
        </Card.Header>
        
        <Card.Body>
          {successMessage && (
            <Alert 
              variant="success" 
              dismissible 
              onClose={dismissSuccessMessage}
              className="mb-3 d-flex align-items-center"
            >
              <FaCheckCircle className="me-2" /> {successMessage}
            </Alert>
          )}
          
          {error && (
            <Alert 
              variant="danger" 
              dismissible 
              onClose={dismissErrorMessage}
              className="mb-3 d-flex align-items-center"
            >
              <FaExclamationTriangle className="me-2" /> {error}
            </Alert>
          )}
          
          {/* Search and Filters */}
          <div className="mb-3">
            <Row className="g-2 align-items-center">
              <Col md={6}>
                <InputGroup>
                  <Form.Control
                    placeholder="Search announcements..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <Button variant="primary">
                    <FaSearch />
                  </Button>
                </InputGroup>
              </Col>
              <Col md={3}>
                <Button 
                  variant={filterImportant ? "warning" : "outline-warning"}
                  className="d-flex align-items-center w-100"
                  onClick={toggleImportantFilter}
                >
                  <FaStar className="me-2" /> {filterImportant ? "Important Only" : "Show All"}
                </Button>
              </Col>
              <Col md={3}>
                <Button 
                  variant="outline-secondary" 
                  className="d-flex align-items-center w-100"
                  onClick={resetFilters}
                >
                  <FaFilter className="me-2" /> Reset Filters
                </Button>
              </Col>
            </Row>
          </div>
          
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading announcements...</p>
            </div>
          ) : filteredAnnouncements.length === 0 ? (
            <div className="text-center py-4">
              <FaInfoCircle size={40} className="text-secondary mb-3" />
              <p className="mb-0">No announcements found. {searchQuery || filterImportant ? 'Try adjusting your filters.' : 'Add a new announcement to get started.'}</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover className="align-middle">
                <thead>
                  <tr>
                    <th style={{ width: '5%' }} className="text-center">
                      <FaStar className="text-warning" title="Important" />
                    </th>
                    <th 
                      style={{ width: '30%' }} 
                      className="cursor-pointer"
                      onClick={() => handleSort('title')}
                    >
                      Title <FaSort className="ms-1" />
                    </th>
                    <th 
                      style={{ width: '15%' }} 
                      className="cursor-pointer"
                      onClick={() => handleSort('date')}
                    >
                      Date <FaSort className="ms-1" />
                    </th>
                    <th 
                      style={{ width: '15%' }} 
                      className="cursor-pointer"
                      onClick={() => handleSort('author')}
                    >
                      Author <FaSort className="ms-1" />
                    </th>
                    <th style={{ width: '10%' }}>Links</th>
                    <th style={{ width: '25%' }} className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAnnouncements.map(announcement => (
                    <tr key={announcement.id} className={announcement.important ? 'table-warning bg-opacity-25' : ''}>
                      <td className="text-center">
                        <Button 
                          variant="link" 
                          className="p-0" 
                          onClick={() => handleToggleImportance(announcement)}
                          title={announcement.important ? "Unmark as important" : "Mark as important"}
                        >
                          {announcement.important ? (
                            <FaStar className="text-warning" size={18} />
                          ) : (
                            <FaRegStar size={18} />
                          )}
                        </Button>
                      </td>
                      <td className="text-truncate" style={{ maxWidth: '300px' }}>
                        {announcement.title}
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <FaCalendarAlt className="text-secondary me-2" size={14} />
                          {formatDate(announcement.date)}
                        </div>
                      </td>
                      <td>{announcement.author}</td>
                      <td>
                        {getLinksBadge(announcement.links ? announcement.links.length : 0)}
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() => handleViewAnnouncement(announcement)}
                            title="View Details"
                          >
                            <FaEye />
                          </Button>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleEdit(announcement)}
                            title="Edit"
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => confirmDeleteAnnouncement(announcement.id)}
                            title="Delete"
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
      
      {/* Add/Edit Announcement Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton className={isEditing ? "bg-primary bg-opacity-10" : ""}>
          <Modal.Title>
            {isEditing ? (
              <span className="d-flex align-items-center">
                <FaEdit className="me-2" /> Edit Announcement
              </span>
            ) : (
              <span className="d-flex align-items-center">
                <FaPlus className="me-2" /> Add New Announcement
              </span>
            )}
          </Modal.Title>
        </Modal.Header>
        
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Title <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter announcement title"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Content <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    placeholder="Enter announcement content"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Enter author name"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-4">
              <Form.Check
                type="checkbox"
                label="Mark as Important"
                name="important"
                checked={formData.important}
                onChange={handleChange}
                id="important-checkbox"
                className="d-flex align-items-center gap-2"
              />
              <Form.Text className="text-muted ms-4">
                Important announcements will be highlighted and displayed at the top.
              </Form.Text>
            </Form.Group>
            
            <hr />
            
            <h6 className="d-flex align-items-center">
              <FaLink className="me-2" /> Attached Links
            </h6>
            
            {/* Links List */}
            {formData.links.length > 0 && (
              <div className="mb-3">
                <Table size="sm" bordered hover>
                  <thead>
                    <tr>
                      <th style={{ width: '35%' }}>Title</th>
                      <th style={{ width: '55%' }}>URL</th>
                      <th style={{ width: '10%' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.links.map((link, index) => (
                      <tr key={index}>
                        <td>{link.title}</td>
                        <td>
                          <a href={link.url} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center">
                            {link.url.length > 30 ? link.url.substring(0, 30) + '...' : link.url}
                            <FaExternalLinkAlt className="ms-1" size={12} />
                          </a>
                        </td>
                        <td className="text-center">
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
            <Row className="align-items-end g-2 mb-3">
              <Col md={5}>
                <Form.Label>Link Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={currentLink.title}
                  onChange={handleLinkChange}
                  placeholder="Enter link title"
                />
              </Col>
              <Col md={5}>
                <Form.Label>URL</Form.Label>
                <Form.Control
                  type="url"
                  name="url"
                  value={currentLink.url}
                  onChange={handleLinkChange}
                  placeholder="https://example.com"
                />
              </Col>
              <Col md={2}>
                <Button
                  variant="primary"
                  onClick={handleAddLink}
                  className="d-flex align-items-center justify-content-center w-100"
                  disabled={!currentLink.title || !currentLink.url}
                >
                  <FaLink className="me-1" /> Add
                </Button>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Update' : 'Save'} Announcement
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      
      {/* View Announcement Modal */}
      <Modal show={showViewModal} onHide={handleCloseViewModal} size="lg">
        <Modal.Header closeButton className={viewingAnnouncement?.important ? "bg-warning bg-opacity-10" : ""}>
          <Modal.Title className="d-flex align-items-center">
            {viewingAnnouncement?.important && <FaStar className="text-warning me-2" />}
            {viewingAnnouncement?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewingAnnouncement && (
            <>
              <Row className="mb-3">
                <Col xs={12}>
                  <div className="d-flex justify-content-between text-muted mb-3">
                    <div className="d-flex align-items-center">
                      <FaCalendarAlt className="me-2" />
                      <span>{formatDate(viewingAnnouncement.date)}</span>
                    </div>
                    <div>
                      <span>Posted by: {viewingAnnouncement.author}</span>
                    </div>
                  </div>
                  <div className="announcement-content p-3 border rounded bg-light">
                    <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>{viewingAnnouncement.content}</p>
                  </div>
                </Col>
              </Row>
              
              {viewingAnnouncement.links && viewingAnnouncement.links.length > 0 && (
                <>
                  <hr />
                  <h6 className="d-flex align-items-center">
                    <FaLink className="me-2" /> Related Links
                  </h6>
                  <Row>
                    <Col>
                      <ListGroup>
                        {viewingAnnouncement.links.map((link, index) => (
                          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                            <span>{link.title}</span>
                            <a 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-primary d-flex align-items-center"
                            >
                              <FaExternalLinkAlt className="me-1" size={12} />
                              Open Link
                            </a>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Col>
                  </Row>
                </>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Close
          </Button>
          {viewingAnnouncement && (
            <Button 
              variant="primary" 
              onClick={() => {
                handleCloseViewModal();
                handleEdit(viewingAnnouncement);
              }}
            >
              <FaEdit className="me-1" /> Edit
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal show={confirmDelete !== null} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center">
            <FaExclamationTriangle className="text-danger me-3" size={24} />
            <p className="mb-0">Are you sure you want to delete this announcement? This action cannot be undone.</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(confirmDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AnnouncementManager;