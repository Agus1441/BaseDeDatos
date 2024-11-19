import React, { useEffect, useState } from 'react';
import { getActividadesIngresos } from '../../services/Services'; // Importa el servicio
import { Link } from 'react-router-dom';

const ActivityImport = () => {
    const [ingresos, setIngresos] = useState([]); // Estado para almacenar los ingresos
    const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos
    const [error, setError] = useState(null); // Estado para manejar errores

    // useEffect para obtener los datos cuando el componente se monte
    useEffect(() => {
        const fetchIngresos = async () => {
            const data = await getActividadesIngresos();
            if (data) {
                setIngresos(data); // Almacena los datos en el estado
            } else {
                setError("No se pudieron obtener los ingresos.");
            }
            setLoading(false); // Termina el estado de carga
        };

        fetchIngresos();
    }, []); // El array vacío asegura que solo se ejecute una vez al montar el componente

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Ingresos por Actividad</h1>
            <table>
                <thead>
                    <tr>
                        <th>Actividad</th>
                        <th>Ingresos</th>
                    </tr>
                </thead>
                <tbody>
                    {ingresos.map((ingreso, index) => (
                        <tr key={index}>
                            <td>{ingreso.actividad}</td>
                            <td>{ingreso.ingresos_totales}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/home"><button>volver</button></Link>
        </div>
    );
};

export default ActivityImport;
