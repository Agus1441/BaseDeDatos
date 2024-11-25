```markdown
# Proyecto Full-Stack: Gestión de Actividades - Escuela de Nieve

Este proyecto es una aplicación full-stack diseñada para la gestión de actividades, instructores, estudiantes y usuarios en general en una escuela de nieve. Combina un backend robusto con un frontend intuitivo.

## Estructura del Proyecto

### Backend
El backend implementa la lógica de negocio y la conexión con la base de datos para la administración de la escuela de nieve.

#### Archivos principales
- `main.py`: Archivo principal del backend.
- `requirements.txt`: Dependencias necesarias para ejecutar el backend.
- `Dockerfile` y `docker-compose.yaml`: Configuración para la virtualización con Docker.

#### Carpeta SQL
- `schema.sql`: Scripts para crear las tablas de la base de datos.
- `inserts.sql`: Datos iniciales para las tablas.

### Frontend
El frontend está desarrollado con **React.js** para ofrecer una interfaz intuitiva y responsiva.

#### Archivos principales
- `App.jsx`: Componente principal de la aplicación, aquí se definen todas las rutas.
- `main.jsx`: Punto de entrada de la aplicación.

#### Páginas y funcionalidades principales
- `activityManagement`: Gestión de actividades.
- `instructorManagement`: Gestión de instructores.
- `studentManagement`: Gestión de estudiantes.
- `classManagement`: Gestión de clases.
- `login`: Gestión de autenticación.
- `register`: Registro de usuarios.
- `reports`: Reportes sobre el éxito de la escuela.

---

## Instrucciones para ejecutar el Backend

Este proyecto implementa el backend para la administración de la escuela de nieve. Aquí encontrarás los pasos necesarios para configurarlo y ejecutarlo.

### Requisitos previos
Asegúrate de tener instalado en tu máquina:
- **Docker** y **Docker Compose**
- **Python 3.9** o superior
- **Git** para clonar el repositorio

### Pasos para la configuración


# Proyecto Administrativo Escuela de Deportes de Nieve

Este proyecto es una solución completa que incluye un **Backend** con Python y Flask, una **Base de Datos** configurada en MySQL con Docker, y un **Frontend** desarrollado con React.


## Pasos para Configuración y Uso

### 1. Clonar el Repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd BaseDeDatos
```

### 2. Configurar y Levantar el Backend

1. Navega al directorio `Backend`:
   ```bash
   cd Backend
   ```

2. Construye y levanta los servicios usando Docker Compose:
   ```bash
   docker-compose up --build -d
   ```

   Esto:
   - Configura el contenedor de MySQL.
   - Carga el esquema y los datos iniciales en la base de datos.

### 3. Configurar y Levantar el Frontend

1. Navega al directorio `Frontend/src`:
   ```bash
   cd ../Frontend/src
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

   Esto iniciará el frontend en el puerto correspondiente.

---

## Acceso al Proyecto

### Backend
El backend estará disponible en `http://localhost:5000`.

### Frontend
El frontend estará disponible en `http://localhost:5173`.


## Notas

1. Asegúrate de tener Docker y Docker Compose instalados en tu máquina.
2. Para ejecutar el frontend, necesitas tener Node.js y npm instalados.
3. Si tienes problemas con los puertos, verifica los valores en los archivos `docker-compose.yaml` y `package.json` (en el caso del frontend).


¡Listo para usar! 🚀
```
