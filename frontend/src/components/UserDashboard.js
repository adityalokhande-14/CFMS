import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/UserDashboard.css';

const UserDashboard = () => {
  const [data, setData] = useState({ fines: [], documents: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('/user/data', { headers: { Authorization: `Bearer ${token}` } });
        setData(res.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container dashboard-container">
      <h2 className="text-center">User Dashboard</h2>
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
              {data.fines.map((fine) => (
                <tr key={fine._id}>
                  <td>{fine.fine_type}</td>
                  <td>{fine.fine_amount}</td>
                </tr>
              ))}
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
              {data.documents.map((doc) => (
                <tr key={doc._id}>
                  <td>{doc.document_name}</td>
                  <td>{doc.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default UserDashboard;