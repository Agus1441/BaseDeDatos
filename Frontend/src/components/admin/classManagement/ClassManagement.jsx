import React, { useState } from 'react';
import ClassForm from './ClassForm';
import ClassList from './ClassList';

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [editingClass, setEditingClass] = useState(null);

  const handleAddOrEditClass = (classData) => {
    if (editingClass) {
      setClasses(classes.map((c) => (c.ci === editingClass.ci ? classData : c)));
    } else {
      setClasses([...classes, classData]);
    }
    setEditingClass(null);
  };

  const handleEdit = (classData) => {
    setEditingClass(classData);
  };

  const handleDelete = (classData) => {
    setClasses(classes.filter((c) => c.ci !== classData.ci));
  };

  return (
    <div>
      <h2>Gestión de Clases</h2>
      <ClassForm onSubmit={handleAddOrEditClass} classData={editingClass} />
      <ClassList classes={classes} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default ClassManagement;