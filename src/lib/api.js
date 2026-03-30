import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api/internships";

export const fetchInternships = async () => {
  const res = await axios.get(API_BASE_URL);
  return res.data;
};

export const fetchInternship = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/${id}`);
  return res.data;
};

export const createInternship = async (data) => {
  const res = await axios.post(API_BASE_URL, data);
  return res.data;
};

export const updateInternship = async (id, data) => {
  const res = await axios.put(`${API_BASE_URL}/${id}`, data);
  return res.data;
};

export const deleteInternship = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/${id}`);
  return res.data;
};
