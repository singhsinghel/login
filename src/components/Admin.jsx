import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState('');

 
  useEffect(() => {
    axios.get('https://login-pa5a.onrender.com/api/admin/leads')
      .then((response) => {
        if (response.data.success) {
          setLeads(response.data.leads);
        } else {
          console.log(response);
          
          setError('Failed to fetch leads' +response);
        }
      })
      .catch((error) => setError('Error fetching leads: ' + error.message));
  }, []);

  const deleteLead = (id) => {
    axios.delete(`https://login-pa5a.onrender.com/api/admin/leads/${id}`)
      .then((response) => {
        if (response.data.success) {
          setLeads(leads.filter(lead => lead._id !== id));
          alert('Lead deleted successfully');
        } else {
          alert('Failed to delete lead');
        }
      })
      .catch((error) => alert('Error deleting lead: ' + error.message));
  };

  return (
    <div className="admin-panel container mt-3">
      <h2>Admin Panel</h2>
      {error && <p className="text-danger">{error}</p>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Moving Date</th>
            <th>Moving From</th>
            <th>Moving To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.fullName}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{new Date(lead.movingDate).toLocaleDateString()}</td>
              <td>{lead.movingFrom}</td>
              <td>{lead.movingTo}</td>
              <td>
                <button onClick={() => deleteLead(lead._id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
