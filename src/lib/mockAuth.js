/**
 * Mock Authentication API
 * 
 * This file provides mock authentication endpoints for testing.
 * Replace these with real API calls once your backend is ready.
 * 
 * To enable mock auth:
 * 1. Uncomment the mock imports in src/lib/api.js
 * 2. Comment out the real API calls
 */

export const loginUser = async (email, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Get stored users from localStorage
  const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
  
  // Find user by email
  const user = users.find(u => u.email === email);
  
  if (!user) {
    throw new Error('User not found. Please sign up first.');
  }
  
  // Check password
  if (user.password !== password) {
    throw new Error('Invalid email or password');
  }
  
  // Return success response
  return {
    token: 'mock_jwt_token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
};

export const signupUser = async (name, email, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Validate inputs
  if (!name || !email || !password) {
    throw new Error('Please fill in all fields');
  }
  
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
  
  // Get stored users from localStorage
  const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
  
  // Check if email already exists
  if (users.find(u => u.email === email)) {
    throw new Error('Email already exists. Please login or use a different email.');
  }
  
  // Create new user
  const newUser = {
    id: Date.now().toString() + '_' + Math.random().toString(36).substr(2, 9),
    name,
    email,
    password // In production, this should be hashed!
  };
  
  // Save to localStorage
  users.push(newUser);
  localStorage.setItem('mockUsers', JSON.stringify(users));
  
  // Return success response
  return {
    token: 'mock_jwt_token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }
  };
};
