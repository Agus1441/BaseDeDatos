import React from 'react';

const StudentList = ({ students, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Ci</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Fecha de nacimiento</th>
          <th>Correo Electrónico</th>
          <th>Telefono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index}>
            <td>{student.CI}</td>
            <td>{student.nombre}</td>
            <td>{student.apellido}</td>
            <td>{student.fecha_nacimiento}</td>
            <td>{student.correo}</td>
            <td>{student.telefono}</td>
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
