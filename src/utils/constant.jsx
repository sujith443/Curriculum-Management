// Role constants
export const ROLES = {
    STUDENT: 'student',
    FACULTY: 'faculty',
    ADMIN: 'admin'
  };
  
  // Department constants
  export const DEPARTMENTS = {
    CSE: 'Computer Science & Engineering',
    ECE: 'Electronics & Communication',
    EEE: 'Electrical & Electronics',
    MECH: 'Mechanical Engineering',
    CIVIL: 'Civil Engineering'
  };
  
  // Department codes
  export const DEPARTMENT_CODES = {
    CSE: 'CSE',
    ECE: 'ECE',
    EEE: 'EEE',
    MECH: 'MECH',
    CIVIL: 'CIVIL'
  };
  
  // Year constants
  export const YEARS = {
    FIRST: '1',
    SECOND: '2',
    THIRD: '3',
    FOURTH: '4'
  };
  
  // Semester constants
  export const SEMESTERS = {
    ODD: 'Odd',
    EVEN: 'Even'
  };
  
  // File upload constants
  export const FILE_TYPES = {
    PDF: 'application/pdf',
    DOC: 'application/msword',
    DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  };
  
  export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  
  // Status constants
  export const STATUS = {
    PUBLISHED: 'published',
    DRAFT: 'draft',
    ARCHIVED: 'archived'
  };
  
  // Local storage keys
  export const STORAGE_KEYS = {
    USER: 'user',
    AUTH_TOKEN: 'auth_token',
    THEME: 'theme'
  };
  
  // API endpoints (for demonstration)
  export const API_ENDPOINTS = {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    CURRICULUM: '/api/curriculum',
    USERS: '/api/users',
    SEARCH: '/api/curriculum/search'
  };
  
  // Error messages
  export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your internet connection.',
    SERVER_ERROR: 'Server error. Please try again later.',
    AUTHENTICATION_FAILED: 'Authentication failed. Please login again.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    NOT_FOUND: 'The requested resource was not found.',
    VALIDATION_ERROR: 'Please check your input and try again.'
  };
  
  // Success messages
  export const SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: 'Login successful. Welcome back!',
    REGISTER_SUCCESS: 'Registration successful. Welcome to SVIT Curriculum Management!',
    UPLOAD_SUCCESS: 'Curriculum uploaded successfully!',
    UPDATE_SUCCESS: 'Curriculum updated successfully!',
    DRAFT_SAVED: 'Draft saved successfully!'
  };
  
  // Pagination defaults
  export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    OPTIONS: [10, 25, 50, 100]
  };