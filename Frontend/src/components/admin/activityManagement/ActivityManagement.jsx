import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateActividad, getActividades } from '../../services/Services';

const ActivityManagement = () => {
  const [activities, setActivities] = useState([]);
  const [editingActivity, setEditingActivity] = useState(null);
  const [editData, setEditData] = useState({
    ID: '',
    nombre: '',
    costo: '',
    descripcion: '',
  });

  const fetchActividades = async () => {
    setActivities(await getActividades());
  };

  const handleModifyActivity = async () => {
    await updateActividad(editData);
    setEditingActivity(null);
    fetchActividades();
  };

  const startEditing = (activity) => {
    setEditingActivity(activity);
    setEditData({
      ID: activity.ID,
      nombre: activity.nombre,
      costo: activity.costo,
      descripcion: activity.descripcion,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchActividades();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Gestión de Actividades</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {activities.map((activity) => (
          <li
            key={activity.ID}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              marginBottom: '16px',
              padding: '16px',
            }}
          >
            {editingActivity?.ID === activity.ID ? (
              <div>
                <label>
                  Nombre:
                  <input
                    type="text"
                    name="nombre"
                    value={editData.nombre}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Costo:
                  <input
                    type="number"
                    name="costo"
                    value={editData.costo}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Descripción:
                  <textarea
                    name="descripcion"
                    value={editData.descripcion}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <button onClick={handleModifyActivity} style={{ marginRight: '8px' }}>
                  Guardar
                </button>
                <button onClick={() => setEditingActivity(null)}>Cancelar</button>
              </div>
            ) : (
              <div>
                <strong>{activity.nombre}</strong> <br />
                - Costo: ${activity.costo} <br />
                - Restricción de edad: {activity.edadRequerida} años <br />
                - Descripción: {activity.descripcion} <br />
                <button onClick={() => startEditing(activity)}>Modificar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <Link to="/home">
        <button style={{ marginTop: '20px' }}>Volver</button>
      </Link>
    </div>
  );
};

export default ActivityManagement;

