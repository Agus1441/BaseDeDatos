import React, { useState } from 'react';
import InstructorForm from './InstructorForm';
import InstructorList from './InstructorList';

const InstructorManagement = () => {
  const [instructors, setInstructors] = useState([]);
  const [editingInstructor, setEditingInstructor] = useState(null);

  const handleAddOrEditInstructor = (instructor) => {
    if (editingInstructor) {
      setInstructors(instructors.map((inst) => 
        inst.ci === editingInstructor.ci ? instructor : inst
      ));
    } else {
      setInstructors([...instructors, instructor]);
    }
    setEditingInstructor(null);
  };

  const handleEdit = (instructor) => {
    setEditingInstructor(instructor);
  };

  const handleDelete = (instructor) => {
    setInstructors(instructors.filter((inst) => inst.ci !== instructor.ci));
  };

  return (
    <div>
      <h2>Gestión de Instructores</h2>
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
