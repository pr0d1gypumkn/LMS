import React, { useEffect, useState } from 'react';

const LibraryHours = () => {
  const [hours, setHours] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/path/to/hours.json')
      .then(response => response.json())
      .then(data => {
        setHours(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the hours:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Library Hours of Operation</h1>
      <ul>
        {Object.entries(hours).map(([day, time]) => (
          <li key={day}>
            <strong>{day}:</strong> {time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LibraryHours;
