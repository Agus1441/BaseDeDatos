import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StudentForm = ({ onSubmit, studentData }) => {
  const [name, setName] = useState(studentData?.name || '');
  const [email, setEmail] = useState(studentData?.email || '');

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

export default StudentForm;
