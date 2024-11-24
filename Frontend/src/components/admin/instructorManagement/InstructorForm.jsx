import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const InstructorForm = ({ onSubmit, instructorData }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [CI, setCI] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  // Sincronizar el estado del formulario con instructorData
  useEffect(() => {
    if (instructorData) {
      setNombre(instructorData.nombre || '');
      setApellido(instructorData.apellido || '');
      setCI(instructorData.CI || '');
      setCorreo(instructorData.correo || '');
      setContrasena(instructorData.contrasena || '');
    }
  }, [instructorData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ CI, nombre, apellido, correo, contrasena });

    // Limpiar formulario tras enviar
    setCI('');
    setNombre('');
    setApellido('');
    setCorreo('');
    setContrasena('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>CI:</label>
        <input 
          type="text" 
          value={CI} 
          onChange={(e) => setCI(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Nombre:</label>
        <input 
          type="text" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Apellido:</label>
        <input 
          type="text" 
          value={apellido} 
          onChange={(e) => setApellido(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Correo:</label>
        <input 
          type="email" 
          value={correo} 
          onChange={(e) => setCorreo(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input 
          type="text" 
          value={contrasena} 
          onChange={(e) => setContrasena(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Guardar</button>
      <Link to="/home"><button type="button">Volver</button></Link>
    </form>
  );
};

export default InstructorForm;
