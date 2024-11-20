import { act } from "react";

// Obtener todas las actividades.
export const getActividades = async () => {
    try {
        const response = await fetch("http://localhost:5000/actividades");
        if (response.ok) {
            let actividades = await response.json();
            console.log(actividades);
            return actividades;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

//Put Modificar una actividad existente.
export const updateActividad = async (data) => {
    try {
        const response = await fetch(`http://localhost:5000/actividades/${data.ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            let updatedActividad = await response.json();
            console.log(updatedActividad);
            return updatedActividad;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

// Post Alquilar equipamiento para un alumno
export const postAlquiler = async (rentData) => {
    try {
        const response = await fetch("http://localhost:5000/alquiler", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rentData)
        });

        let newAlquiler = await response.json();
        if (response.ok) {
            console.log(newAlquiler);
            return newAlquiler;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

//Get Obtener todos los alumnos.
export const getAlumnos = async () => {
    try {
        const response = await fetch("http://localhost:5000/alumnos");
        if (response.ok) {
            let alumnos = await response.json();
            console.log(alumnos);
            return alumnos;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

// Post Crear un nuevo alumno
export const postAlumnos = async (studentData) => {
    try {
        const response = await fetch("http://localhost:5000/alumnos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            let nuevoAlumno = await response.json();
            console.log(nuevoAlumno);
            return nuevoAlumno;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

//Delete Eliminar un alumno por CI
export const deleteAlumnos = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/alumnos/${id}`, { method: 'DELETE' });

        if (response.ok) {
            let deleteAlumno = await response.json();
            console.log(deleteAlumno);
            return deleteAlumno;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

//Put Modificar datos de un alumno por CI
export const updateAlumnos = async (studentData) => {
    try {
        const response = await fetch(`http://localhost:5000/alumnos/${studentData.CI}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            let updatedAlumno = await response.json();
            console.log(updatedAlumno);
            return updatedAlumno;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

//Get Obtener todas las clases.
export const getClases = async () => {
    try {
        const response = await fetch("http://localhost:5000/clases");
        if (response.ok) {
            let clases = await response.json();
            console.log(clases);
            return clases;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

// Post Crear un nueva clase
export const postClases = async (classData) => {
    try {
        const response = await fetch("http://localhost:5000/clases", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(classData)
        });

        if (response.ok) {
            let nuevaClase = await response.json();
            console.log(nuevaClase);
            return nuevaClase;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

//Delete Eliminar una clase por id
export const deleteClase = async (classID) => {
    try {
        const response = await fetch(`http://localhost:5000/clases/${classID}`, { method: 'DELETE' });

        if (response.ok) {
            let deleteClase = await response.json();
            console.log(deleteClase);
            return deleteClase;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

//Put Modificar datos de una clase por id
export const updateClase = async (classData) => {
    try {
        const response = await fetch(`http://localhost:5000/clases/${classData.ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(classData) // Use task directly here
        });

        if (response.ok) {
            let updatedClase = await response.json();
            console.log(updatedClase);
            return updatedClase;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

//Obtener clases dadas por un instructor
export const getClasesInstructor = async (CI_Instructor) => {
    try {
        const response = await fetch(`http://localhost:5000/clases_instructor/${CI_Instructor}`);
        if (response.ok) {
            let claseInstructor = await response.json();
            console.log(claseInstructor);
            return claseInstructor;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

// Desinscribir un alumno de una clase
export const desinscribir = async (data) => {
    try {
        const response = await fetch('http://localhost:5000//desinscribir', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            let desinscribir = await response.json();
            console.log(desinscribir);
            return desinscribir;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

// Inscribir un alumno en una clase
export const inscribir = async (data) => {
    try {
        const response = await fetch('http://localhost:5000//inscribir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            let inscribir = await response.json();
            console.log(inscribir);
            return inscribir;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

//Obtener las inscripciones de un alumno
export const getInscripciones = async (ci_alumno) => {
    try {
        const response = await fetch(`http://localhost:5000/clases_instructor/${ci_alumno}`);
        if (response.ok) {
            let inscripciones = await response.json();
            console.log(inscripciones);
            return inscripciones;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

//Obtener todos los equipamientos.
export const getEquipamientos = async () => {
    try {
        const response = await fetch("http://localhost:5000/equipamientos");
        if (response.ok) {
            let equipamientos = await response.json();
            console.log(equipamientos);
            return equipamientos;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

//Obtener todos los equipamientos requeridos para hacer una actividad.
export const getEquipamientoRequerido = async (id_actividad) => {
    try {
        const response = await fetch(`http://localhost:5000/equipamientos/${id_actividad}`);
        if (response.ok) {
            let equipamiento = await response.json();
            console.log(equipamiento);
            return equipamiento;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

//Obtener todos los instructores
export const getInstructores = async () => {
    try {
        const response = await fetch("http://localhost:5000/instructores");
        if (response.ok) {
            let instructores = await response.json();
            console.log(instructores);
            return instructores;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

//Crear nuevo instructor
export const postInstructor = async (teacherData) => {
    try {
        const response = await fetch("http://localhost:5000/instructores", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(teacherData)
        });

        if (response.ok) {
            let newInstructor = await response.json();
            console.log(newInstructor);
            return newInstructor;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

//Borrar un instructor
export const deleteInstructor = async (teacherCI) => {
    try {
        const response = await fetch(`http://localhost:5000/instructores/${teacherCI}`, { method: 'DELETE' });

        if (response.ok) {
            let deleteInstructor = await response.json();
            console.log(deleteInstructor);
            return deleteInstructor ;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

//Modificar un instructor
export const updateInstructor = async (teacherData) => {
    try {
        const response = await fetch(`http://localhost:5000/instructores/${teacherData.CI}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teacherData)
        });

        if (response.ok) {
            let updatedInstructor = await response.json();
            console.log(updatedInstructor);
            return updatedInstructor;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

export const login = async (loginData) => {
    try {
        const response = await fetch("http://localhost:5000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        });

        let login = await response.json();
        if (response.ok) {
            console.log(login);
            return login;
        } else {
            console.error(`Error: ${login.message}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

export const logout = async () => {
    try {
        localStorage.clear();
        const response = await fetch("http://localhost:5000/logout", { method: 'POST' });
        let logout = await response.json();
        if (response.ok) {
            console.log(logout);
            return logout;
        } else {
            console.error(`Error: ${logout.message}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

export const registro = async (registerData) => {
    try {
        const response = await fetch("http://localhost:5000/registro", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData)
        });

        let registro = await response.json();
        if (response.ok) {
            console.log(registro);
            return registro;
        } else {
            console.error(registro.message);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

export const getTurnos = async () => {
    try {
        const response = await fetch("http://localhost:5000/turnos");
        if (response.ok) {
            let turnos = await response.json();
            console.log(turnos);
            return turnos;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

export const postTurnos = async (turnData) => {
    try {
        const response = await fetch("http://localhost:5000/turnos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(turnData)
        });

        if (response.ok) {
            let newTurnos = await response.json();
            console.log(newTurnos);
            return newTurnos;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

export const deleteTurno = async (turnID) => {
    try {
        const response = await fetch(`http://localhost:5000/turnos/${turnID}`, { method: 'DELETE' });

        if (response.ok) {
            let deleteTurno = await response.json();
            console.log(deleteTurno);
            return deleteTurno;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

export const updateTurno = async (turn) => {
    try {
        const response = await fetch(`http://localhost:5000/turnos/${turn.ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(turn)
        });

        if (response.ok) {
            let updateTurno = await response.json();
            console.log(updateTurno);
            return updateTurno;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

export const getTurnosClases = async (fechas) => {
    try {
        const queryParams = new URLSearchParams(fechas).toString();
        const response = await fetch(`http://localhost:5000/turnos/clases?${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
           
        });
        if (response.ok) {
            let turnos = await response.json();
            console.log(turnos);
            return turnos;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

export const getActividadesIngresos = async (fechas) => {
    try {
        const queryParams = new URLSearchParams(fechas).toString();
        const response = await fetch(`http://localhost:5000/actividades/ingresos?${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            let actIngresos = await response.json();
            console.log(actIngresos);
            return actIngresos;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

export const getActividadesAlumnos = async (fechas) => {
    try {
        const queryParams = new URLSearchParams(fechas).toString();
        const response = await fetch(`http://localhost:5000/actividades/alumnos?${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            let turnos = await response.json();
            console.log(turnos);
            return turnos;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}