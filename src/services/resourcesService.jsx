// Simulated delay for API calls
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock resources data (links/URLs)
let mockResources = [
  {
    id: 1,
    title: "College Website",
    url: "https://svit.edu",
    description: "Official website of SVIT College",
    category: "official",
    addedBy: "Admin User",
    addedOn: "2024-01-01",
    visibility: ["student", "faculty", "admin"]
  },
  {
    id: 2,
    title: "Library Portal",
    url: "https://library.svit.edu",
    description: "Online portal for SVIT College Library",
    category: "academic",
    addedBy: "Admin User",
    addedOn: "2024-01-05",
    visibility: ["student", "faculty", "admin"]
  },
  {
    id: 3,
    title: "Learning Management System",
    url: "https://lms.svit.edu",
    description: "SVIT Learning Management System for online courses",
    category: "academic",
    addedBy: "Admin User",
    addedOn: "2024-01-10",
    visibility: ["student", "faculty", "admin"]
  },
  {
    id: 4,
    title: "Faculty Portal",
    url: "https://faculty.svit.edu",
    description: "Faculty portal for managing courses and student information",
    category: "official",
    addedBy: "Admin User",
    addedOn: "2024-01-15",
    visibility: ["faculty", "admin"]
  },
  {
    id: 5,
    title: "Exam Registration Portal",
    url: "https://exams.svit.edu",
    description: "Portal for exam registration and results",
    category: "academic",
    addedBy: "Admin User",
    addedOn: "2024-01-20",
    visibility: ["student", "faculty", "admin"]
  },
  {
    id: 6,
    title: "Campus Recruitment Portal",
    url: "https://placements.svit.edu",
    description: "Portal for campus recruitment and internship opportunities",
    category: "placement",
    addedBy: "Admin User",
    addedOn: "2024-02-01",
    visibility: ["student", "faculty", "admin"]
  },
  {
    id: 7,
    title: "Administrative Dashboard",
    url: "https://admin.svit.edu",
    description: "Administrative dashboard for college management",
    category: "official",
    addedBy: "Admin User",
    addedOn: "2024-02-10",
    visibility: ["admin"]
  }
];

// Get all resources
export const getAllResources = async () => {
  await delay(800); // Simulate API delay
  return [...mockResources].sort((a, b) => a.title.localeCompare(b.title));
};

// Get resources by role (filter based on visibility)
export const getResourcesByRole = async (role) => {
  await delay(600); // Simulate API delay
  
  return mockResources
    .filter(resource => resource.visibility.includes(role))
    .sort((a, b) => a.title.localeCompare(b.title));
};

// Get resources by category
export const getResourcesByCategory = async (category) => {
  await delay(500); // Simulate API delay
  
  return mockResources
    .filter(resource => resource.category === category)
    .sort((a, b) => a.title.localeCompare(b.title));
};

// Get resource by ID
export const getResourceById = async (id) => {
  await delay(400); // Simulate API delay
  
  const resource = mockResources.find(item => item.id === parseInt(id));
  
  if (!resource) {
    throw new Error("Resource not found");
  }
  
  return resource;
};

// Add new resource
export const addResource = async (resourceData) => {
  await delay(1000); // Simulate API delay
  
  const newResource = {
    id: mockResources.length > 0 ? Math.max(...mockResources.map(r => r.id)) + 1 : 1,
    ...resourceData,
    addedOn: new Date().toISOString().split('T')[0]
  };
  
  mockResources.push(newResource);
  
  return newResource;
};

// Update resource
export const updateResource = async (id, resourceData) => {
  await delay(800); // Simulate API delay
  
  const index = mockResources.findIndex(item => item.id === parseInt(id));
  
  if (index === -1) {
    throw new Error("Resource not found");
  }
  
  mockResources[index] = {
    ...mockResources[index],
    ...resourceData
  };
  
  return mockResources[index];
};

// Delete resource
export const deleteResource = async (id) => {
  await delay(800); // Simulate API delay
  
  const index = mockResources.findIndex(item => item.id === parseInt(id));
  
  if (index === -1) {
    throw new Error("Resource not found");
  }
  
  mockResources = mockResources.filter(item => item.id !== parseInt(id));
  
  return { success: true, message: "Resource deleted successfully" };
};

// Search resources
export const searchResources = async (query, role) => {
  await delay(700); // Simulate API delay
  
  const searchQuery = query.toLowerCase();
  
  return mockResources
    .filter(resource => 
      // Filter by visibility for the role
      resource.visibility.includes(role) && 
      // Search in title and description
      (resource.title.toLowerCase().includes(searchQuery) || 
       resource.description.toLowerCase().includes(searchQuery))
    )
    .sort((a, b) => a.title.localeCompare(b.title));
};