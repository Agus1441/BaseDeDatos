import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterAdmin = ({ onRegister }) => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'admin' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <h2>Registro de Administrador</h2>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>
        Contraseña:
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </label>
      <button type="submit">Registrar</button>
      <Link to='/'><button>volver</button></Link>
    </form>
    
    </div>
  );
};

export default RegisterAdmin;