import React, { useState, useContext } from 'react';
import { Card, Form, Button, Alert, Row, Col, Accordion } from 'react-bootstrap';
import { FaUpload, FaPlus, FaTrash, FaCheck } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';

const CurriculumUpload = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    department: user?.department || '',
    year: '1',
    semester: 'Odd',
    description: '',
    objectives: [''],
    outcomes: [''],
    units: [
      {
        title: '',
        description: '',
        topics: ['']
      }
    ],
    textbooks: [''],
    references: [''],
    file: null
  });
  
  const [previewUrl, setPreviewUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file });
      
      // Create a preview URL for the file
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };
  
  // Handle array field changes (objectives, outcomes, textbooks, references)
  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({ ...formData, [field]: updatedArray });
  };
  
  // Add a new item to an array field
  const handleAddItem = (field) => {
    const updatedArray = [...formData[field], ''];
    setFormData({ ...formData, [field]: updatedArray });
  };
  
  // Remove an item from an array field
  const handleRemoveItem = (field, index) => {
    const updatedArray = [...formData[field]];
    updatedArray.splice(index, 1);
    setFormData({ ...formData, [field]: updatedArray });
  };
  
  // Handle unit changes
  const handleUnitChange = (index, field, value) => {
    const updatedUnits = [...formData.units];
    updatedUnits[index] = { ...updatedUnits[index], [field]: value };
    setFormData({ ...formData, units: updatedUnits });
  };
  
  // Handle unit topic changes
  const handleTopicChange = (unitIndex, topicIndex, value) => {
    const updatedUnits = [...formData.units];
    const updatedTopics = [...updatedUnits[unitIndex].topics];
    updatedTopics[topicIndex] = value;
    updatedUnits[unitIndex].topics = updatedTopics;
    setFormData({ ...formData, units: updatedUnits });
  };
  
  // Add a new topic to a unit
  const handleAddTopic = (unitIndex) => {
    const updatedUnits = [...formData.units];
    updatedUnits[unitIndex].topics.push('');
    setFormData({ ...formData, units: updatedUnits });
  };
  
  // Remove a topic from a unit
  const handleRemoveTopic = (unitIndex, topicIndex) => {
    const updatedUnits = [...formData.units];
    updatedUnits[unitIndex].topics.splice(topicIndex, 1);
    setFormData({ ...formData, units: updatedUnits });
  };
  
  // Add a new unit
  const handleAddUnit = () => {
    const newUnit = {
      title: '',
      description: '',
      topics: ['']
    };
    setFormData({ ...formData, units: [...formData.units, newUnit] });
  };
  
  // Remove a unit
  const handleRemoveUnit = (index) => {
    const updatedUnits = [...formData.units];
    updatedUnits.splice(index, 1);
    setFormData({ ...formData, units: updatedUnits });
  };
  
  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);
    
    try {
      // Validate required fields
      if (!formData.title || !formData.department || !formData.year || !formData.semester) {
        throw new Error('Please fill in all required fields');
      }
      
      // In a real app, you would upload the file and form data to your backend
      // For demo purposes, we'll simulate a successful upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess('Curriculum has been successfully uploaded!');
      
      // Reset form
      setFormData({
        title: '',
        department: user?.department || '',
        year: '1',
        semester: 'Odd',
        description: '',
        objectives: [''],
        outcomes: [''],
        units: [
          {
            title: '',
            description: '',
            topics: ['']
          }
        ],
        textbooks: [''],
        references: [''],
        file: null
      });
      setPreviewUrl(null);
      
    } catch (err) {
      setError(err.message || 'Failed to upload curriculum. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  // Save as draft
  const handleSaveAsDraft = async () => {
    setError('');
    setSuccess('');
    setSubmitting(true);
    
    try {
      // Simulate saving draft
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Draft has been saved successfully!');
    } catch (err) {
      setError('Failed to save draft. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Upload Curriculum</h2>
      </div>
      
      <Card className="shadow-sm">
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={8}>
                {/* Basic Information */}
                <h4 className="mb-3">Basic Information</h4>
                
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Course Title <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter course title"
                        required
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Department <span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Department</option>
                        <option value="CSE">Computer Science & Engineering</option>
                        <option value="ECE">Electronics & Communication</option>
                        <option value="EEE">Electrical & Electronics</option>
                        <option value="MECH">Mechanical Engineering</option>
                        <option value="CIVIL">Civil Engineering</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Year <span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                      >
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Semester <span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                        required
                      >
                        <option value="Odd">Odd Semester</option>
                        <option value="Even">Even Semester</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-4">
                  <Form.Label>Course Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter a brief description of the course"
                  />
                </Form.Group>
                
                {/* Course Objectives */}
                <h5 className="mb-3">Course Objectives</h5>
                
                {formData.objectives.map((objective, index) => (
                  <div key={`objective-${index}`} className="d-flex mb-2">
                    <Form.Control
                      type="text"
                      value={objective}
                      onChange={(e) => handleArrayChange('objectives', index, e.target.value)}
                      placeholder={`Objective ${index + 1}`}
                    />
                    {formData.objectives.length > 1 && (
                      <Button
                        variant="outline-danger"
                        className="ms-2"
                        onClick={() => handleRemoveItem('objectives', index)}
                      >
                        <FaTrash />
                      </Button>
                    )}
                    {index === formData.objectives.length - 1 && (
                      <Button
                        variant="outline-primary"
                        className="ms-2"
                        onClick={() => handleAddItem('objectives')}
                      >
                        <FaPlus />
                      </Button>
                    )}
                  </div>
                ))}
                
                {/* Course Outcomes */}
                <h5 className="mb-3 mt-4">Course Outcomes</h5>
                
                {formData.outcomes.map((outcome, index) => (
                  <div key={`outcome-${index}`} className="d-flex mb-2">
                    <Form.Control
                      type="text"
                      value={outcome}
                      onChange={(e) => handleArrayChange('outcomes', index, e.target.value)}
                      placeholder={`Outcome ${index + 1}`}
                    />
                    {formData.outcomes.length > 1 && (
                      <Button
                        variant="outline-danger"
                        className="ms-2"
                        onClick={() => handleRemoveItem('outcomes', index)}
                      >
                        <FaTrash />
                      </Button>
                    )}
                    {index === formData.outcomes.length - 1 && (
                      <Button
                        variant="outline-primary"
                        className="ms-2"
                        onClick={() => handleAddItem('outcomes')}
                      >
                        <FaPlus />
                      </Button>
                    )}
                  </div>
                ))}
              </Col>
              
              <Col md={4}>
                {/* Upload Curriculum File */}
                <div className="border rounded p-3 mb-3">
                  <h5 className="mb-3">Upload Curriculum File</h5>
                  
                  <div className="text-center mb-3">
                    <div 
                      className="border rounded p-4 d-flex flex-column align-items-center justify-content-center"
                      style={{ minHeight: '200px' }}
                    >
                      {previewUrl ? (
                        <div>
                          <div className="mb-2">
                            <FaCheck className="text-success" size={24} />
                          </div>
                          <p className="mb-1">File Selected:</p>
                          <p className="text-primary mb-0">{formData.file?.name}</p>
                        </div>
                      ) : (
                        <div>
                          <FaUpload size={24} className="mb-2 text-muted" />
                          <p className="mb-0">Click to upload or drag and drop</p>
                          <p className="text-muted small mb-0">PDF, DOC, or DOCX (Max 10MB)</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-2">
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control 
                          type="file" 
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                          className="d-none"
                        />
                        <Button 
                          variant={previewUrl ? "success" : "primary"}
                          onClick={() => document.getElementById('formFile').click()}
                        >
                          {previewUrl ? "Change File" : "Select File"}
                        </Button>
                      </Form.Group>
                    </div>
                  </div>
                </div>
                
                {/* Textbooks */}
                <div className="border rounded p-3 mb-3">
                  <h5 className="mb-3">Textbooks</h5>
                  
                  {formData.textbooks.map((textbook, index) => (
                    <div key={`textbook-${index}`} className="d-flex mb-2">
                      <Form.Control
                        type="text"
                        value={textbook}
                        onChange={(e) => handleArrayChange('textbooks', index, e.target.value)}
                        placeholder={`Textbook ${index + 1}`}
                      />
                      {formData.textbooks.length > 1 && (
                        <Button
                          variant="outline-danger"
                          className="ms-2"
                          onClick={() => handleRemoveItem('textbooks', index)}
                        >
                          <FaTrash />
                        </Button>
                      )}
                      {index === formData.textbooks.length - 1 && (
                        <Button
                          variant="outline-primary"
                          className="ms-2"
                          onClick={() => handleAddItem('textbooks')}
                        >
                          <FaPlus />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* References */}
                <div className="border rounded p-3">
                  <h5 className="mb-3">Reference Materials</h5>
                  
                  {formData.references.map((reference, index) => (
                    <div key={`reference-${index}`} className="d-flex mb-2">
                      <Form.Control
                        type="text"
                        value={reference}
                        onChange={(e) => handleArrayChange('references', index, e.target.value)}
                        placeholder={`Reference ${index + 1}`}
                      />
                      {formData.references.length > 1 && (
                        <Button
                          variant="outline-danger"
                          className="ms-2"
                          onClick={() => handleRemoveItem('references', index)}
                        >
                          <FaTrash />
                        </Button>
                      )}
                      {index === formData.references.length - 1 && (
                        <Button
                          variant="outline-primary"
                          className="ms-2"
                          onClick={() => handleAddItem('references')}
                        >
                          <FaPlus />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
            
            {/* Course Units */}
            <div className="mt-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Course Units</h4>
                <Button
                  variant="outline-primary"
                  onClick={handleAddUnit}
                >
                  <FaPlus className="me-1" /> Add Unit
                </Button>
              </div>
              
              <Accordion defaultActiveKey="0">
                {formData.units.map((unit, unitIndex) => (
                  <Accordion.Item key={`unit-${unitIndex}`} eventKey={unitIndex.toString()}>
                    <Accordion.Header>
                      {unit.title ? `Unit ${unitIndex + 1}: ${unit.title}` : `Unit ${unitIndex + 1}`}
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h5 className="mb-0">Unit {unitIndex + 1} Details</h5>
                          {formData.units.length > 1 && (
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleRemoveUnit(unitIndex)}
                            >
                              <FaTrash className="me-1" /> Remove Unit
                            </Button>
                          )}
                        </div>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>Unit Title</Form.Label>
                          <Form.Control
                            type="text"
                            value={unit.title}
                            onChange={(e) => handleUnitChange(unitIndex, 'title', e.target.value)}
                            placeholder="Enter unit title"
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>Unit Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={unit.description}
                            onChange={(e) => handleUnitChange(unitIndex, 'description', e.target.value)}
                            placeholder="Enter unit description"
                          />
                        </Form.Group>
                        
                        <div className="mb-2">
                          <div className="d-flex justify-content-between align-items-center">
                            <h6>Topics</h6>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handleAddTopic(unitIndex)}
                            >
                              <FaPlus className="me-1" /> Add Topic
                            </Button>
                          </div>
                          
                          {unit.topics.map((topic, topicIndex) => (
                            <div key={`topic-${unitIndex}-${topicIndex}`} className="d-flex mt-2">
                              <Form.Control
                                type="text"
                                value={topic}
                                onChange={(e) => handleTopicChange(unitIndex, topicIndex, e.target.value)}
                                placeholder={`Topic ${topicIndex + 1}`}
                              />
                              {unit.topics.length > 1 && (
                                <Button
                                  variant="outline-danger"
                                  className="ms-2"
                                  onClick={() => handleRemoveTopic(unitIndex, topicIndex)}
                                >
                                  <FaTrash />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
            
            {/* Form Actions */}
            <div className="d-flex justify-content-end mt-4">
              <Button
                variant="outline-secondary"
                className="me-2"
                onClick={handleSaveAsDraft}
                disabled={submitting}
              >
                Save as Draft
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={submitting}
              >
                {submitting ? 'Uploading...' : 'Upload Curriculum'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CurriculumUpload;