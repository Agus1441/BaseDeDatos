import React, { useState, useEffect } from 'react';
import ClassForm from './ClassForm';
import ClassList from './ClassList';
import { getClases, postClases, deleteClase, updateClase } from '../../services/Services';

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [editingClass, setEditingClass] = useState(null);
  const fetchClasses = async () => {
    const fetchedClasses = await getClases();
    if (fetchedClasses) {
      setClasses(fetchedClasses);
    }
  };

  // Cargar clases al montar el componente
  useEffect(() => {
    fetchClasses();
  }, []);

  // Agregar o editar una clase
  const handleAddOrEditClass = async (classData) => {
    if (editingClass) {
      await updateClase(classData);
      fetchClasses();
    } else {
      await postClases(classData);
      fetchClasses();
    }
    setEditingClass(null);
  };

  // Eliminar una clase
  const handleDelete = async (classID) => {
    await deleteClase(classID);
    fetchClasses();
  };

  const handleEdit = (classData) => {
    setEditingClass(classData);
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
