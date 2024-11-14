import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ActivityManagement = () => {
  const [activities, setActivities] = useState([
    { name: 'Snowboard', cost: 100, ageRestriction: 12 },
    { name: 'Ski', cost: 120, ageRestriction: 10 },
    { name: 'Moto de nieve', cost: 150, ageRestriction: 16 }
  ]);

  const handleModifyActivity = (activity) => {
    setActivities(activities.map((a) => (a.name === activity.name ? activity : a)));
  };

  return (
    <div>
      <h2>Gestión de Actividades</h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            {activity.name} - Costo: ${activity.cost} - Restricción de edad: {activity.ageRestriction} años
            <button onClick={() => handleModifyActivity(activity)}>Modificar</button>
          </li>
        ))}
      </ul>
      <Link to="/">
      <button>Volver</button>
      </Link>
    </div>
    
  );
};

export default ActivityManagement;
