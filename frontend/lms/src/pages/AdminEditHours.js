// AdminEditHours.js
import React, { useState, useEffect } from 'react';
import hours from '../components/hours';

function AdminEditHours() {
  const [operatingHours, setOperatingHours] = useState({});

  useEffect(() => {
    setOperatingHours(hours);
  }, []);

  const handleInputChange = (day, event) => {
    setOperatingHours({
      ...operatingHours,
      [day]: event.target.value,
    });
  };

  const handleSave = () => {
    // Save changes to the backend or file system (requires a backend service)
    console.log('Saved Hours:', operatingHours);
  };

  return (
    <div>
      <h2>Edit Library Operating Hours</h2>
      <ul>
        {Object.keys(operatingHours).map((day) => (
          <li key={day}>
            <strong>{day}:</strong>
            <input
              type="text"
              value={operatingHours[day]}
              onChange={(e) => handleInputChange(day, e)}
            />
          </li>
        ))}
      </ul>
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
}

export default AdminEditHours;
