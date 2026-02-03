import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
      console.log('Users API endpoint:', apiUrl);
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Users fetched data:', data);
      
      // Handle both paginated (.results) and plain array responses
      const usersData = data.results || data;
      setUsers(Array.isArray(usersData) ? usersData : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center">Loading users...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      <div className="row">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div key={user.id || index} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{user.username || user.name || 'User'}</h5>
                  <p className="card-text">
                    <strong>Email:</strong> {user.email || 'No email'}<br/>
                    <strong>First Name:</strong> {user.first_name || 'N/A'}<br/>
                    <strong>Last Name:</strong> {user.last_name || 'N/A'}
                  </p>
                  <div className="card-footer">
                    <small className="text-muted">
                      Joined: {user.date_joined ? new Date(user.date_joined).toLocaleDateString() : 'Unknown'} |
                      Active: {user.is_active ? 'Yes' : 'No'}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No users found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;