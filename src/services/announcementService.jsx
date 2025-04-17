// Simulated delay for API calls
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock announcements data
let mockAnnouncements = [
  {
    id: 1,
    title: "Mid-Semester Exam Schedule",
    content: "The mid-semester examinations will begin from March 15, 2024. Please check the detailed schedule on the college website.",
    date: "2024-03-01",
    author: "Admin User",
    important: true,
    links: [
      {
        title: "Exam Schedule PDF",
        url: "https://svit.edu/exams/schedule-march-2024.pdf"
      }
    ]
  },
  {
    id: 2,
    title: "Workshop on Machine Learning",
    content: "A two-day workshop on Machine Learning with Python will be conducted on March 10-11, 2024. All CSE students are encouraged to participate.",
    date: "2024-02-28",
    author: "Dr. Ramesh Kumar",
    important: false,
    links: [
      {
        title: "Registration Form",
        url: "https://svit.edu/workshops/ml-workshop-registration"
      },
      {
        title: "Workshop Details",
        url: "https://svit.edu/workshops/ml-workshop-details"
      }
    ]
  },
  {
    id: 3,
    title: "Library Timings Extended",
    content: "The college library will remain open until 9 PM on weekdays during the examination period (March 10 to April 5, 2024).",
    date: "2024-02-25",
    author: "Admin User",
    important: false,
    links: []
  }
];

// Get all announcements
export const getAllAnnouncements = async () => {
  await delay(800); // Simulate API delay
  return [...mockAnnouncements].sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Get announcement by ID
export const getAnnouncementById = async (id) => {
  await delay(500); // Simulate API delay
  
  const announcement = mockAnnouncements.find(item => item.id === parseInt(id));
  
  if (!announcement) {
    throw new Error("Announcement not found");
  }
  
  return announcement;
};

// Add new announcement
export const addAnnouncement = async (announcementData) => {
  await delay(1000); // Simulate API delay
  
  const newAnnouncement = {
    id: mockAnnouncements.length > 0 ? Math.max(...mockAnnouncements.map(a => a.id)) + 1 : 1,
    ...announcementData,
    date: announcementData.date || new Date().toISOString().split('T')[0]
  };
  
  mockAnnouncements.push(newAnnouncement);
  
  return newAnnouncement;
};

// Update announcement
export const updateAnnouncement = async (id, announcementData) => {
  await delay(1000); // Simulate API delay
  
  const index = mockAnnouncements.findIndex(item => item.id === parseInt(id));
  
  if (index === -1) {
    throw new Error("Announcement not found");
  }
  
  mockAnnouncements[index] = {
    ...mockAnnouncements[index],
    ...announcementData
  };
  
  return mockAnnouncements[index];
};

// Delete announcement
export const deleteAnnouncement = async (id) => {
  await delay(800); // Simulate API delay
  
  const index = mockAnnouncements.findIndex(item => item.id === parseInt(id));
  
  if (index === -1) {
    throw new Error("Announcement not found");
  }
  
  mockAnnouncements = mockAnnouncements.filter(item => item.id !== parseInt(id));
  
  return { success: true, message: "Announcement deleted successfully" };
};

// Get important announcements
export const getImportantAnnouncements = async () => {
  await delay(500); // Simulate API delay
  
  return mockAnnouncements
    .filter(item => item.important)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Get recent announcements (last 5)
export const getRecentAnnouncements = async (count = 5) => {
  await delay(500); // Simulate API delay
  
  return [...mockAnnouncements]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, count);
};