import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ActivityManagement = () => {
  const [activities, setActivities] = useState([
    { name: 'Snowboard', cost: 100, description: 12 },
    { name: 'Ski', cost: 120, description: 10 },
    { name: 'Moto de nieve', cost: 150, description: 16 }
  ]);

  const [newActivity, setNewActivity] = useState({ name: '', cost: '', description: '' });

  const handleModifyActivity = (activity) => {
    setActivities(activities.map((a) => (a.name === activity.name ? activity : a)));
  };

  const handleAddActivity = () => {
    if (newActivity.name && newActivity.cost && newActivity.description) {
      setActivities([...activities, {
        ...newActivity,
        cost: parseFloat(newActivity.cost),
        description: parseInt(newActivity.description, 10)
      }]);
      setNewActivity({ name: '', cost: '', description: '' });
    }
  };

  const handleDeleteActivity = (name) => {
    setActivities(activities.filter((activity) => activity.name !== name));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>Gestión de Actividades</h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            {activity.name} - Costo: ${activity.cost} - Restricción de edad: {activity.description} años
            <button onClick={() => handleModifyActivity(activity)}>Modificar</button>
            <button onClick={() => handleDeleteActivity(activity.name)}>Borrar</button>
          </li>
        ))}
      </ul>

      <h3>Agregar Nueva Actividad</h3>
      <div>
        <input
          type="text"
          placeholder="Nombre de la actividad"
          name="name"
          value={newActivity.name}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Costo"
          name="cost"
          value={newActivity.cost}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Restricción de edad"
          name="description"
          value={newActivity.description}
          onChange={handleChange}
        />
        <button onClick={handleAddActivity}>Agregar Actividad</button>
      </div>

      <Link to="/home"><button>Volver</button></Link>
    </div>
  );
};

export default ActivityManagement;
