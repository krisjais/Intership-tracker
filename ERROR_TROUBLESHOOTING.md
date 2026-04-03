# Error Troubleshooting Guide

## Issue: "An error occurred. Please try again."

The error you're seeing when trying to create an account happens because the **backend API endpoints are not yet implemented**.

### Why This Happens

Your frontend is trying to send a signup/login request to:
- `http://localhost:5001/api/auth/signup`
- `http://localhost:5001/api/auth/login`

But these endpoints don't exist on your backend yet.

### How to Fix It

#### Option 1: Implement Backend Endpoints (Recommended)

Your backend needs to implement these endpoints:

**1. Signup Endpoint**
```
POST /api/auth/signup
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}

Response (Success - 200):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "user@example.com"
  }
}

Response (Error - 400):
{
  "message": "Email already exists"
}
```

**2. Login Endpoint**
```
POST /api/auth/login
Content-Type: application/json

Body:
{
  "email": "user@example.com",
  "password": "password123"
}

Response (Success - 200):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "user@example.com"
  }
}

Response (Error - 401):
{
  "message": "Invalid email or password"
}
```

#### Option 2: Test with Mock Backend

If you want to test without a real backend, you can use a mock service. Here's a simple example using the browser's `indexedDB` or `localStorage`:

1. Create a file `src/lib/mockAuth.js`:

```javascript
// This is just for testing - replace with real backend API
export const loginUser = async (email, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Get stored users
  const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  return {
    token: 'mock_token_' + Date.now(),
    user: { id: user.id, name: user.name, email: user.email }
  };
};

export const signupUser = async (name, email, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Get stored users
  const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
  
  // Check if email exists
  if (users.find(u => u.email === email)) {
    throw new Error('Email already exists');
  }
  
  // Create new user
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password
  };
  
  users.push(newUser);
  localStorage.setItem('mockUsers', JSON.stringify(users));
  
  return {
    token: 'mock_token_' + Date.now(),
    user: { id: newUser.id, name: newUser.name, email: newUser.email }
  };
};
```

2. Update `src/lib/api.js` to use mock auth temporarily:

```javascript
// At the top of the file, import mock functions
import { loginUser as mockLoginUser, signupUser as mockSignupUser } from './mockAuth';

// Use these instead of real API calls for testing:
export const loginUser = mockLoginUser;
export const signupUser = mockSignupUser;
```

### Backend Implementation Example (Node.js + Express)

Here's a simple example if you're using Node.js with Express:

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

// Simple in-memory database (use real DB in production)
let users = [];
const JWT_SECRET = 'your_secret_key_here';

// Signup endpoint
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword
    };
    
    users.push(user);
    
    // Create JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Create JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});
```

### Checking if Backend is Running

If you see the error "Cannot connect to the server. Is it running?", make sure:

1. Your backend server is running on `http://localhost:5001`
2. The endpoints are correctly implemented
3. CORS is enabled on your backend (if frontend and backend are on different ports)

Example CORS setup in Express:
```javascript
const cors = require('cors');
app.use(cors());
```

### Color Theme

✅ **Done!** I've updated all colors from violet to blue and white. The changes include:
- Login page background: Blue gradient
- Input fields: Light blue backgrounds with blue focus
- Buttons: Blue (#2563eb)
- Sidebar: Blue accents
- All UI elements now use the blue/white color scheme

### Next Steps

1. Either:
   - Implement the backend endpoints (Option 1 - Recommended)
   - Use the mock auth for testing (Option 2)

2. Once auth is working, test the full flow:
   - Sign up with new account
   - Log in
   - Access dashboard
   - Log out

3. For production, ensure you have proper:
   - Password hashing (bcrypt)
   - JWT implementation
   - Database for storing users
   - HTTPS (never use HTTP for auth in production)
   - Proper error handling

Feel free to reach out if you need help with any of these!
