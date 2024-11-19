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
- `Creacion de Tablas.sql`: Scripts para crear las tablas de la base de datos.
- `Consultas a las tablas.sql`: Ejemplos de consultas SQL.
- `Inserts en tablas.sql`: Datos iniciales para las tablas.

### Frontend
El frontend está desarrollado con **React.js** para ofrecer una interfaz intuitiva y responsiva.

#### Archivos principales
- `App.jsx`: Componente principal de la aplicación.
- `main.jsx`: Punto de entrada de la aplicación.
- `vite.config.js`: Configuración para el entorno de desarrollo con Vite.

#### Componentes organizados en carpetas por funcionalidad
- `activityManagement`: Gestión de actividades.
- `instructorManagement`: Gestión de instructores.
- `studentManagement`: Gestión de estudiantes.
- `login`: Gestión de autenticación.
- `register`: Registro de usuarios.

---

## Instrucciones para ejecutar el Backend

Este proyecto implementa el backend para la administración de la escuela de nieve. Aquí encontrarás los pasos necesarios para configurarlo y ejecutarlo.

### Requisitos previos
Asegúrate de tener instalado en tu máquina:
- **Docker** y **Docker Compose**
- **Python 3.9** o superior
- **Git** para clonar el repositorio

### Pasos para la configuración

1. **Clonar el repositorio**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>
   ```

2. **Configurar el entorno de Docker**
   El proyecto incluye un archivo `docker-compose.yaml` configurado para levantar una instancia de MySQL. Asegúrate de que Docker esté corriendo y luego ejecuta:
   ```bash
   docker-compose up -d
   ```
   Esto creará y levantará el contenedor de la base de datos.

3. **Crear la base de datos**
   Con el contenedor de MySQL corriendo, crea la base de datos ejecutando el script de inicialización:
   ```bash
   docker exec -it escuela_nieve_db bash
   mysql -u root -p
   ```
   Ingresa la contraseña configurada en el archivo `docker-compose.yaml` (por defecto es `root`). Luego ejecuta:
   ```sql
   CREATE DATABASE escuela_nieve;
   USE escuela_nieve;
   SOURCE /path/to/your/schema.sql;
   ```

4. **Instalar dependencias de Python**
   Crea un entorno virtual (opcional pero recomendado):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```
   Instala las dependencias necesarias desde el archivo `requirements.txt`:
   ```bash
   pip install -r requirements.txt
   ```

5. **Iniciar el servidor**
   Ejecuta el servidor Flask:
   ```bash
   flask run
   ```
   Por defecto, el backend estará disponible en `http://127.0.0.1:5000`.

### Troubleshooting
- **Error de conexión con la base de datos**:
  - Asegúrate de que el contenedor de MySQL esté corriendo.
  - Verifica las credenciales y el host en el archivo `.env`.
- **Docker no levanta correctamente**:
  - Asegúrate de que ningún otro contenedor esté usando el mismo puerto.
  - Usa `docker ps` para verificar qué contenedores están corriendo.

---

## Frontend

### Instalación
1. Instala las dependencias 
   npm install
   

2. Inicia el servidor de desarrollo:
   npm run dev
  
###Deciciones 

La creación del Frontend fue programada en React Native por las siguientes razones:

- fácil creación de servicios del backend y la unión del frontend con el mismo
- la familiarización con el lenguaje
- el uso de "useEffect" y "useState" para la actualización de datos en tiempo real | agregale esto tambien
### Uso
Accede al frontend en tu navegador en `http://localhost:5173`.  
Utiliza las diferentes funcionalidades para gestionar actividades, instructores y estudiantes.

