import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chatbot from './Chatbot'; // Import Chatbot component
import './styles/UserDashboard.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const UserDashboard = () => {
  const [data, setData] = useState({ fines: [], documents: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authorization token missing');
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get('/user/data', { headers: { Authorization: `Bearer ${token}` } });
        setData(res.data);
        console.log('Data fetched:', res.data); // Log the fetched data
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
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/'); // Redirect to the login page
  };

  return (
    <div className="container dashboard-container">
      <h2 className="text-center">User Dashboard</h2>
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button> {/* Add Logout button */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <h3>Pending Fines</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Fine Type</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {data.fines.length > 0 ? (
                data.fines.map((fine) => (
                  <tr key={fine._id}>
                    <td>{fine.reason}</td>
                    <td>{fine.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No fines found</td>
                </tr>
              )}
            </tbody>
          </table>
          <h3>Available Documents</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {data.documents.length > 0 ? (
                data.documents.map((doc) => (
                  <tr key={doc._id}>
                    <td>{doc.document_name}</td>
                    <td>{doc.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No documents found</td>
                </tr>
              )}
            </tbody>
          </table>
          <Chatbot /> {/* Add Chatbot component */}
        </>
      )}
    </div>
  );
};

export default UserDashboard;