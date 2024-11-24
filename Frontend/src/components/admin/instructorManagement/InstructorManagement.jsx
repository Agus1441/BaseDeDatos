import React, { useState, useEffect } from 'react';
import InstructorForm from './InstructorForm';
import InstructorList from './InstructorList';
import { getInstructores, postInstructor, deleteInstructor, updateInstructor } from '../../services/Services';

const InstructorManagement = () => {
  const [instructors, setInstructors] = useState([]);
  const [editingInstructor, setEditingInstructor] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInstructors = async () => {
      const data = await getInstructores();
      if (data){
        setInstructors(data);
      } 
      else {
        setError('Error al cargar los instructores.');
      }
    };
    fetchInstructors();
  }, []);

  const handleAddOrEditInstructor = async (instructor) => {
  if (editingInstructor) {
    // Actualizar instructor
    const updated = await updateInstructor(instructor);
    if (updated) {
      setInstructors(instructors.map((inst) =>
        inst.CI === editingInstructor.CI ? updated : inst
      ));
      setEditingInstructor(null);
    } else {
      setError('Error al actualizar el instructor.');
    }
  } else {
    // Crear nuevo instructor
    const newInstructor = await postInstructor(instructor);
    if (newInstructor) {
      setInstructors((prevInstructors) => [...prevInstructors, newInstructor]);
    } else {
      setError('Error al agregar el instructor.');
    }
  }
};

  const handleEdit = (instructor) => {
    setEditingInstructor(instructor);
  };

  const handleDelete = async (instructor) => {
    const deleted = await deleteInstructor(instructor.CI);
    if (deleted) {
      setInstructors(instructors.filter((inst) => inst.CI !== instructor.CI));
    } else {
      setError('Error al eliminar el instructor.');
    }
  };

  return (
    <div>
      <h2>Gestión de Instructores</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <InstructorForm 
        onSubmit={handleAddOrEditInstructor} 
        instructorData={editingInstructor} 
      />
      <InstructorList 
        instructors={instructors} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default InstructorManagement;
