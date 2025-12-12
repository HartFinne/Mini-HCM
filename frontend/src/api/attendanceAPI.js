import axios from 'axios';

// const API_BASE = 'http://localhost:5000/api'; // your backend URL

const API_BASE = 'https://mini-hcm-tau.vercel.app/api/attendance'

export const punchIn = async (token) => {
  return axios.post(
    `${API_BASE}/punch-in`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const punchOut = async (token) => {
  return axios.post(
    `${API_BASE}/punch-out`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


// Get Today's Attendance
export const getTodayAttendance = async (token) => {
  return axios.get(`${API_BASE}/today-attendance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};