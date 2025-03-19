// Mock curriculum data for demonstration
const mockCurriculumData = [
    {
      id: 1,
      title: "Programming in Python",
      department: "CSE",
      year: "1",
      semester: "Odd",
      faculty: "Dr. Arun Kumar",
      lastUpdated: "2024-02-20",
      status: "published",
      description: "Introduction to programming concepts using Python language",
      objectives: [
        "Understand basic programming concepts",
        "Learn Python syntax and semantics",
        "Develop problem-solving skills"
      ],
      outcomes: [
        "Ability to write Python programs",
        "Capability to solve computational problems",
        "Foundation for advanced programming courses"
      ],
      units: [
        {
          title: "Introduction to Python",
          description: "Basics of Python programming",
          topics: [
            "Python History and Installation",
            "Python Syntax and Variables",
            "Basic Data Types"
          ]
        },
        {
          title: "Control Structures",
          description: "Conditional statements and loops",
          topics: [
            "Conditional Statements (if-else)",
            "Loops (for, while)",
            "Control Flow"
          ]
        }
      ],
      textbooks: [
        "Python Programming: An Introduction to Computer Science by John Zelle",
        "Learning Python by Mark Lutz"
      ],
      references: [
        "Think Python by Allen B. Downey",
        "Python Documentation (docs.python.org)"
      ]
    },
    // Additional mock data would be here
  ];
  
  // Simulated delay for API calls
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  // Get all curriculum items
  export const getAllCurriculum = async () => {
    await delay(1000); // Simulate API delay
    return mockCurriculumData;
  };
  
  // Get curriculum by ID
  export const getCurriculumById = async (id) => {
    await delay(800); // Simulate API delay
    const curriculum = mockCurriculumData.find(item => item.id === parseInt(id));
    
    if (!curriculum) {
      throw new Error("Curriculum not found");
    }
    
    return curriculum;
  };
  
  // Search curriculum by query
  export const searchCurriculum = async (query) => {
    await delay(1200); // Simulate API delay
    
    const searchQuery = query.toLowerCase();
    
    return mockCurriculumData.filter(item => 
      item.title.toLowerCase().includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery) ||
      item.faculty.toLowerCase().includes(searchQuery)
    );
  };
  
  // Advanced search with filters
  export const advancedSearchCurriculum = async (filters) => {
    await delay(1500); // Simulate API delay
    
    let results = [...mockCurriculumData];
    
    if (filters.department) {
      results = results.filter(item => item.department === filters.department);
    }
    
    if (filters.year) {
      results = results.filter(item => item.year === filters.year);
    }
    
    if (filters.semester) {
      results = results.filter(item => item.semester === filters.semester);
    }
    
    if (filters.faculty) {
      results = results.filter(item => 
        item.faculty.toLowerCase().includes(filters.faculty.toLowerCase())
      );
    }
    
    if (filters.keyword) {
      results = results.filter(item => 
        item.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        item.description.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }
    
    return results;
  };
  
  // Upload new curriculum
  export const uploadCurriculum = async (curriculumData) => {
    await delay(2000); // Simulate API delay
    
    // In a real application, this would send data to the server
    console.log("Uploading curriculum data:", curriculumData);
    
    // Return a mock response
    return {
      success: true,
      message: "Curriculum uploaded successfully",
      id: Math.floor(Math.random() * 1000) // Generate random ID for new curriculum
    };
  };
  
  // Save curriculum as draft
  export const saveCurriculumDraft = async (curriculumData) => {
    await delay(1500); // Simulate API delay
    
    // In a real application, this would send data to the server
    console.log("Saving curriculum draft:", curriculumData);
    
    // Return a mock response
    return {
      success: true,
      message: "Curriculum draft saved successfully",
      id: Math.floor(Math.random() * 1000) // Generate random ID for new draft
    };
  };
  
  // Get faculty-specific curriculum
  export const getFacultyCurriculum = async (facultyId) => {
    await delay(1000); // Simulate API delay
    
    // In a real application, this would filter based on actual faculty ID
    return mockCurriculumData.filter(item => 
      item.faculty.includes("Dr.") || item.faculty.includes("Prof.")
    );
  };
  
  // Get department-specific curriculum
  export const getDepartmentCurriculum = async (department) => {
    await delay(1000); // Simulate API delay
    
    return mockCurriculumData.filter(item => item.department === department);
  };