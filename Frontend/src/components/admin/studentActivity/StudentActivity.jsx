import React, { useEffect, useState } from 'react';
import { getActividadesAlumnos } from '../../services/Services'; // Importa el servicio
import { Link } from 'react-router-dom';

const StudentActivity = () => {
    const [actividadesAlumnos, setActividadesAlumnos] = useState([]); // Estado para almacenar las actividades y alumnos
    const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos
    const [error, setError] = useState(null); // Estado para manejar errores

    // useEffect para obtener los datos cuando el componente se monte
    useEffect(() => {
        const fetchActividadesAlumnos = async () => {
            const data = await getActividadesAlumnos();
            if (data) {
                // Ordena los datos por la cantidad de alumnos inscritos de mayor a menor
                const sortedData = data.sort((a, b) => b.alumnosInscritos - a.alumnosInscritos);
                setActividadesAlumnos(sortedData); // Almacena los datos ordenados en el estado
            } else {
                setError("No se pudieron obtener las actividades y los alumnos.");
            }
            setLoading(false); // Termina el estado de carga
        };

        fetchActividadesAlumnos();
    }, []); // El array vacío asegura que solo se ejecute una vez al montar el componente

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Actividades Ordenadas por Cantidad de Alumnos Inscritos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Actividad</th>
                        <th>Alumnos Inscritos</th>
                    </tr>
                </thead>
                <tbody>
                    {actividadesAlumnos.map((actividad, index) => (
                        <tr key={index}>
                            <td>{actividad.actividad}</td>
                            <td>{actividad.alumnosInscritos}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/home"><button>volver</button></Link>
        </div>
    );
};

export default StudentActivity;
