# Authentication Implementation Guide

## Overview
This document explains the authentication system implemented for the Internship Tracker application. Users are now required to log in or sign up before accessing the dashboard.

## Architecture

### Frontend Components Created

#### 1. **Login Page** (`src/app/login/page.js`)
- Full-featured login/signup page
- Toggles between login and signup modes
- Handles form validation and submission
- Shows loading states and error messages using toast notifications
- Redirects authenticated users to `/dashboard`

#### 2. **Auth Context** (`src/lib/authContext.js`)
- Manages global authentication state
- Provides `useAuth()` hook for accessing auth state and methods
- Tracks: `user`, `isAuth`, `isLoading`, `login()`, `logout()`
- Stores credentials in localStorage and sets auth cookie

#### 3. **API Functions** (`src/lib/api.js`)
- Updated with authentication endpoints:
  - `loginUser(email, password)` - Login with credentials
  - `signupUser(name, email, password)` - Create new account
  - `getCurrentUser()` - Get stored user info from localStorage
  - `getAuthToken()` - Get stored auth token
  - `isAuthenticated()` - Check if user is logged in
- All internship API calls now include `Authorization: Bearer {token}` header

#### 4. **Middleware** (`middleware.js`)
- Protects routes requiring authentication
- Redirects unauthenticated users from `/dashboard` and `/internships` to `/login`
- Redirects authenticated users away from `/login` to `/dashboard`
- Runs on: `/`, `/dashboard`, `/login`, `/internships`

#### 5. **Updated Components**
- **Home Page** (`src/app/page.js`): Now checks auth state and redirects appropriately
- **AppLayout** (`src/components/AppLayout.js`): 
  - Hides navigation on login page
  - Shows user info and logout button
  - Logout button on both desktop and mobile
- **Root Layout** (`src/app/layout.js`): Wraps app with `AuthProvider`

## User Flow

1. **First Visit**
   - User lands on `/`
   - Home page checks auth state
   - If not authenticated → Redirected to `/login`
   - If authenticated → Redirected to `/dashboard`

2. **Login/Signup**
   - User fills in credentials on login page
   - Form submits to your backend API
   - Backend returns: `{ token: string, user: { id, name, email } }`
   - Token and user data stored in localStorage
   - Auth cookie set for middleware
   - User redirected to `/dashboard`

3. **Authenticated Access**
   - All API requests include auth token in header
   - Middleware verifies token
   - Users can log out via button in sidebar/mobile menu

4. **Logout**
   - Clears localStorage and auth cookie
   - Redirects to `/login`
   - All protected routes become inaccessible

## Backend Requirements

Your backend API needs to implement these endpoints:

### POST `/api/auth/login`
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** (200 OK)
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

### POST `/api/auth/signup`
**Request:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** (200 OK)
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

### Updated: GET/POST/PUT/DELETE `/api/internships`
All requests should now include the Authorization header:
```
Authorization: Bearer {token}
```

Your backend should:
1. Validate the JWT token
2. Extract user ID from token
3. Only return/modify internships belonging to that user

## How to Customize

### Change API Base URLs
Edit `src/lib/api.js`:
```javascript
const API_BASE_URL = "http://localhost:5001/api/internships";
const AUTH_API_BASE_URL = "http://localhost:5001/api/auth";
```

### Add More Protected Routes
Edit `middleware.js` and add to `protectedRoutes` array:
```javascript
const protectedRoutes = ["/dashboard", "/internships", "/new-route"];
```

### Customize Login Page
Edit `src/app/login/page.js` to:
- Change colors, styling, layout
- Add terms of service acceptance
- Add additional input fields
- Change success/error messages

### Change Session Storage
To use cookies instead of localStorage:
- Update `authContext.js` login/logout methods
- Update `api.js` helper functions to check cookies instead

## Important Notes

1. **Token Storage**: Currently using localStorage which is vulnerable to XSS. For production:
   - Use httpOnly cookies set by backend
   - Implement CSRF protection
   - Consider using secure authentication libraries

2. **Password Security**: Frontend should use HTTPS in production
   - Never store passwords in localStorage
   - Always hash passwords on backend

3. **Token Expiration**: Consider:
   - Setting token expiration time
   - Implementing refresh token flow
   - Automatically logging out on token expiration

4. **Error Handling**: Currently shows backend error messages. Consider:
   - Sanitizing error messages for security
   - More granular error codes instead of messages
   - Special handling for expired tokens

## Testing the Implementation

1. Start your backend server (ensure it's running on `http://localhost:5001`)
2. Start the Next.js dev server: `npm run dev`
3. Visit `http://localhost:3000`
4. You should be redirected to `/login`
5. Sign up with test credentials or log in if you have an account
6. After successful login, you should see the dashboard
7. Test the logout button to verify the flow

## Troubleshooting

**Issue: Stay on login page after submitting**
- Check browser console for API errors
- Verify backend is running
- Check that backend returns correct response format

**Issue: Logged out after page refresh**
- localStorage might be cleared
- Check cookie settings in AppLayout
- Verify auth data is being stored correctly

**Issue: Can't access protected routes**
- Check middleware.js configuration
- Verify auth token is stored
- Check browser console for middleware errors

## Files Modified/Created

Created:
- `src/lib/authContext.js` - Auth state management
- `src/app/login/page.js` - Login/signup page
- `middleware.js` - Route protection

Modified:
- `src/lib/api.js` - Added auth functions
- `src/app/page.js` - Auth-aware home page
- `src/app/layout.js` - Added AuthProvider
- `src/components/AppLayout.js` - Added logout and user info
