import React, { useEffect, useState } from 'react';
import { getTurnosClases } from '../../services/Services'; // Importa el servicio
import { Link } from 'react-router-dom';

const ClassTurn = () => {
    const [turnos, setTurnos] = useState([]); // Estado para almacenar los turnos
    const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos
    const [error, setError] = useState(null); // Estado para manejar errores

    // useEffect para obtener los datos cuando el componente se monte
    useEffect(() => {
        const fetchTurnos = async () => {
            const data = await getTurnosClases();
            if (data) {
                setTurnos(data); // Almacena los datos en el estado
            } else {
                setError("No se pudieron obtener los turnos.");
            }
            setLoading(false); // Termina el estado de carga
        };

        fetchTurnos();
    }, []); // El array vacío asegura que solo se ejecute una vez al montar el componente

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Turnos Ordenados por Cantidad de Clases Dictadas</h1>
            <table>
                <thead>
                    <tr>
                        <th>Instructor</th>
                        <th>Actividad</th>
                        <th>Cantidad de Clases</th>
                    </tr>
                </thead>
                <tbody>
                    {turnos.map((turno, index) => (
                        <tr key={index}>
                            <td>{turno.instructor}</td>
                            <td>{turno.actividad}</td>
                            <td>{turno.clasesDictadas}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/home"><button>Volver</button></Link>
        </div>
    );
};

export default ClassTurn;
