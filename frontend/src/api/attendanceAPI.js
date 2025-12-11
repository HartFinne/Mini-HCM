import axios from 'axios';

const API_BASE = 'http://localhost:5000/api'; // your backend URL

export const punchIn = async (token) => {
  return axios.post(
    `${API_BASE}/attendance/punch-in`,
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
    `${API_BASE}/attendance/punch-out`,
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
  return axios.get(`${API_BASE}/attendance/today-attendance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};