// Simulated delay for API calls
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "student@svit.edu",
    password: "password123",
    role: "student",
    department: "CSE",
    year: "3",
    studentId: "CSE1901"
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    email: "faculty@svit.edu",
    password: "password123",
    role: "faculty",
    department: "CSE"
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@svit.edu",
    password: "password123",
    role: "admin"
  }
];

// Login user
export const loginUser = async (email, password) => {
  await delay(1000); // Simulate API delay
  
  const user = mockUsers.find(user => 
    user.email.toLowerCase() === email.toLowerCase() && 
    user.password === password
  );
  
  if (!user) {
    throw new Error("Invalid email or password");
  }
  
  // Remove password from user object before returning
  const { password: _, ...userWithoutPassword } = user;
  
  return userWithoutPassword;
};

// Register new user
export const registerUser = async (userData) => {
  await delay(1500); // Simulate API delay
  
  // Check if email already exists
  const existingUser = mockUsers.find(user => 
    user.email.toLowerCase() === userData.email.toLowerCase()
  );
  
  if (existingUser) {
    throw new Error("Email address is already in use");
  }
  
  // Create new user
  const newUser = {
    id: mockUsers.length + 1,
    ...userData
  };
  
  // In a real application, this would add the user to the database
  mockUsers.push(newUser);
  
  // Remove password from user object before returning
  const { password: _, ...userWithoutPassword } = newUser;
  
  return userWithoutPassword;
};

// Get user profile
export const getUserProfile = async (userId) => {
  await delay(800); // Simulate API delay
  
  const user = mockUsers.find(user => user.id === parseInt(userId));
  
  if (!user) {
    throw new Error("User not found");
  }
  
  // Remove password from user object before returning
  const { password: _, ...userWithoutPassword } = user;
  
  return userWithoutPassword;
};

// Update user profile
export const updateUserProfile = async (userId, userData) => {
  await delay(1200); // Simulate API delay
  
  const userIndex = mockUsers.findIndex(user => user.id === parseInt(userId));
  
  if (userIndex === -1) {
    throw new Error("User not found");
  }
  
  // Update user data
  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    ...userData,
    id: parseInt(userId) // Ensure ID doesn't change
  };
  
  // Remove password from user object before returning
  const { password: _, ...userWithoutPassword } = mockUsers[userIndex];
  
  return userWithoutPassword;
};

// Change password
export const changePassword = async (userId, currentPassword, newPassword) => {
  await delay(1000); // Simulate API delay
  
  const userIndex = mockUsers.findIndex(user => 
    user.id === parseInt(userId) && user.password === currentPassword
  );
  
  if (userIndex === -1) {
    throw new Error("Current password is incorrect");
  }
  
  // Update password
  mockUsers[userIndex].password = newPassword;
  
  return { success: true, message: "Password changed successfully" };
};

// Forgot password
export const forgotPassword = async (email) => {
  await delay(1500); // Simulate API delay
  
  const user = mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    throw new Error("Email address not found");
  }
  
  // In a real application, this would send a password reset email
  
  return { success: true, message: "Password reset instructions sent to your email" };
};

// Logout user
export const logoutUser = async () => {
  await delay(500); // Simulate API delay
  
  // In a real application, this would invalidate the user's session/token
  
  return { success: true };
};