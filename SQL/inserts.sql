USE escuela_nieve;

-- INSERT en la tabla login
INSERT INTO login (CI, rol, correo, contraseña) VALUES
    (1, 'administrativo', 'admin@correo.com', 'admin123'),
    (2, 'alumno', 'carlos@correo.com', 'carlos123'),
    (3, 'alumno', 'juan@ecorreo.com', 'juan456'),
    (4, 'alumno', 'ana@correo.com', 'ana777'),
    (5, 'instructor', 'lucia@correo.com', 'lucia666'),
    (6, 'instructor', 'martin@correo.com', 'martin555');

-- INSERT en la tabla actividades
INSERT INTO actividades (nombre, descripcion, costo, edadRequerida) VALUES
    ('Ski', 'Esquí en las montañas', 1500.00, 12),
    ('Moto de Nieve', 'Recorrido en moto de nieve', 2000.00, 15),
    ('Snowboard', 'Snowboard extremo', 1500.00, 12);

-- INSERT en la tabla equipamiento
INSERT INTO equipamiento (nombre, descripcion, costo) VALUES
    ('Esquíes', 'Equipo básico de esquí', 400.00),
    ('Casco de Ski', 'Casco para esquí', 500.00),
    ('Casco de Moto de Nieve', 'Casco especial para moto de nieve', 500.00),
    ('Traje de Moto de Nieve', 'Traje térmico para moto de nieve', 800.00),
    ('Tabla de Snowboard', 'Tabla profesional de snowboard', 1000.00),
    ('Casco de Snowboard', 'Casco protector para snowboard', 500.00);

-- INSERT en la tabla equipamiento_actividad
INSERT INTO equipamiento_actividad (ID_Equipamiento, ID_Actividad) VALUES
    (1, 1), -- Esquíes necesarios para Ski
    (2, 1), -- Casco de Ski necesario para Ski
    (3, 2), -- Casco de Moto de Nieve necesario para Moto de Nieve
    (4, 2), -- Traje de Moto de Nieve necesario para Moto de Nieve
    (5, 3), -- Tabla de Snowboard necesaria para Snowboard
    (6, 3); -- Casco de Snowboard necesario para Snowboard

-- INSERT en la tabla instructores
INSERT INTO instructores (CI, nombre, apellido) VALUES
    (5, 'Lucía', 'Martínez'),
    (6, 'Martín', 'Rodríguez');

-- INSERT en la tabla alumnos
INSERT INTO alumnos (CI, nombre, apellido, fecha_nacimiento, correo, telefono) VALUES
    (2, 'Carlos', 'López', '2005-03-15', 'carlos@correo.com', '099123456'),
    (3, 'Juan', 'Torres', '2004-07-22', 'juan@ecorreo.com', '099654321'),
    (4, 'Ana', 'Gómez', '2003-11-30', 'ana@correo.com', '099987654');

-- INSERT en la tabla turnos
INSERT INTO turnos (hora_inicio, hora_fin) VALUES
    ('09:00:00', '11:00:00'),
    ('12:00:00', '14:00:00'),
    ('16:00:00', '18:00:00');

-- INSERT en la tabla clases
INSERT INTO clases (CI_Instructor, ID_Actividad, ID_Turno, Cupos, Fecha_inicio, Fecha_fin) VALUES
    (5, 1, 1, 10, '2024-12-01', '2024-12-05'),
    (6, 2, 2, 8, '2024-12-02', '2024-12-06'),
    (5, 3, 3, 12, '2024-12-03', '2024-12-07');

-- INSERT en la tabla alumno_clase
INSERT INTO alumno_clase (ID_Alumno, ID_Clase) VALUES
    (2, 1), -- Carlos en clase 1 (Ski)
    (3, 1), -- Juan en clase 1 (Ski)
    (4, 2), -- Ana en clase 2 (Moto de Nieve)
    (4, 3), -- Ana en clase 3 (Snowboard)
    (3, 3); -- Juan en clase 3 (Snowboard)

-- INSERT en la tabla alquiler
INSERT INTO alquiler (ID_Alumno, ID_Equipamiento, Fecha_inicio, Fecha_fin) VALUES
    (2, 1, '2024-12-01', '2024-12-05'), -- Carlos alquila Esquíes
    (2, 2, '2024-12-01', '2024-12-05'), -- Carlos alquila Casco de Ski
    (3, 5, '2024-12-03', '2024-12-07'), -- Juan alquila Tabla de Snowboard
    (4, 3, '2024-12-02', '2024-12-06'); -- Ana alquila Casco de Moto de Nieve
