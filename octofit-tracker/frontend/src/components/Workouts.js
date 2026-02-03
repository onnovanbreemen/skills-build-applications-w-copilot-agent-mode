import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
      console.log('Workouts API endpoint:', apiUrl);
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Workouts fetched data:', data);
      
      // Handle both paginated (.results) and plain array responses
      const workoutsData = data.results || data;
      setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <div className="row">
        {workouts.length > 0 ? (
          workouts.map((workout, index) => (
            <div key={workout.id || index} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.name || workout.title || 'Workout'}</h5>
                  <p className="card-text">{workout.description || 'No description'}</p>
                  <div className="card-text">
                    <strong>Duration:</strong> {workout.duration || 'N/A'} minutes<br/>
                    <strong>Difficulty:</strong> {workout.difficulty || 'N/A'}<br/>
                    <strong>Category:</strong> {workout.category || 'N/A'}
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">
                      Created: {workout.created_at ? new Date(workout.created_at).toLocaleDateString() : 'Unknown'}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No workouts found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts;