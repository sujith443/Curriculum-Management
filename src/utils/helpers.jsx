import { STORAGE_KEYS } from './constant';

// Format date in a readable format
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};

// Format file size in a readable format
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Get year label based on year number
export const getYearLabel = (year) => {
  switch (year) {
    case '1':
      return '1st Year';
    case '2':
      return '2nd Year';
    case '3':
      return '3rd Year';
    case '4':
      return '4th Year';
    default:
      return `${year} Year`;
  }
};

// Get department full name based on code
export const getDepartmentName = (code) => {
  const departments = {
    'CSE': 'Computer Science & Engineering',
    'ECE': 'Electronics & Communication',
    'EEE': 'Electrical & Electronics',
    'MECH': 'Mechanical Engineering',
    'CIVIL': 'Civil Engineering'
  };
  
  return departments[code] || code;
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
};

// Save data to local storage
export const saveToStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// Get data from local storage
export const getFromStorage = (key) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return null;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error('Error getting from localStorage:', error);
    return null;
  }
};

// Remove data from local storage
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

// Get user data from local storage
export const getStoredUser = () => {
  return getFromStorage(STORAGE_KEYS.USER);
};

// Get auth token from local storage
export const getStoredToken = () => {
  return getFromStorage(STORAGE_KEYS.AUTH_TOKEN);
};

// Clear all auth data from local storage (for logout)
export const clearAuthData = () => {
  removeFromStorage(STORAGE_KEYS.USER);
  removeFromStorage(STORAGE_KEYS.AUTH_TOKEN);
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate random ID (for demo purposes)
export const generateRandomId = () => {
  return Math.floor(Math.random() * 10000);
};

// Check if user has the required role
export const hasRole = (user, roles) => {
  if (!user || !user.role) return false;
  if (Array.isArray(roles)) {
    return roles.includes(user.role);
  }
  return user.role === roles;
};

// Extract extension from filename
export const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase();
};

// Check if file type is allowed
export const isAllowedFileType = (file, allowedTypes) => {
  if (!file || !allowedTypes) return false;
  
  const fileType = file.type;
  return allowedTypes.includes(fileType);
};

// Check if file size is within limit
export const isFileSizeValid = (file, maxSize) => {
  if (!file) return false;
  
  return file.size <= maxSize;
};

// Create debounced function
export const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};