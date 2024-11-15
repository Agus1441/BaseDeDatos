import React from 'react';

const ClassList = ({ classes, onEdit, onDelete }) => (
  <div>
    <h3>Lista de Clases</h3>
    <ul>
      {classes.map((classItem, index) => (
        <li key={index}>
          <strong>CI:</strong> {classItem.ci}, <strong>Actividad:</strong> {classItem.activity}, <strong>Horario:</strong> {classItem.schedule}
          <button onClick={() => onEdit(classItem)}>Editar</button>
          <button onClick={() => onDelete(classItem)}>Eliminar</button>
        </li>
      ))}
    </ul>
  </div>
);

export default ClassList;
