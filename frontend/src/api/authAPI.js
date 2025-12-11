import axios from 'axios'

const API_BASE = 'http://localhost:5000/api'

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
  return res.data // { token, role }
};

// Register function
export const registerUser = async ({ name, email, password, timezone }) => {
  const res = await axios.post(`${API_BASE}/auth/register`, {
    name,
    email,
    password,
    timezone,
  });
  return res.data;
};
