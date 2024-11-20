import React from 'react';

const ClassList = ({ classes, onEdit, onDelete }) => (
  <div>
    <h3>Lista de Clases</h3>
    <table>
      <thead>
        <tr>
          <th>CI del Instructor</th>
          <th>Capacidad de Alumnos</th>
          <th>Actividad</th>
          <th>Fecha de Inicio</th>
          <th>Fecha de Fin</th>
          <th>Horario</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {classes.map((classItem) => (
          <tr key={classItem.ID}>
            <td>{classItem.CI_Instructor}</td>
            <td>{classItem.Cupos}</td>
            <td>{classItem.ID_Actividad}</td>
            <td>{classItem.Fecha_inicio}</td>
            <td>{classItem.Fecha_fin}</td>
            <td>{classItem.ID_Turno}</td>
            <td>
              <button onClick={() => onEdit(classItem)}>Editar</button>
              <button onClick={() => onDelete(classItem.ID)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ClassList;

