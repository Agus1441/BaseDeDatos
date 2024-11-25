import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../services/Services';

const handleLogout = async () => {
  await logout();  // Espera a que logout se complete
  navigate("/");   // Luego navega a la página principal
};

const HomeStudent = () => {
  return (
    <div>
      <h1>Bienvenido </h1>
      <div>
        <Link to="/Inscripciones">
          <button>Ver y gestionar inscripciones</button>
        </Link>
        <Link to="/Alquilar">
          <button>Ver y gestionar alquileres</button>
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default HomeStudent;