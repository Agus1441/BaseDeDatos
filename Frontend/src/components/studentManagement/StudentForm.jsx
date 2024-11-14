import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StudentForm = ({ onSubmit, studentData }) => {
  const [ci, setCI] = useState(studentData?.ci || '');
  const [name, setName] = useState(studentData?.name || '');
  const [lastName, setLastName] = useState(studentData?.lastName || '');
  const [birthDate, setBirthDate] = useState(studentData?.birthDate || '');
  const [email, setEmail] = useState(studentData?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(studentData?.phoneNumber || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ci, name, lastName, birthDate, email, phoneNumber });

    setCI('');
    setName('');
    setLastName('');
    setBirthDate('');
    setEmail('');
    setPhoneNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Ci:</label>
        <input 
          type="text" 
          value={ci} 
          onChange={(e) => setCI(e.target.value)} 
          required 
        />
      </div>
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
        <label>Fecha de nacimiento:</label>
        <input 
          type="date" 
          value={birthDate} 
          onChange={(e) => setBirthDate(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Correo:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Teléfono:</label>
        <input 
          type="tel" 
          value={phoneNumber} 
          onChange={(e) => setPhoneNumber(e.target.value)} 
          pattern="[0-9]{3}[0-9]{3}[0-9]{3}" 
          placeholder="123456789"
          required 
        />
      </div>
      <button type="submit">Guardar</button>
      <Link to="/home"><button>Volver</button></Link>
    </form>
  );
};

export default StudentForm;
