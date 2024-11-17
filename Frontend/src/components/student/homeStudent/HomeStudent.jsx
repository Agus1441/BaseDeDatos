import React from 'react';
import { Link } from 'react-router-dom';

const HomeStudent = () => {
  return (
    <div>
      <h1>Bienvenido </h1>
      <div>
        <Link to="/Inscripciones">
          <button>Ver y gestionar inscripciones</button>
        </Link>
      </div>
    </div>
  );
};

export default HomeStudent;