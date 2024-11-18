//Get Obtener todas las actividades.
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
export const updateActividad = async (task) => {
    try {
        const response = await fetch(`http://localhost:5000/actividades/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task) // Use task directly here
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
export const postAlquiler = async (task) => {
    try {
        const response = await fetch("http://localhost:5000/alquiler", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task) // Assuming alquiler contains the necessary data for the rental
        });

        if (response.ok) {
            let newAlquiler = await response.json();
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
export const postAlumnos = async (task) => {
    try {
        const response = await fetch("http://localhost:5000/alumnos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task) // Assuming alquiler contains the necessary data for the rental
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
export const deleteAlumnos = async (task) => {
    try {
        const response = await fetch(`http://localhost:5000/alumnos/${task.ci}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task) // Use task directly here
        });

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
export const updateAlumnos = async (task) => {
    try {
        const response = await fetch(`http://localhost:5000/alumnos/${task.ci}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task) // Use task directly here
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
export const postClases = async (task) => {
    try {
        const response = await fetch("http://localhost:5000/clases", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task) // Assuming alquiler contains the necessary data for the rental
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
export const deleteClase = async (task) => {
    try {
        const response = await fetch(`http://localhost:5000/clases/${task.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task) // Use task directly here
        });

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
export const updateClase = async (task) => {
    try {
        const response = await fetch(`http://localhost:5000/clases/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task) // Use task directly here
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

//Get
export const getClasesInstructor = async () => {
    try {
        const response = await fetch(`http://localhost:5000/clases_instructor/${ci_instructor}`);
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

// Delete
export const desinscribir = async (task) => {
    try {
        const response = await fetch('http://localhost:5000//desinscribir', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task) // Use task directly here
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

// Post
export const inscribir = async (task) => {
    try {
        const response = await fetch('http://localhost:5000//inscribir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task) // Use task directly here
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

//Get
export const getInscripciones = async () => {
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

//Get Obtener todas los equipamientos.
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

//Get Obtener todas los equipamiento.
export const getEquipamiento = async () => {
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

//Get
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

// Post
export const postInstructor = async (task) => {
    try {
        const response = await fetch("http://localhost:5000/instructores", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task) // Assuming alquiler contains the necessary data for the rental
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

//Delete 
export const deleteInstructor = async (task) => {
    try {
        const response = await fetch(`http://localhost:5000/instructores/${task.ci}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task) // Use task directly here
        });

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

//Put 
export const updateInstructor = async (task) => {
    try {
        const response = await fetch(`http://localhost:5000/instructores/${task.ci}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task) // Use task directly here
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

export const login = async (task) => {
    try {
        const response = await fetch("http://localhost:5000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task) // Assuming alquiler contains the necessary data for the rental
        });

        if (response.ok) {
            let login = await response.json();
            console.log(login);
            return login;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

export const logout = async (task) => {
    try {
        const response = await fetch("http://localhost:5000/logout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task) // Assuming alquiler contains the necessary data for the rental
        });

        if (response.ok) {
            let logout = await response.json();
            console.log(logout);
            return logout;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

export const registro = async (task) => {
    try {
        const response = await fetch("http://localhost:5000/registro", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task) // Assuming alquiler contains the necessary data for the rental
        });

        if (response.ok) {
            let registro = await response.json();
            console.log(registro);
            return registro;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
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

export const postTurnos = async (task) => {
    try {
        const response = await fetch("http://localhost:5000/turnos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task) // Assuming alquiler contains the necessary data for the rental
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

export const deleteTurno = async (task) => {
    try {
        const response = await fetch(`http://localhost:5000/turnos/${task.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task) // Use task directly here
        });

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

export const updateTurno = async (task) => {
    try {
        const response = await fetch(`http://localhost:5000/turnos/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task) // Use task directly here
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