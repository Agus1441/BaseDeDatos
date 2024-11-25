import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../services/Services';

const handleLogout = async () => {
  await logout();
};

const Home = () => {
  return (
    <div>
      <h1>Bienvenido a la Escuela de Deportes de Nieve</h1>
      <div>
        <Link to="/instructors">
          <button>Instructores</button>
        </Link>
        <Link to="/students">
          <button>Alumnos</button>
        </Link>
        <Link to="/activities">
          <button>Actividades</button>
        </Link>
        <Link to="/classes">
          <button>Clases</button>
        </Link>
        <Link to="/reports">
          <button>Reportes</button>
        </Link>
        <Link to="/"><button onClick={handleLogout} >Logout</button></Link>
      </div>
    </div>
  );
};

export default Home;