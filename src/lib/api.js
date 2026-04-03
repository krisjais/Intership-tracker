import axios from "axios";
import { loginUser as mockLoginUser, signupUser as mockSignupUser } from "./mockAuth";
import { 
  fetchInternships as mockFetchInternships,
  fetchInternship as mockFetchInternship,
  createInternship as mockCreateInternship,
  updateInternship as mockUpdateInternship,
  deleteInternship as mockDeleteInternship
} from "./mockInternships";

const API_BASE_URL = "http://localhost:5001/api/internships";
const AUTH_API_BASE_URL = "http://localhost:5001/api/auth";

// ====== USING MOCK APIs FOR TESTING ======
export const loginUser = mockLoginUser;
export const signupUser = mockSignupUser;
export const fetchInternships = mockFetchInternships;
export const fetchInternship = mockFetchInternship;
export const createInternship = mockCreateInternship;
export const updateInternship = mockUpdateInternship;
export const deleteInternship = mockDeleteInternship;

// ====== Helper Functions ======
export const logoutUser = async () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

// ====== REAL APIs (Uncomment when backend is ready) ======
/*
export const loginUser = async (email, password) => {
  const res = await axios.post(`${AUTH_API_BASE_URL}/login`, {
    email,
    password,
  });
  return res.data;
};

export const signupUser = async (name, email, password) => {
  const res = await axios.post(`${AUTH_API_BASE_URL}/signup`, {
    name,
    email,
    password,
  });
  return res.data;
};

export const fetchInternships = async () => {
  const token = getAuthToken();
  const res = await axios.get(API_BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const fetchInternship = async (id) => {
  const token = getAuthToken();
  const res = await axios.get(`${API_BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createInternship = async (data) => {
  const token = getAuthToken();
  const res = await axios.post(API_BASE_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateInternship = async (id, data) => {
  const token = getAuthToken();
  const res = await axios.put(`${API_BASE_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteInternship = async (id) => {
  const token = getAuthToken();
  const res = await axios.delete(`${API_BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
*/
