import React, { useState,useEffect} from 'react';
import { Link } from 'react-router-dom';

const StudentForm = ({ onSubmit, studentData }) => {
  const [CI, setCI] = useState(studentData?.CI || '');
  const [nombre, setName] = useState(studentData?.nombre || '');
  const [apellido, setLastName] = useState(studentData?.apellido || '');
  const [fecha_nacimiento, setBirthDate] = useState(studentData?.fecha_nacimiento || '');
  const [correo, setEmail] = useState(studentData?.correo || '');
  const [telefono, setPhoneNumber] = useState(studentData?.telefono || '');
  const [contrasena, setContrasena] = useState(studentData?.contrasena || '');

  useEffect(() => {
    if(studentData){
      setName(studentData.nombre || '');
      setLastName(studentData.apellido || '');
      setCI(studentData.CI || '');
      setEmail(studentData.correo || '');
      setContrasena(studentData.contrasena || '');
      setPhoneNumber(studentData.telefono || '');
      setBirthDate(studentData.fecha_nacimiento || '');
    }
  }, [studentData])

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ CI, nombre, apellido, fecha_nacimiento, correo, telefono, contrasena });

    setCI('');
    setName('');
    setLastName('');
    setBirthDate('');
    setEmail('');
    setPhoneNumber('');
    setContrasena('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Ci:</label>
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
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Apellido:</label>
        <input 
          type="text" 
          value={apellido} 
          onChange={(e) => setLastName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Fecha de nacimiento:</label>
        <input 
          type="date" 
          value={fecha_nacimiento} 
          onChange={(e) => setBirthDate(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Correo:</label>
        <input 
          type="email" 
          value={correo} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Teléfono:</label>
        <input 
          type="tel" 
          value={telefono} 
          onChange={(e) => setPhoneNumber(e.target.value)} 
          pattern="[0-9]{3}[0-9]{3}[0-9]{3}" 
          placeholder="123456789"
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
      <Link to="/home"><button>Volver</button></Link>
    </form>
  );
};

export default StudentForm;
