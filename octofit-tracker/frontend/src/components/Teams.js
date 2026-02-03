import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
      console.log('Teams API endpoint:', apiUrl);
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Teams fetched data:', data);
      
      // Handle both paginated (.results) and plain array responses
      const teamsData = data.results || data;
      setTeams(Array.isArray(teamsData) ? teamsData : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center">Loading teams...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <div className="row">
        {teams.length > 0 ? (
          teams.map((team, index) => (
            <div key={team.id || index} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name || 'Team'}</h5>
                  <p className="card-text">{team.description || 'No description'}</p>
                  <div className="card-footer">
                    <small className="text-muted">
                      Members: {team.member_count || team.members?.length || 0} | 
                      Created: {team.created_at ? new Date(team.created_at).toLocaleDateString() : 'Unknown'}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No teams found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;