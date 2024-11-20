import React, { useState } from 'react';
import { getActividadesIngresos, getActividadesAlumnos, getTurnosClases, logout } from '../services/Services'; // Importa los servicios
import { Link, useNavigate } from 'react-router-dom';

const Reports = () => {
    const [fechas, setFechas] = useState({ fecha_inicio: '', fecha_fin: '' }); // Estado para las fechas
    const [ingresos, setIngresos] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [loading, setLoading] = useState(false); // Estado de carga
    const [error, setError] = useState(null); // Estado de errores
    const navigate = useNavigate();

    const handleFetchReportes = async () => {
        if (!fechas.fecha_inicio || !fechas.fecha_fin) {
            setError("Por favor, completa ambas fechas.");
            return;
        }
        setError(null); // Limpia cualquier error previo
        setLoading(true); // Inicia el estado de carga

        try {
            const [dataIngresos, dataAlumnos, dataTurnos] = await Promise.all([
                getActividadesIngresos(fechas),
                getActividadesAlumnos(fechas),
                getTurnosClases(fechas),
            ]);

            if (dataIngresos) setIngresos(dataIngresos);
            if (dataAlumnos) setAlumnos(dataAlumnos);
            if (dataTurnos) setTurnos(dataTurnos);
        } catch (err) {
            console.error("Error al obtener los reportes:", err);
            setError("Hubo un problema al cargar los reportes.");
        } finally {
            setLoading(false); // Termina el estado de carga
        }
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setFechas((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Reportes de Actividades</h1>
            <div style={{ marginBottom: '20px' }}>
                <label>
                    Fecha de inicio:
                    <input
                        type="date"
                        name="fecha_inicio"
                        value={fechas.fecha_inicio}
                        onChange={handleDateChange}
                        style={{ marginLeft: '10px', marginRight: '20px' }}
                    />
                </label>
                <label>
                    Fecha de fin:
                    <input
                        type="date"
                        name="fecha_fin"
                        value={fechas.fecha_fin}
                        onChange={handleDateChange}
                        style={{ marginLeft: '10px' }}
                    />
                </label>
                <button onClick={handleFetchReportes} style={{ marginLeft: '20px' }}>
                    Generar Reportes
                </button>
            </div>

            {loading && <div>Cargando reportes...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}

            {!loading && !error && (
                <>
                    <h2>Ingresos por Actividad</h2>
                    <table border="1" cellPadding="10" style={{ marginBottom: '20px' }}>
                        <thead>
                            <tr>
                                <th>Actividad</th>
                                <th>Ingresos Totales</th>
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

                    <h2>Actividades con Más Alumnos</h2>
                    <table border="1" cellPadding="10" style={{ marginBottom: '20px' }}>
                        <thead>
                            <tr>
                                <th>Actividad</th>
                                <th>Alumnos Inscritos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alumnos.map((alumno, index) => (
                                <tr key={index}>
                                    <td>{alumno.actividad}</td>
                                    <td>{alumno.cantidad_alumnos}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2>Turnos con Más Clases</h2>
                    <table border="1" cellPadding="10">
                        <thead>
                            <tr>
                                <th>Turno</th>
                                <th>Cantidad de Clases</th>
                            </tr>
                        </thead>
                        <tbody>
                            {turnos.map((turno, index) => (
                                <tr key={index}>
                                    <td>{turno.turno}</td>
                                    <td>{turno.cantidad_clases}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            <Link to="/home">
                <button style={{ marginTop: '20px' }}>Volver</button>
            </Link>
            <button onClick={() => {
                    logout();
                    navigate("/");
                }}>
                Logout
            </button>
        </div>
    );
};

export default Reports;
