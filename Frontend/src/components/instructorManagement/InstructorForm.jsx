import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock function to simulate existing CIs check
const existingCIs = ['12345678', '87654321']; // Replace with a backend call in a real app

const isUniqueCI = (ci) => {
  return !existingCIs.includes(ci);
};

const InstructorForm = ({ onSubmit, instructorData }) => {
  const [name, setName] = useState(instructorData?.name || '');
  const [lastName, setLastName] = useState(instructorData?.lastName || '');
  const [ci, setCI] = useState(instructorData?.ci || '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isUniqueCI(ci)) {
      setError('El CI ya está en uso. Por favor, ingrese un CI diferente.');
      return;
    }
    setError('');
    onSubmit({ name, ci });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Apellido:</label>
        <input 
          type="text" 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>CI:</label>
        <input 
          type="text" 
          value={ci} 
          onChange={(e) => setCI(e.target.value)} 
          required 
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Guardar</button>
      <Link to="/home"><button>Volver</button></Link>
    </form>
  );
};

export default InstructorForm;
