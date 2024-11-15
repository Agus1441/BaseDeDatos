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
            <td>{student.ci}</td>
            <td>{student.name}</td>
            <td>{student.lastName}</td>
            <td>{student.birthDate}</td>
            <td>{student.email}</td>
            <td>{student.phoneNumber}</td>
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
