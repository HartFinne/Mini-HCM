import axios from 'axios'

// locally test
// const API_BASE = 'http://localhost:5000/api'

// production
const API_BASE = 'https://mini-hcm-tau.vercel.app/api/auth'

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_BASE}/login`, { email, password });
  return res.data // { token, role }
};

// Register function
export const registerUser = async ({ name, email, password, timezone }) => {
  const res = await axios.post(`${API_BASE}/register`, {
    name,
    email,
    password,
    timezone,
  });
  return res.data;
};
