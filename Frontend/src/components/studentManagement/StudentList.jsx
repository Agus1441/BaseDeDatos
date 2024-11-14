import React from 'react';

const StudentList = ({ students, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo Electrónico</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index}>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>
              <button onClick={() => onEdit(student)}>Editar</button>
              <button onClick={() => onDelete(student)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentList;
