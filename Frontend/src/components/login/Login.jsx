import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ identifier: '', password: '', role: 'student' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isAuthenticated = await onLogin(formData); // Suponiendo que `onLogin` devuelve si la autenticación es correcta

    if (isAuthenticated && formData.role === 'admin') {
      navigate('/home'); // Redirige a la página de inicio si el usuario es un administrador
    } else if (isAuthenticated && formData.role === 'student') {
      
    } else if (isAuthenticated && formData.role === 'instructor') {
      
    }else {
      alert('Error de inicio de sesión. Verifique sus credenciales.');
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <h2>Inicio de Sesión</h2>
        <label>
            Rol:
            <select name="role" value={formData.role} onChange={handleChange}>
            <option value="student">Estudiante</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Administrador</option>
            </select>
        </label>
        <label>
            Gmail:
            <input
            type="email"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            required
            />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Iniciar Sesión</button>
        </form>
        <p>No existe un administrador? Registra uno <Link to='register'>aqui</Link></p>
    </div>
  );
};

export default Login;
