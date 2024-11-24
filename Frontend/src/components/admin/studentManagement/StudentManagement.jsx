import React, { useState, useEffect } from 'react';
import StudentForm from './StudentForm';
import StudentList from './StudentList';
import { getAlumnos, postAlumnos, deleteAlumnos } from '../../services/Services';

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
      setStudents(students.map((s) => (s.CI === editingStudent.CI ? student : s)));
      fetchStudents();
    } else {
      const nuevoAlumno = await postAlumnos(student)
      if(nuevoAlumno){
        setStudents([...students, nuevoAlumno]);
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
