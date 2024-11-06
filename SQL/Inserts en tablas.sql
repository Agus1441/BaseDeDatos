USE EscuelaNieve;

INSERT INTO login (rol, correo, contraseña) VALUES
                                                ('administrador','admin@correo.com','admin123'),
                                                ('alumno','carlos@correo.com','carlos123'),
                                                ('alumno','juan@ecorreo.com', 'juan456'),
                                                ('alumno', 'ana@correo.com','ana777'),
                                                ('instructor','lucia@correo.com', 'lucia666'),
                                                ('instructor','martin@correo.com','martin555');

INSERT INTO actividades (descripcion, costo) VALUES
                                                 ('Ski', 1500.00),
                                                 ('Moto de Nieve', 2000.00),
                                                 ('Snowboard', 1500.00);

INSERT INTO equipamiento (id_actividad, descripcion, costo) VALUES
                                                                (1, 'Esquíes', 400.00),
                                                                (1, 'Casco de Ski', 500.00),
                                                                (2, 'Casco de Moto de Nieve', 500.00),
                                                                (2, 'Traje de Moto de Nieve', 800.00),
                                                                (3, 'Tabla de Snowboard', 1000.00),
                                                                (3, 'Casco de Snowboard', 500.00);

INSERT INTO instructores (ci, nombre, apellido, correo) VALUES
                                                            ('1234567','Lucía', 'Martínez','lucia@correo.com'),
                                                            ('7654321','Martín', 'Rodríguez', 'martin@correo.com');


INSERT INTO alumnos (ci, nombre, apellido, fecha_nacimiento, correo, telefono) VALUES
                                                                                   ('7321896', 'Carlos', 'López', '2005-03-15','carlos@correo.com','099123456'),
                                                                                   ('6785543', 'Juan', 'Torres', '2004-07-22','juan@ecorreo.com' ,'099654321'),
                                                                                   ('1238976',  'Ana', 'Gómez', '2003-11-30', 'ana@correo.com','099987654');

INSERT INTO turnos (hora_inicio, hora_fin) VALUES
                                               ('09:00:00', '11:00:00'),
                                               ('12:00:00', '14:00:00'),
                                               ('16:00:00', '18:00:00');


INSERT INTO clase (ci_instructor, id_actividad, id_turno) VALUES
                                                              ('1234567',1,1),
                                                              ('7654321',2,2),
                                                              ('1234567',3,3);


INSERT INTO alumno_clase (id_clase, ci_alumno, id_equipamiento) VALUES
                                                                    (1, '7321896', 1),
                                                                    (1, '6785543', 2),
                                                                    (2, '1238976', 3),
                                                                    (1,'1238976',2),
                                                                    (3,'6785543',5);
