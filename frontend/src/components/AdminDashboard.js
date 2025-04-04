import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/AdminDashboard.css';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [data, setData] = useState({ users: [], fines: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
        const res = await axios.get('/admin/data', { headers: { Authorization: `Bearer ${token}` } });
        setData(res.data);
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', err);
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

  return (
    <div className="container dashboard-container">
      <h2 className="text-center">Admin Dashboard</h2>
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <h3>Users</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Fines</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Fine Type</th>
                <th>Amount (₹)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.fines.map((fine) => (
                <tr key={fine._id}>
                  <td>{fine.reason}</td>
                  <td>{fine.amount}</td>
                  <td>{fine.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;