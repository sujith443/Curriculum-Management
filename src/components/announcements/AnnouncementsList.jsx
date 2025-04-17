import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Badge, Accordion } from 'react-bootstrap';
import { FaStar, FaLink, FaExternalLinkAlt } from 'react-icons/fa';
import { getRecentAnnouncements, getImportantAnnouncements } from '../../services/announcementService';
import { formatDate } from '../../utils/helpers';

const AnnouncementsList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [importantAnnouncements, setImportantAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchAnnouncements();
  }, []);
  
  const fetchAnnouncements = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch both regular and important announcements
      const [recentData, importantData] = await Promise.all([
        getRecentAnnouncements(10),
        getImportantAnnouncements()
      ]);
      
      setAnnouncements(recentData);
      setImportantAnnouncements(importantData);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setError('Failed to load announcements. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const renderLinks = (links) => {
    if (!links || links.length === 0) return null;
    
    return (
      <div className="mt-3">
        <h6 className="d-flex align-items-center">
          <FaLink className="me-2" /> Related Links:
        </h6>
        <ul className="list-unstyled ms-3">
          {links.map((link, index) => (
            <li key={index} className="mb-1">
              <a 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="d-flex align-items-center"
              >
                <FaExternalLinkAlt size={12} className="me-2" />
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  if (loading) {
    return (
      <Card className="shadow-sm mb-4">
        <Card.Body className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading announcements...</p>
        </Card.Body>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Alert variant="danger">
        {error}
        <Button 
          variant="outline-danger" 
          size="sm" 
          className="ms-3"
          onClick={fetchAnnouncements}
        >
          Try Again
        </Button>
      </Alert>
    );
  }
  
  return (
    <div>
      {/* Important Announcements Section */}
      {importantAnnouncements.length > 0 && (
        <div className="mb-4">
          <h5 className="mb-3">Important Announcements</h5>
          
          {importantAnnouncements.map(announcement => (
            <Card key={announcement.id} className="mb-3 border-warning">
              <Card.Header className="bg-warning bg-opacity-10 d-flex align-items-center">
                <FaStar className="text-warning me-2" />
                <h6 className="mb-0 flex-grow-1">{announcement.title}</h6>
                <Badge bg="secondary" className="ms-2">
                  {formatDate(announcement.date)}
                </Badge>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  {announcement.content}
                </Card.Text>
                {renderLinks(announcement.links)}
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
      
      {/* Recent Announcements Section */}
      <div className="mb-4">
        <h5 className="mb-3">Recent Announcements</h5>
        
        {announcements.length === 0 ? (
          <Alert variant="info">
            No recent announcements.
          </Alert>
        ) : (
          <Accordion defaultActiveKey="0">
            {announcements.map((announcement, index) => (
              <Accordion.Item key={announcement.id} eventKey={index.toString()}>
                <Accordion.Header>
                  <div className="d-flex align-items-center w-100">
                    <span className="flex-grow-1">{announcement.title}</span>
                    <Badge bg="secondary" className="ms-2 me-3">
                      {formatDate(announcement.date)}
                    </Badge>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <p>{announcement.content}</p>
                  {renderLinks(announcement.links)}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsList;