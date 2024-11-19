USE escuela_nieve;

-- Datos para login
INSERT INTO login (CI, correo, contrasena, rol) VALUES
-- Alumnos
(3589321, 'juan.perez@gmail.com', 'juanperez', 'alumno'),
(3928147, 'maria.garcia@hotmail.com', 'mariagarcia', 'alumno'),
(3659271, 'luis.fernandez@yahoo.com', 'luisfernandez', 'alumno'),
(3725891, 'sofia.mendez@outlook.com', 'sofiamendez', 'alumno'),
(3841276, 'carlos.rodriguez@gmail.com', 'carlosrodriguez', 'alumno'),

-- Instructores
(4685239, 'carlos.gonzalez@gmail.com', 'carlosgonzalez', 'instructor'),
(4821947, 'laura.martinez@yahoo.com', 'lauramartinez', 'instructor'),
(4938571, 'miguel.sanchez@hotmail.com', 'miguelsanchez', 'instructor'),

-- Administrador
(5012345, 'admin@escuelanieve.com', 'adminescuela', 'administrativo');

-- Datos para actividades
INSERT INTO actividades (nombre, descripcion, costo, edadRequerida) VALUES
('Snowboard', 'Curso avanzado de snowboard', 2000.00, 12),
('Ski', 'Curso básico de ski', 1500.00, 10),
('Moto de nieve', 'Exploración guiada en moto de nieve', 3000.00, 16);

-- Datos para turnos
INSERT INTO turnos (hora_inicio, hora_fin) VALUES
('09:00:00', '11:00:00'),
('12:00:00', '14:00:00'),
('16:00:00', '18:00:00');

-- Datos para instructores
INSERT INTO instructores (CI, nombre, apellido) VALUES
(4685239, 'Carlos', 'González'),
(4821947, 'Laura', 'Martínez'),
(4938571, 'Miguel', 'Sánchez');

-- Datos para alumnos
INSERT INTO alumnos (CI, nombre, apellido, fecha_nacimiento, correo, telefono) VALUES
(3589321, 'Juan', 'Pérez', '2005-06-15', 'juan.perez@gmail.com', '091234567'),
(3928147, 'María', 'García', '2008-03-10', 'maria.garcia@hotmail.com', '094567890'),
(3659271, 'Luis', 'Fernández', '2003-11-20', 'luis.fernandez@yahoo.com', '099876543'),
(3725891, 'Sofía', 'Méndez', '2006-09-25', 'sofia.mendez@outlook.com', '092345678'),
(3841276, 'Carlos', 'Rodríguez', '2007-12-05', 'carlos.rodriguez@gmail.com', '093456789');

-- Datos para equipamiento
INSERT INTO equipamiento (nombre, descripcion, costo) VALUES
('Esquís', 'Esquís para actividades de ski', 250.00),
('Tabla de snowboard', 'Tabla para actividades de snowboard', 300.00),
('Moto de nieve', 'Moto equipada para recorridos', 500.00);

-- Datos para equipamiento_actividad
INSERT INTO equipamiento_actividad (ID_Equipamiento, ID_Actividad) VALUES
(1, 2), -- Esquís para Ski
(2, 1), -- Tabla para Snowboard
(3, 3); -- Moto para Moto de nieve

-- Datos para clases
INSERT INTO clases (CI_Instructor, ID_Actividad, ID_Turno, Cupos, Fecha_inicio, Fecha_fin) VALUES
(4685239, 1, 1, 10, '2024-12-01', '2024-12-05'), -- Snowboard con Carlos González
(4821947, 2, 2, 8, '2024-12-02', '2024-12-06'), -- Ski con Laura Martínez
(4938571, 3, 3, 6, '2024-12-03', '2024-12-07'); -- Moto de nieve con Miguel Sánchez

-- Datos para alumno_clase
INSERT INTO alumno_clase (ID_Alumno, ID_Clase) VALUES
(3589321, 1), -- Juan Pérez en Snowboard
(3928147, 2), -- María García en Ski
(3659271, 3); -- Luis Fernández en Moto de nieve

-- Datos para alquiler
INSERT INTO alquiler (ID_Alumno, ID_Equipamiento, ID_Clase, Fecha_inicio, Fecha_fin) VALUES
(3589321, 2, 1, '2024-12-01', '2024-12-05'), -- Juan alquiló una tabla para Snowboard
(3928147, 1, 2, '2024-12-02', '2024-12-06'), -- María alquiló esquís para Ski
(3659271, 3, 3, '2024-12-03', '2024-12-07'); -- Luis alquiló moto para Moto de nieve
