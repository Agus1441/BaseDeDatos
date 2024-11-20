import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/Services';

const Home = () => {
  const navigate = useNavigate();
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
        <button onClick={() => {
            logout();
            navigate("/");
          }}>
            Logout
          </button>
      </div>
    </div>
  );
};

export default Home;