import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registro } from '../services/Services';

const RegisterAdmin = () => {
  const [formData, setFormData] = useState({ CI: 0, correo: '', password: ''});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registro(formData);
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <h2>Registro de Administrador</h2>
      <label>
        CI:
        <input type="number" name="CI" value={formData.CI} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />
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