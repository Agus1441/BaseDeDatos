import React, { useState } from 'react';
import StudentForm from './StudentForm';
import StudentList from './StudentList';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const handleAddOrEditStudent = (student) => {
    if (editingStudent) {
      setStudents(students.map((s) => (s.ci === editingStudent.ci ? student : s)));
    } else {
      setStudents([...students, student]);
    }
    setEditingStudent(null);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleDelete = (student) => {
    setStudents(students.filter((s) => s.ci !== student.ci));
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
