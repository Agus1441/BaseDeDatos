import React from 'react';

const InstructorList = ({ instructors, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>ci</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {instructors.map((instructor, index) => (
          <tr key={index}>
            <td>{instructor.name}</td>
            <td>{instructor.email}</td>
            <td>
              <button onClick={() => onEdit(instructor)}>Editar</button>
              <button onClick={() => onDelete(instructor)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InstructorList;
