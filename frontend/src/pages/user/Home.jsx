import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { punchIn as apiPunchIn, punchOut as apiPunchOut, getTodayAttendance } from '../../api/attendanceAPI';

const Home = () => {
  const { token } = useContext(AuthContext);

  const [attendance, setAttendance] = useState(null); // store today's attendance
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch today's attendance on mount
  useEffect(() => {
    const fetchAttendance = async () => {
      if (!token) return;
      try {
        const res = await getTodayAttendance(token);
        console.log(res)
        setAttendance(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    fetchAttendance();
  }, [token]);

  const handlePunchIn = async () => {
    if (!token) return alert("You are not logged in");
    try {
      const res = await apiPunchIn(token);
      setAttendance(res.data.attendance || { punchIn: new Date() });
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Punch in failed");
    }
  };

  const handlePunchOut = async () => {
    if (!token) return alert("You are not logged in");
    try {
      const res = await apiPunchOut(token);
      setAttendance(res.data.attendance || { punchIn: attendance?.punchIn, punchOut: new Date() });
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Punch out failed");
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '--:--:--';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'No punch';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const isPunchedIn = !!attendance?.punchIn && !attendance?.punchOut;
  const isPunchedOut = !!attendance?.punchOut;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Employee Dashboard</h1>
          <p className="text-gray-600">Manage your daily attendance</p>
        </div>

        {/* Main Punch Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Time Tracking</h2>
            <p className="text-gray-500">{formatDate(new Date())}</p>
          </div>

          {/* Time Display */}
          <div className="bg-linear-to-r from-blue-50 to-blue-100 rounded-lg p-8 mb-8">
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Current Time</p>
              <p className="text-5xl font-bold text-blue-600">{currentTime.toLocaleTimeString()}</p>
            </div>
          </div>

          {/* Punch Status */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-center text-sm text-gray-600 mb-2">Status</p>
            <div className="flex justify-center items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isPunchedOut ? 'bg-green-500' : isPunchedIn ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
              <p className="text-lg font-semibold text-gray-800">
                {isPunchedOut ? 'Completed' : isPunchedIn ? 'Punched In' : 'Punched Out'}
              </p>
            </div>
          </div>

          {/* Punch Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handlePunchIn}
              disabled={isPunchedIn || isPunchedOut}
              className={`py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${isPunchedIn || isPunchedOut
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700 active:scale-95'
                }`}
            >
              Punch In
            </button>
            <button
              onClick={handlePunchOut}
              disabled={!isPunchedIn || isPunchedOut}
              className={`py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${!isPunchedIn || isPunchedOut
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700 active:scale-95'
                }`}
            >
              Punch Out
            </button>
          </div>
        </div>

        {/* Daily Summary Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Daily Summary</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Punch In Time */}
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="text-gray-600 text-sm mb-1">Punch In</p>
              <p className="text-2xl font-bold text-blue-600">{formatTime(attendance?.punchIn)}</p>
              <p className="text-xs text-gray-500 mt-1">{attendance?.punchIn ? 'Recorded' : 'Not yet punched in'}</p>
            </div>

            {/* Punch Out Time */}
            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
              <p className="text-gray-600 text-sm mb-1">Punch Out</p>
              <p className="text-2xl font-bold text-red-600">{formatTime(attendance?.punchOut)}</p>
              <p className="text-xs text-gray-500 mt-1">{attendance?.punchOut ? 'Recorded' : 'Not yet punched out'}</p>
            </div>

            {/* Total Hours */}
            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
              <p className="text-gray-600 text-sm mb-1">Total Hours</p>
              <p className="text-2xl font-bold text-purple-600">
                {attendance?.punchIn && attendance?.punchOut
                  ? (((attendance.punchOut._seconds - attendance.punchIn._seconds) / 3600).toFixed(2))
                  : '0.00'} hrs
              </p>
              <p className="text-xs text-gray-500 mt-1">Regular hours</p>
            </div>

            {/* Overtime */}
            <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
              <p className="text-gray-600 text-sm mb-1">Overtime (OT)</p>
              <p className="text-2xl font-bold text-orange-600">0.00 hrs</p>
              <p className="text-xs text-gray-500 mt-1">Beyond shift</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
