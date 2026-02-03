import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
      console.log('Leaderboard API endpoint:', apiUrl);
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Leaderboard fetched data:', data);
      
      // Handle both paginated (.results) and plain array responses
      const leaderboardData = data.results || data;
      setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Points</th>
              <th>Activities</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((entry, index) => (
                <tr key={entry.id || index}>
                  <td>{index + 1}</td>
                  <td>{entry.username || entry.user || 'Unknown User'}</td>
                  <td>{entry.points || entry.score || 0}</td>
                  <td>{entry.activities_count || entry.activities || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No leaderboard data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;