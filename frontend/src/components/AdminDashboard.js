import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/AdminDashboard.css';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authorization token missing');
        setLoading(false);
        return;
      }
      try {
        console.log("Fetching admin data...");
        const res = await axios.get('/admin/data', { headers: { Authorization: `Bearer ${token}` } });
        console.log("Admin data fetched:", res.data);
        setUsers(res.data.users);
      } catch (err) {
        console.error("Error fetching data:", err.response || err.message || err);
        setError(err.response?.data?.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleResetFines = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authorization token missing');
      return;
    }
    try {
      console.log("Resetting fines...");
      const res = await axios.post(
        '/admin/fines/reset', // Backend endpoint to reset fines
        {}, // No request body required
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Fines reset response:", res.data);

      setMessage(res.data.message); // Display success message
      setError(''); // Clear any existing errors

      // Refresh admin data to reflect the reset status
      const updatedRes = await axios.get('/admin/data', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(updatedRes.data.users);
    } catch (err) {
      console.error("Error resetting fines:", err.response || err.message || err);
      setError(err.response?.data?.message || 'Failed to reset fines');
      setMessage(''); // Clear any success messages
    }
  };

  return (
    <div className="container dashboard-container">
      <h2 className="text-center">Admin Dashboard</h2>
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      <button className="btn btn-warning" onClick={handleResetFines}>
        Reset All Fines to Unpaid
      </button>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Fine Type</th>
              <th>Amount (₹)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) =>
              user.fines.length > 0 ? (
                user.fines.map((fine, index) => (
                  <tr key={fine._id || `${user._id}-${index}`}>
                    {index === 0 && (
                      <td rowSpan={user.fines.length}>{user.name}</td>
                    )}
                    <td>{fine.reason}</td>
                    <td>{fine.amount > 0 ? `₹${fine.amount}` : "No fines"}</td>
                    <td>{fine.status || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>No fines</td>
                  <td>0</td>
                  <td>N/A</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;