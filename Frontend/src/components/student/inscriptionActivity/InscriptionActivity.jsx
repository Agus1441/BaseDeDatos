import React, { useState, useEffect } from 'react';
import { getActividades, inscribir, desinscribir, getInscripciones } from '../../services/Services'; // Asegúrate de importar los servicios necesarios
import { Link } from 'react-router-dom';

const InscriptionActivity = () => {
  const [actividades, setActividades] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener todas las actividades y las inscripciones del estudiante
  useEffect(() => {
    const fetchData = async () => {
      const actividadesData = await getActividades();
      const inscripcionesData = await getInscripciones();

      if (actividadesData) setActividades(actividadesData);
      if (inscripcionesData) setInscripciones(inscripcionesData);

      setLoading(false);
    };

    fetchData();
  }, []);

  // Función para inscribirse en una actividad
  const handleInscripcion = async (actividadId) => {
    const result = await inscribir({ actividadId });
    if (result) {
      setInscripciones((prev) => [...prev, result]);
    }
  };

  // Función para desinscribirse de una actividad
  const handleDesinscripcion = async (actividadId) => {
    const result = await desinscribir({ actividadId });
    if (result) {
      setInscripciones((prev) => prev.filter((insc) => insc.actividadId !== actividadId));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Actividades Disponibles</h2>
      <div>
        {actividades.length === 0 ? (
          <p>No hay actividades disponibles en este momento.</p>
        ) : (
          <ul>
            {actividades.map((actividad) => {
              const yaInscripto = inscripciones.some((insc) => insc.actividadId === actividad.id);
              return (
                <li key={actividad.id}>
                  <h3>{actividad.nombre}</h3>
                  <p>{actividad.descripcion}</p>
                  <button onClick={() => (yaInscripto ? handleDesinscripcion(actividad.id) : handleInscripcion(actividad.id))}>
                    {yaInscripto ? 'Darse de baja' : 'Inscribirse'}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <Link to="/homeStudent"><button>volver</button></Link>
    </div>
  );
};

export default InscriptionActivity;