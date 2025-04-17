// Simulated delay for API calls
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock calendar events data
let mockCalendarEvents = [
  {
    id: 1,
    title: "Semester Start Date",
    start: "2024-01-08",
    end: "2024-01-08",
    description: "Start of the Spring 2024 semester for all departments",
    type: "academic",
    links: [
      {
        title: "Academic Calendar",
        url: "https://svit.edu/academic-calendar-2024"
      }
    ]
  },
  {
    id: 2,
    title: "Mid-Semester Examinations",
    start: "2024-03-15",
    end: "2024-03-25",
    description: "Mid-semester examinations for all departments",
    type: "exam",
    links: [
      {
        title: "Exam Schedule",
        url: "https://svit.edu/exams/schedule-march-2024"
      },
      {
        title: "Exam Guidelines",
        url: "https://svit.edu/exams/guidelines"
      }
    ]
  },
  {
    id: 3,
    title: "College Technical Fest",
    start: "2024-02-15",
    end: "2024-02-17",
    description: "Annual Technical Fest of SVIT College",
    type: "event",
    links: [
      {
        title: "Event Details",
        url: "https://svit.edu/techfest-2024"
      }
    ]
  },
  {
    id: 4,
    title: "Final Practical Examinations",
    start: "2024-04-20",
    end: "2024-04-30",
    description: "Final practical examinations for all departments",
    type: "exam",
    links: []
  },
  {
    id: 5,
    title: "End Semester Examinations",
    start: "2024-05-10",
    end: "2024-05-25",
    description: "End semester theory examinations for all departments",
    type: "exam",
    links: []
  },
  {
    id: 6,
    title: "Summer Vacation",
    start: "2024-05-26",
    end: "2024-07-14",
    description: "Summer vacation for all students",
    type: "holiday",
    links: []
  },
  {
    id: 7,
    title: "Odd Semester Registration",
    start: "2024-07-15",
    end: "2024-07-18",
    description: "Registration for Odd Semester 2024-25",
    type: "academic",
    links: []
  }
];

// Get all calendar events
export const getAllCalendarEvents = async () => {
  await delay(800); // Simulate API delay
  return [...mockCalendarEvents].sort((a, b) => new Date(a.start) - new Date(b.start));
};

// Get calendar event by ID
export const getCalendarEventById = async (id) => {
  await delay(500); // Simulate API delay
  
  const event = mockCalendarEvents.find(item => item.id === parseInt(id));
  
  if (!event) {
    throw new Error("Calendar event not found");
  }
  
  return event;
};

// Add new calendar event
export const addCalendarEvent = async (eventData) => {
  await delay(1000); // Simulate API delay
  
  const newEvent = {
    id: mockCalendarEvents.length > 0 ? Math.max(...mockCalendarEvents.map(e => e.id)) + 1 : 1,
    ...eventData
  };
  
  mockCalendarEvents.push(newEvent);
  
  return newEvent;
};

// Update calendar event
export const updateCalendarEvent = async (id, eventData) => {
  await delay(1000); // Simulate API delay
  
  const index = mockCalendarEvents.findIndex(item => item.id === parseInt(id));
  
  if (index === -1) {
    throw new Error("Calendar event not found");
  }
  
  mockCalendarEvents[index] = {
    ...mockCalendarEvents[index],
    ...eventData
  };
  
  return mockCalendarEvents[index];
};

// Delete calendar event
export const deleteCalendarEvent = async (id) => {
  await delay(800); // Simulate API delay
  
  const index = mockCalendarEvents.findIndex(item => item.id === parseInt(id));
  
  if (index === -1) {
    throw new Error("Calendar event not found");
  }
  
  mockCalendarEvents = mockCalendarEvents.filter(item => item.id !== parseInt(id));
  
  return { success: true, message: "Calendar event deleted successfully" };
};

// Get upcoming events (next specified number of days)
export const getUpcomingEvents = async (days = 30, maxEvents = 5) => {
  await delay(500); // Simulate API delay
  
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + days);
  
  return mockCalendarEvents
    .filter(event => {
      const eventStart = new Date(event.start);
      return eventStart >= today && eventStart <= futureDate;
    })
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, maxEvents);
};

// Get events by type
export const getEventsByType = async (type) => {
  await delay(500); // Simulate API delay
  
  return mockCalendarEvents
    .filter(event => event.type === type)
    .sort((a, b) => new Date(a.start) - new Date(b.start));
};

// Get events by date range
export const getEventsByDateRange = async (startDate, endDate) => {
  await delay(600); // Simulate API delay
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return mockCalendarEvents
    .filter(event => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      
      // Check if the event falls within the date range
      return (
        (eventStart >= start && eventStart <= end) || // Event starts in range
        (eventEnd >= start && eventEnd <= end) || // Event ends in range
        (eventStart <= start && eventEnd >= end) // Event spans the entire range
      );
    })
    .sort((a, b) => new Date(a.start) - new Date(b.start));
};