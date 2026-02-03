import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
      console.log('Activities API endpoint:', apiUrl);
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Activities fetched data:', data);
      
      // Handle both paginated (.results) and plain array responses
      const activitiesData = data.results || data;
      setActivities(Array.isArray(activitiesData) ? activitiesData : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center">Loading activities...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      <div className="row">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div key={activity.id || index} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{activity.name || 'Activity'}</h5>
                  <p className="card-text">{activity.description || 'No description'}</p>
                  <small className="text-muted">
                    {activity.date || 'No date'} | {activity.duration || 'No duration'}
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No activities found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activities;