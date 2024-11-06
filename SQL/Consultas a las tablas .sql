USE EscuelaNieve;

# Actividades que más ingresos generan – se debe sumar el costo de equipamiento
SELECT
    a.descripcion AS nombre_actividad,
    SUM(a.costo + e.costo) AS ingresos_totales
FROM
    actividades a JOIN clase c ON a.id = c.id_actividad
                  JOIN alumno_clase ac ON c.id = ac.id_clase
                  JOIN equipamiento e ON ac.id_equipamiento = e.id
GROUP BY
    a.descripcion
ORDER BY
    ingresos_totales DESC;

# Actividades con más alumnos

SELECT
    a.descripcion AS nombre_actividad,
    COUNT(ac.ci_alumno) AS cantidad_alumnos
FROM
    actividades a JOIN clase c ON a.id = c.id_actividad
                  JOIN alumno_clase ac ON c.id = ac.id_clase
GROUP BY
    a.descripcion
ORDER BY
    cantidad_alumnos DESC;

# Los turnos con más clases dictadas
SELECT a.descripcion AS nombre_actividad,
       t.hora_inicio AS turno_inicio,
       t.hora_fin AS turno_fin,
       COUNT(ac.ci_alumno) AS cantidad_alumnos
FROM actividades a JOIN clase c ON a.id = c.id_actividad
                   JOIN turnos t ON c.id_turno = t.id
                   JOIN alumno_clase ac ON c.id = ac.id_clase
GROUP BY a.descripcion, t.hora_inicio, t.hora_fin
ORDER BY cantidad_alumnos DESC;


