import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/Services'

const Login = () => {
  const [formData, setFormData] = useState({ correo: '', password: ''});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authData = await login(formData);
    if (authData){
      console.log(authData)
      localStorage.setItem("CI", authData.CI);
      localStorage.setItem("rol", authData.rol);

      if (authData.rol === 'administrativo') {
        navigate('/home');
      } else if (authData.rol === 'alumno') {
        navigate('/homeStudent');
      } else if (authData.rol === 'instructor') {
        
      }
    }

    else {
      alert('Error de inicio de sesión. Verifique sus credenciales.');
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <h2>Inicio de Sesión</h2>
        <label>
            Gmail:
            <input
            type="email"
            name="correo"
            value={formData.correo}
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
