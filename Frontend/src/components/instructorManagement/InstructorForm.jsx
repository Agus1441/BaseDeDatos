import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const InstructorForm = ({ onSubmit, instructorData }) => {
  const [name, setName] = useState(instructorData?.name || '');
  const [email, setEmail] = useState(instructorData?.email || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email });
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
        <label>Correo Electrónico:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Guardar</button>
      <Link to="/">Volver</Link>
    </form>
  );
};

export default InstructorForm;
