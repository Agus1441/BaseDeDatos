import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ClassForm = ({ onSubmit, classData }) => {
  const [ci, setCi] = useState('');
  const [activity, setActivity] = useState('');
  const [schedule, setSchedule] = useState('');

  useEffect(() => {
    if (classData) {
      setCi(classData.ci);
      setActivity(classData.activity);
      setSchedule(classData.schedule);
    }
  }, [classData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ci, activity, schedule });
    setCi('');
    setActivity('');
    setSchedule('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="CI del instructor" value={ci} onChange={(e) => setCi(e.target.value)} required />
      <input type="text" placeholder="Nombre de la actividad" value={activity} onChange={(e) => setActivity(e.target.value)} required />
      <select value={schedule} onChange={(e) => setSchedule(e.target.value)} required>
        <option value="">Seleccione un horario</option>
        <option value="9:00 - 11:00">De 9:00 a 11:00</option>
        <option value="12:00 - 14:00">De 12:00 a 14:00</option>
        <option value="16:00 - 18:00">De 16:00 a 18:00</option>
      </select>
      <button type="submit">{classData ? 'Editar Clase' : 'Agregar Clase'}</button>
      <Link to="/home"><button>Volver</button></Link>
    </form>
  );
};

export default ClassForm;
