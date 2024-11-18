import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Bienvenido a la Escuela de Deportes de Nieve</h1>
      <div>
        <Link to="/instructors">
          <button>Ver y gestionar instructores</button>
        </Link>
        {/* Aquí puedes agregar más botones para otras páginas */}
        <Link to="/students">
          <button>Ver y gestionar alumnos</button>
        </Link>
        <Link to="/activities">
          <button>Ver y gestionar actividades</button>
        </Link>
        <Link to="/classes">
          <button>Ver y gestionar clases</button>
        </Link>
        <Link to="/TurnoClase">
          <button>Ver las clases</button>
        </Link>
        <Link to="/ImporteActividad">
          <button>Ver importe de actividad</button>
        </Link>
        <Link to="/ActividadesEstudiante">
          <button>Atividades para Estudiantes</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;