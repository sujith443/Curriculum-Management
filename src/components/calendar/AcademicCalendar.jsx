import React, { useState, useEffect } from 'react';
import { Card, Alert, Button, Table, Badge, Nav, Tab, Row, Col } from 'react-bootstrap';
import { FaCalendarAlt, FaLink, FaExternalLinkAlt } from 'react-icons/fa';
import { 
  getAllCalendarEvents, 
  getUpcomingEvents,
  getEventsByType
} from '../../services/calendarService';
import { formatDate } from '../../utils/helpers';

const AcademicCalendar = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Event types
  const eventTypes = [
    { value: 'academic', label: 'Academic', color: 'primary' },
    { value: 'exam', label: 'Examination', color: 'danger' },
    { value: 'event', label: 'Event', color: 'success' },
    { value: 'holiday', label: 'Holiday', color: 'info' }
  ];
  
  useEffect(() => {
    fetchCalendarData();
  }, []);
  
  const fetchCalendarData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch both all events and upcoming events
      const [allData, upcomingData] = await Promise.all([
        getAllCalendarEvents(),
        getUpcomingEvents(30, 5)
      ]);
      
      setAllEvents(allData);
      setUpcomingEvents(upcomingData);
    } catch (error) {
      console.error('Error fetching calendar data:', error);
      setError('Failed to load calendar data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Get events by type for the tab panels
  const getEventsByTypeData = async (type) => {
    try {
      return await getEventsByType(type);
    } catch (error) {
      console.error(`Error fetching ${type} events:`, error);
      return [];
    }
  };
  
  // Get badge for event type
  const getEventTypeBadge = (type) => {
    const eventType = eventTypes.find(t => t.value === type) || eventTypes[0];
    return <Badge bg={eventType.color}>{eventType.label}</Badge>;
  };
  
  // Render links
  const renderLinks = (links) => {
    if (!links || links.length === 0) return null;
    
    return (
      <div className="mt-2">
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
          <p className="mt-3">Loading calendar events...</p>
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
          onClick={fetchCalendarData}
        >
          Try Again
        </Button>
      </Alert>
    );
  }
  
  return (
    <div>
      {/* Upcoming Events */}
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0 d-flex align-items-center">
            <FaCalendarAlt className="me-2" /> Upcoming Events
          </h5>
        </Card.Header>
        <Card.Body>
          {upcomingEvents.length === 0 ? (
            <Alert variant="info">
              No upcoming events in the next 30 days.
            </Alert>
          ) : (
            <div className="table-responsive">
              <Table bordered hover>
                <thead>
                  <tr>
                    <th style={{ width: '20%' }}>Date</th>
                    <th style={{ width: '50%' }}>Event</th>
                    <th style={{ width: '15%' }}>Type</th>
                    <th style={{ width: '15%' }}>Links</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingEvents.map(event => (
                    <tr key={event.id}>
                      <td>
                        {formatDate(event.start)}
                        {event.start !== event.end && ` - ${formatDate(event.end)}`}
                      </td>
                      <td>
                        <strong>{event.title}</strong>
                        {event.description && (
                          <p className="mb-0 mt-1 text-muted small">{event.description}</p>
                        )}
                      </td>
                      <td>{getEventTypeBadge(event.type)}</td>
                      <td>
                        {event.links && event.links.length > 0 ? (
                          <div>
                            {event.links.map((link, index) => (
                              <div key={index} className="mb-1">
                                <a 
                                  href={link.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="d-flex align-items-center"
                                >
                                  <FaExternalLinkAlt size={12} className="me-1" />
                                  {link.title}
                                </a>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <Badge bg="secondary">No links</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
      
      {/* Full Academic Calendar */}
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0 d-flex align-items-center">
            <FaCalendarAlt className="me-2" /> Academic Calendar
          </h5>
        </Card.Header>
        <Card.Body>
          <Tab.Container id="calendar-tabs" defaultActiveKey="all">
            <Nav variant="pills" className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey="all">All Events</Nav.Link>
              </Nav.Item>
              {eventTypes.map(type => (
                <Nav.Item key={type.value}>
                  <Nav.Link eventKey={type.value}>{type.label}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
            
            <Tab.Content>
              <Tab.Pane eventKey="all">
                <div className="table-responsive">
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th style={{ width: '20%' }}>Date</th>
                        <th style={{ width: '50%' }}>Event</th>
                        <th style={{ width: '15%' }}>Type</th>
                        <th style={{ width: '15%' }}>Links</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allEvents.map(event => (
                        <tr key={event.id}>
                          <td>
                            {formatDate(event.start)}
                            {event.start !== event.end && ` - ${formatDate(event.end)}`}
                          </td>
                          <td>
                            <strong>{event.title}</strong>
                            {event.description && (
                              <p className="mb-0 mt-1 text-muted small">{event.description}</p>
                            )}
                          </td>
                          <td>{getEventTypeBadge(event.type)}</td>
                          <td>
                            {event.links && event.links.length > 0 ? (
                              <div>
                                {event.links.map((link, index) => (
                                  <div key={index} className="mb-1">
                                    <a 
                                      href={link.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="d-flex align-items-center"
                                    >
                                      <FaExternalLinkAlt size={12} className="me-1" />
                                      {link.title}
                                    </a>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <Badge bg="secondary">No links</Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Tab.Pane>
              
              {eventTypes.map(type => (
                <Tab.Pane key={type.value} eventKey={type.value}>
                  <FilteredEventsList type={type.value} getEventsByTypeData={getEventsByTypeData} getEventTypeBadge={getEventTypeBadge} />
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Tab.Container>
        </Card.Body>
      </Card>
    </div>
  );
};

// Component for filtered events by type
const FilteredEventsList = ({ type, getEventsByTypeData, getEventTypeBadge }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getEventsByTypeData(type);
      setEvents(data);
      setLoading(false);
    };
    
    fetchData();
  }, [type, getEventsByTypeData]);
  
  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (events.length === 0) {
    return (
      <Alert variant="info">
        No events found for this category.
      </Alert>
    );
  }
  
  return (
    <div className="table-responsive">
      <Table bordered hover>
        <thead>
          <tr>
            <th style={{ width: '20%' }}>Date</th>
            <th style={{ width: '65%' }}>Event</th>
            <th style={{ width: '15%' }}>Links</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>
                {formatDate(event.start)}
                {event.start !== event.end && ` - ${formatDate(event.end)}`}
              </td>
              <td>
                <strong>{event.title}</strong>
                {event.description && (
                  <p className="mb-0 mt-1 text-muted small">{event.description}</p>
                )}
              </td>
              <td>
                {event.links && event.links.length > 0 ? (
                  <div>
                    {event.links.map((link, index) => (
                      <div key={index} className="mb-1">
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="d-flex align-items-center"
                        >
                          <FaExternalLinkAlt size={12} className="me-1" />
                          {link.title}
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Badge bg="secondary">No links</Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AcademicCalendar;