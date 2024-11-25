import React, { useState, useEffect } from 'react';
import StudentForm from './StudentForm';
import StudentList from './StudentList';
import { getAlumnos, postAlumnos, deleteAlumnos, updateAlumnos } from '../../services/Services';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
        const alumnos = await getAlumnos();
        if (alumnos) {
            setStudents(alumnos); // Almacena los datos en el estado
        } else {
            setStudents("No se pudieron obtener los turnos.");
        }
    };

    fetchStudents();
}, []); // El array vacío asegura que solo se ejecute una vez al montar el componente


const handleAddOrEditStudent = async (student) => {
  if (editingStudent) {
    try {
      const updatedStudent = await updateAlumnos(student);
      if (updatedStudent) {
        setStudents(
          students.map((s) =>
            s.CI === editingStudent.CI ? updatedStudent : s
          )
        );
      } else {
        setError('Error al actualizar el estudiante.');
      }
    } catch (err) {
      setError('Error al realizar la operación de edición.');
    }
  } else {
    try {
      const nuevoAlumno = await postAlumnos(student);
      if (nuevoAlumno) {
        setStudents([...students, nuevoAlumno]);
      } else {
        setError('Error al agregar un nuevo estudiante.');
      }
    } catch (err) {
      setError('Error al realizar la operación de registro.');
    }
  }
  setEditingStudent(null);
};

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleDelete = async (student) => {
    const deleted = await deleteAlumnos(student.CI);
    if(deleted){
      setStudents(students.filter((s) => s.CI !== student.CI));
    }else{
      setError('Error al eliminar al estudiante.');
    }
    
  };

  return (
    <div>
      <h2>Gestión de Alumnos</h2>
      <StudentForm onSubmit={handleAddOrEditStudent} studentData={editingStudent}/>
      <StudentList students={students} onDelete={handleDelete} onEdit={handleEdit}/>
    </div>
  );
};

export default StudentManagement;
