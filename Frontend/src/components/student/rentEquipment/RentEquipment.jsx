import React, { useEffect, useState } from 'react';
import { postAlquiler, getEquipamientos}  from '../../services/Services';// Importa el servicio actualizado
import { Link } from 'react-router-dom';

const RentEquipment = () => {
    const [equipamientos, setEquipamientos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const fetchEquipamientos = async () => {
            try {
                const data = await getEquipamientos();
                if (data) {
                    setEquipamientos(data);
                } else {
                    setError("No se pudieron cargar los equipamientos.");
                }
            } catch (error) {
                setError("Hubo un error al cargar los equipamientos.");
            } finally {
                setLoading(false);
            }
        };

        fetchEquipamientos();
    }, []);

    const handleAlquilar = async (id) => {
        const alquilerData = { equipamientoId: id }; // Puedes añadir más información según sea necesario
        try {
            const response = await postAlquiler(alquilerData); // Usando el nuevo servicio
            if (response) {
                setMensaje(`Equipamiento ${id} alquilado con éxito.`);
            } else {
                setMensaje(`Error al alquilar el equipamiento ${id}.`);
            }
        } catch (error) {
            setMensaje(`Hubo un error al intentar alquilar el equipamiento ${id}.`);
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Equipamiento Necesario</h2>
            {mensaje && <p>{mensaje}</p>}
            <ul>
                {equipamientos.map((equipamiento) => (
                    <li key={equipamiento.id}>
                        <strong>Nombre:</strong> {equipamiento.nombre} <br />
                        <strong>Descripción:</strong> {equipamiento.descripcion} <br />
                        <strong>Categoría:</strong> {equipamiento.categoria} <br />
                        <button onClick={() => handleAlquilar(equipamiento.id)}>Alquilar</button>
                    </li>
                ))}
            </ul>
            <Link to="/homeStudent"><button>volver</button></Link>
        </div>
    );
};

export default RentEquipment;
