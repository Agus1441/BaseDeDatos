import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTurnos } from '../../services/Services';

const ClassForm = ({ onSubmit, classData }) => {
  const [ci, setCi] = useState('');
  const [activity, setActivity] = useState('');
  const [schedule, setSchedule] = useState('');
  const [spots, setSpots] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [turnos, setTurnos] = useState([]);

  // Cargar los turnos desde el backend
  useEffect(() => {
    const fetchTurnos = async () => {
      const fetchedTurnos = await getTurnos();
      if (fetchedTurnos) {
        setTurnos(fetchedTurnos);
      }
    };
    fetchTurnos();
  }, []);

  // Prellenar datos en modo edición
  useEffect(() => {
    if (classData) {
      setCi(classData.CI_Instructor || '');
      setSchedule(classData.ID_Turno || '');
    } else {
      setCi('');
      setActivity('');
      setSchedule('');
      setSpots(0);
      setStartDate('');
      setEndDate('');
    }
  }, [classData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = classData
      ? { ID: classData.ID, CI_Instructor: ci, ID_Turno: parseInt(schedule, 10) } // Datos para edición
      : {
          CI_Instructor: ci,
          ID_Actividad: parseInt(activity, 10),
          ID_Turno: parseInt(schedule, 10),
          Cupos: parseInt(spots, 10),
          Fecha_inicio: startDate,
          Fecha_fin: endDate,
        }; // Datos para creación

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{classData ? 'Editar Clase' : 'Crear Nueva Clase'}</h3>

      {/* Campo para seleccionar el CI del instructor */}
      <input
        type="number"
        placeholder="CI del instructor"
        value={ci}
        onChange={(e) => setCi(e.target.value)}
        required
      />

      {/* Campos adicionales para creación */}
      {!classData && (
        <>
          <input
            type="number"
            placeholder="ID de la actividad"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Cupos disponibles"
            value={spots}
            onChange={(e) => setSpots(e.target.value)}
            required
          />
          <label>Fecha de inicio:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <label>Fecha de fin:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </>
      )}

      {/* Selector dinámico para turnos */}
      <label>Horario:</label>
      <select
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
        required
      >
        <option value="">Seleccione un horario</option>
        {turnos.map((turno) => (
          <option key={turno.ID} value={turno.ID}>
            {turno.hora_inicio} - {turno.hora_fin}
          </option>
        ))}
      </select>

      <button type="submit">{classData ? 'Guardar Cambios' : 'Crear Clase'}</button>
      <Link to="/home">
        <button type="button">Volver</button>
      </Link>
    </form>
  );
};

export default ClassForm;
