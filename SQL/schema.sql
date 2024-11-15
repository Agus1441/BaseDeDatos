DROP DATABASE IF EXISTS escuela_nieve;
CREATE DATABASE escuela_nieve DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE escuela_nieve;

-- Tabla de login
CREATE TABLE login (
    CI INT PRIMARY KEY,
    correo VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    rol ENUM('alumno', 'instructor', 'administrativo') NOT NULL
);

-- Tabla de actividades
CREATE TABLE actividades (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    costo DECIMAL(10, 2) NOT NULL,
    edadRequerida INT NOT NULL
);

-- Tabla de equipamiento
CREATE TABLE equipamiento (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    costo DECIMAL(10, 2) NOT NULL
);

-- Tabla intermedia entre equipamiento y actividades
CREATE TABLE equipamiento_actividad (
    ID_Equipamiento INT NOT NULL,
    ID_Actividad INT NOT NULL,
    PRIMARY KEY (ID_Equipamiento, ID_Actividad),
    FOREIGN KEY (ID_Equipamiento) REFERENCES equipamiento(ID) ON DELETE CASCADE,
    FOREIGN KEY (ID_Actividad) REFERENCES actividades(ID) ON DELETE CASCADE
);

-- Tabla de instructores
CREATE TABLE instructores (
    CI INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    FOREIGN KEY (CI) REFERENCES login(CI) ON DELETE CASCADE
);

-- Tabla de turnos
CREATE TABLE turnos (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    CHECK (hora_inicio < hora_fin)
);

-- Tabla de alumnos
CREATE TABLE alumnos (
    CI INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE,
    telefono VARCHAR(20) NOT NULL,
    CHECK (fecha_nacimiento < CURRENT_DATE),
    FOREIGN KEY (CI) REFERENCES login(CI) ON DELETE CASCADE
);

-- Tabla de clases
CREATE TABLE clases (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    CI_Instructor INT NOT NULL,
    ID_Actividad INT NOT NULL,
    ID_Turno INT NOT NULL,
    Cupos INT NOT NULL,
    Fecha_inicio DATE NOT NULL,
    Fecha_fin DATE NOT NULL,
    FOREIGN KEY (CI_Instructor) REFERENCES instructores(CI) ON DELETE CASCADE,
    FOREIGN KEY (ID_Actividad) REFERENCES actividades(ID) ON DELETE CASCADE,
    FOREIGN KEY (ID_Turno) REFERENCES turnos(ID) ON DELETE CASCADE
);

-- Tabla intermedia alumno_clase
CREATE TABLE alumno_clase (
    ID_Alumno INT NOT NULL,
    ID_Clase INT NOT NULL,
    PRIMARY KEY (ID_Alumno, ID_Clase),
    FOREIGN KEY (ID_Alumno) REFERENCES alumnos(CI) ON DELETE CASCADE,
    FOREIGN KEY (ID_Clase) REFERENCES clases(ID) ON DELETE CASCADE
);

-- Tabla de alquiler
CREATE TABLE alquiler (
    ID_Alquiler INT AUTO_INCREMENT PRIMARY KEY,
    ID_Alumno INT NOT NULL,
    ID_Equipamiento INT NOT NULL,
    ID_Clase INT DEFAULT NULL,
    Fecha_inicio DATE NOT NULL,
    Fecha_fin DATE NOT NULL,
    CHECK (Fecha_inicio < Fecha_fin),
    FOREIGN KEY (ID_Alumno) REFERENCES alumnos(CI) ON DELETE CASCADE,
    FOREIGN KEY (ID_Equipamiento) REFERENCES equipamiento(ID) ON DELETE CASCADE,
    FOREIGN KEY (ID_Clase) REFERENCES clases(ID) ON DELETE SET NULL
);



