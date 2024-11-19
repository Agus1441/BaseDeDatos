from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flasgger import Swagger
from datetime import datetime
import mysql.connector
import hashlib
import secrets

app = Flask(__name__)
CORS(app)
app.secret_key = secrets.token_hex(16) 
swagger = Swagger(app)

# Configuración de la base de datos
config_db = {
    'user': 'root',
    'password': 'root',
    'host': 'mysql',
    'database': 'escuela_nieve',
    'port': 3306
}

# Endpoint Inicial
@app.route('/')
def index():
    return "API de Escuela de Nieve funcionando"

# Mostrar las Tablas de la Base de Datos
@app.route('/tablas', methods=['GET'])
def listar_tablas():
    """
    Listar tablas de la base de datos
    """
    conn = mysql.connector.connect(**config_db)
    cursor = conn.cursor()
    try:
        cursor.execute("SHOW TABLES")
        tablas = cursor.fetchall()
        return jsonify({'tablas': [tabla[0] for tabla in tablas]})
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        conn.close()







# ========== Endpoints para Instructores ==========

# Obtener todos los Instructores
@app.route('/instructores', methods=['GET'])
def obtener_instructores():
    """
    Obtener todos los instructores.
    ---
    tags:
      - Instructores
    responses:
      200:
        description: Lista de instructores.
        schema:
          type: array
          items:
            type: object
            properties:
              CI:
                type: integer
              nombre:
                type: string
              apellido:
                type: string
    """
    connection = mysql.connector.connect(**config_db)
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM instructores")
    result = cursor.fetchall()
    cursor.close()
    connection.close()

    return jsonify([{'CI': row[0], 'nombre': row[1], 'apellido': row[2]} for row in result])

# Alta de Instructor
@app.route('/instructores', methods=['POST'])
def crear_instructor():
    """
    Crear un nuevo instructor
    ---
    tags:
      - Instructores
    parameters:
      - name: body
        in: body
        required: true
        description: Datos para crear un nuevo instructor.
        schema:
          type: object
          properties:
            CI:
              type: integer
              description: Cédula de identidad del instructor.
            nombre:
              type: string
              description: Nombre del instructor.
            apellido:
              type: string
              description: Apellido del instructor.
          required:
            - CI
            - nombre
            - apellido
    responses:
      201:
        description: Instructor creado exitosamente.
      400:
        description: Error en la solicitud.
      500:
        description: Error interno del servidor.
    """
    data = request.get_json()

    if not isinstance(data, dict):
        return jsonify({'error': 'El cuerpo de la solicitud debe ser JSON válido'}), 400

    ci = data.get('CI')
    nombre = data.get('nombre')
    apellido = data.get('apellido')

    if not all([ci, nombre, apellido]):
        return jsonify({'error': 'Todos los campos son requeridos'}), 400

    conn = mysql.connector.connect(**config_db)
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO instructores (CI, nombre, apellido) VALUES (%s, %s, %s)",
            (ci, nombre, apellido)
        )
        conn.commit()
        return jsonify({'message': 'Instructor creado exitosamente'}), 201
    except mysql.connector.Error as err:
        conn.rollback()
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        conn.close()


# Baja de Instructor
@app.route('/instructores/<int:ci>', methods=['DELETE'])
def eliminar_instructor(ci):
    """
    Eliminar un instructor por CI
    ---
    tags:
      - Instructores
    parameters:
      - name: ci
        in: path
        type: integer
        required: true
        description: Cédula de identidad del instructor
    responses:
      200:
        description: Instructor eliminado exitosamente
      404:
        description: Instructor no encontrado
      500:
        description: Error interno del servidor
    """
    conn = mysql.connector.connect(**config_db)
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM instructores WHERE CI = %s", (ci,))
        if cursor.rowcount == 0:
            return jsonify({'error': 'Instructor no encontrado'}), 404
        conn.commit()
        return jsonify({'message': 'Instructor eliminado exitosamente'}), 200
    except mysql.connector.Error as err:
        conn.rollback()
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        conn.close()

# Modificación de Instructor
@app.route('/instructores/<int:ci>', methods=['PUT'])
def modificar_instructor(ci):
    """
    Modificar datos de un instructor por CI
    ---
    tags:
      - Instructores
    parameters:
      - name: ci
        in: path
        type: integer
        required: true
        description: Cédula de identidad del instructor
      - name: body
        in: body
        required: true
        description: Datos a actualizar del instructor
        schema:
          type: object
          properties:
            nombre:
              type: string
              description: Nombre actualizado del instructor
            apellido:
              type: string
              description: Apellido actualizado del instructor
          required: []
    responses:
      200:
        description: Instructor modificado exitosamente
      404:
        description: Instructor no encontrado
      400:
        description: Error en la solicitud, parámetros incorrectos o incompletos
      500:
        description: Error interno del servidor
    """
    data = request.get_json()

    nombre = data.get('nombre')
    apellido = data.get('apellido')

    if not (nombre or apellido):
        return jsonify({'error': 'Debe proporcionar al menos un campo para actualizar'}), 400

    conn = mysql.connector.connect(**config_db)
    cursor = conn.cursor()
    try:
        query = "UPDATE instructores SET "
        values = []
        if nombre:
            query += "nombre = %s, "
            values.append(nombre)
        if apellido:
            query += "apellido = %s, "
            values.append(apellido)
        query = query.rstrip(', ')
        query += " WHERE CI = %s"
        values.append(ci)

        cursor.execute(query, tuple(values))
        if cursor.rowcount == 0:
            return jsonify({'error': 'Instructor no encontrado'}), 404
        conn.commit()
        return jsonify({'message': 'Instructor actualizado exitosamente'}), 200
    except mysql.connector.Error as err:
        conn.rollback()
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        conn.close()








# ========== Endpoints para Turnos ==========

# Obtener todos los Turnos
@app.route('/turnos', methods=['GET'])
def obtener_turnos():
    """
    Obtener todos los turnos.
    ---
    tags:
      - Turnos
    responses:
      200:
        description: Lista de turnos.
        schema:
          type: array
          items:
            type: object
            properties:
              ID:
                type: integer
              hora_inicio:
                type: string
              hora_fin:
                type: string
    """
    connection = mysql.connector.connect(**config_db)
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM turnos")
    result = cursor.fetchall()
    cursor.close()
    connection.close()

    # Convertir timedelta a string para poder serializarlo como JSON
    turnos = []
    for row in result:
        turnos.append({
            'ID': row[0],
            'hora_inicio': str(row[1]), 
            'hora_fin': str(row[2])     
        })

    return jsonify(turnos)

# Alta de Turno
@app.route('/turnos', methods=['POST'])
def crear_turno():
    """
    Crear un nuevo turno
    ---
    tags:
      - Turnos
    parameters:
      - name: body
        in: body
        required: true
        description: Datos para crear un nuevo turno.
        schema:
          type: object
          properties:
            hora_inicio:
              type: string
              format: time
              description: Hora de inicio del turno (HH:MM:SS)
            hora_fin:
              type: string
              format: time
              description: Hora de fin del turno (HH:MM:SS)
          required:
            - hora_inicio
            - hora_fin
    responses:
      201:
        description: Turno creado exitosamente
      400:
        description: Campos requeridos no proporcionados
      500:
        description: Error interno del servidor
    """
    data = request.get_json()

    if not isinstance(data, dict):
        return jsonify({'error': 'El cuerpo de la solicitud debe ser JSON válido'}), 400

    hora_inicio = data.get('hora_inicio')
    hora_fin = data.get('hora_fin')

    if not all([hora_inicio, hora_fin]):
        return jsonify({'error': 'Los campos hora_inicio y hora_fin son requeridos'}), 400

    conn = mysql.connector.connect(**config_db)
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO turnos (hora_inicio, hora_fin) VALUES (%s, %s)",
            (hora_inicio, hora_fin)
        )
        conn.commit()
        return jsonify({'message': 'Turno creado exitosamente'}), 201
    except mysql.connector.Error as err:
        conn.rollback()
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        conn.close()

# Baja de Turno
@app.route('/turnos/<int:id>', methods=['DELETE'])
def eliminar_turno(id):
    """
    Eliminar un turno por ID
    ---
    tags:
      - Turnos
    parameters:
      - name: id
        in: path
        type: integer
        required: true
        description: ID del turno a eliminar
    responses:
      200:
        description: Turno eliminado exitosamente
      404:
        description: Turno no encontrado
      500:
        description: Error interno del servidor
    """
    conn = mysql.connector.connect(**config_db)
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM turnos WHERE ID = %s", (id,))
        if cursor.rowcount == 0:
            return jsonify({'error': 'Turno no encontrado'}), 404
        conn.commit()
        return jsonify({'message': 'Turno eliminado exitosamente'}), 200
    except mysql.connector.Error as err:
        conn.rollback()
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        conn.close()

# Modificación de Turno
@app.route('/turnos/<int:id>', methods=['PUT'])
def modificar_turno(id):
    """
    Modificar un turno por ID
    ---
    tags:
      - Turnos
    parameters:
      - name: id
        in: path
        type: integer
        required: true
        description: ID del turno a modificar
      - name: body
        in: body
        required: true
        description: Datos a actualizar del turno
        schema:
          type: object
          properties:
            hora_inicio:
              type: string
              format: time
              description: Nueva hora de inicio del turno (HH:MM:SS)
            hora_fin:
              type: string
              format: time
              description: Nueva hora de fin del turno (HH:MM:SS)
          required: []
    responses:
      200:
        description: Turno actualizado exitosamente
      404:
        description: Turno no encontrado
      400:
        description: Error en la solicitud, parámetros incorrectos o incompletos
      500:
        description: Error interno del servidor
    """
    data = request.get_json()
    
    hora_inicio = data.get('hora_inicio')
    hora_fin = data.get('hora_fin')

    if not (hora_inicio or hora_fin):
        return jsonify({'error': 'Debe proporcionar al menos un campo para actualizar'}), 400

    conn = mysql.connector.connect(**config_db)
    cursor = conn.cursor()
    try:
        query = "UPDATE turnos SET "
        values = []
        if hora_inicio:
            query += "hora_inicio = %s, "
            values.append(hora_inicio)
        if hora_fin:
            query += "hora_fin = %s, "
            values.append(hora_fin)
        query = query.rstrip(', ')
        query += " WHERE ID = %s"
        values.append(id)

        cursor.execute(query, tuple(values))
        if cursor.rowcount == 0:
            return jsonify({'error': 'Turno no encontrado'}), 404
        conn.commit()
        return jsonify({'message': 'Turno actualizado exitosamente'}), 200
    except mysql.connector.Error as err:
        conn.rollback()
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        conn.close()









# ========== Endpoints para Alumnos ==========

# Obtener todos los Alumnos
@app.route('/alumnos', methods=['GET'])
def obtener_alumnos():
    """
    Obtener todos los alumnos.
    ---
    tags:
      - Alumnos
    responses:
      200:
        description: Lista de alumnos.
        schema:
          type: array
          items:
            type: object
            properties:
              CI:
                type: integer
              nombre:
                type: string
              apellido:
                type: string
              fecha_nacimiento:
                type: string
              correo:
                type: string
              telefono:
                type: string
    """
    connection = mysql.connector.connect(**config_db)
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM alumnos")
    result = cursor.fetchall()
    cursor.close()
    connection.close()

    return jsonify([{'CI': row[0], 'nombre': row[1], 'apellido': row[2], 'fecha_nacimiento': row[3], 'correo': row[4], 'telefono': row[5]} for row in result])

# Alta de Alumno
@app.route('/alumnos', methods=['POST'])
def crear_alumno():
    """
    Crear un nuevo alumno
    ---
    tags:
      - Alumnos
    parameters:
      - name: body
        in: body
        required: true
        description: Datos del alumno a crear.
        schema:
          type: object
          properties:
            CI:
              type: integer
              description: Cédula de identidad del alumno
            nombre:
              type: string
              description: Nombre del alumno
            apellido:
              type: string
              description: Apellido del alumno
            fecha_nacimiento:
              type: string
              format: date
              description: Fecha de nacimiento del alumno (YYYY-MM-DD)
            correo:
              type: string
              description: Correo electrónico del alumno
            telefono:
              type: string
              description: Teléfono de contacto del alumno
          required:
            - CI
            - nombre
            - apellido
            - fecha_nacimiento
            - correo
            - telefono
    responses:
      201:
        description: Alumno creado exitosamente
      400:
        description: Campos requeridos no proporcionados
      500:
        description: Error interno del servidor
    """
    data = request.get_json()

    if not isinstance(data, dict):
        return jsonify({'error': 'El cuerpo de la solicitud debe ser JSON válido'}), 400

    ci = data.get('CI')
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    fecha_nacimiento = data.get('fecha_nacimiento')
    correo = data.get('correo')
    telefono = data.get('telefono')

    if not all([ci, nombre, apellido, fecha_nacimiento, correo, telefono]):
        return jsonify({'error': 'Todos los campos son requeridos'}), 400

    conn = mysql.connector.connect(**config_db)
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO alumnos (CI, nombre, apellido, fecha_nacimiento, correo, telefono) VALUES (%s, %s, %s, %s, %s, %s)",
            (ci, nombre, apellido, fecha_nacimiento, correo, telefono)
        )
        conn.commit()
        return jsonify({'message': 'Alumno creado exitosamente'}), 201
    except mysql.connector.Error as err:
        conn.rollback()
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        conn.close()

# Baja de Alumno
@app.route('/alumnos/<int:ci>', methods=['DELETE'])
def eliminar_alumno(ci):
    """
    Eliminar un alumno por CI
    ---
    tags:
      - Alumnos
    parameters:
      - name: ci
        in: path
        type: integer
        required: true
        description: Cédula de identidad del alumno a eliminar
    responses:
      200:
        description: Alumno eliminado exitosamente
      404:
        description: Alumno no encontrado
      500:
        description: Error interno del servidor
    """
    conn = mysql.connector.connect(**config_db)
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM alumnos WHERE CI = %s", (ci,))
        if cursor.rowcount == 0:
            return jsonify({'error': 'Alumno no encontrado'}), 404
        conn.commit()
        return jsonify({'message': 'Alumno eliminado exitosamente'}), 200
    except mysql.connector.Error as err:
        conn.rollback()
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        conn.close()

# Modificación de Alumno
@app.route('/alumnos/<int:ci>', methods=['PUT'])
def modificar_alumno(ci):
    """
    Modificar datos de un alumno por CI
    ---
    tags:
      - Alumnos
    parameters:
      - name: ci
        in: path
        type: integer
        required: true
        description: Cédula de identidad del alumno a modificar
      - name: body
        in: body
        required: true
        description: Datos a actualizar del alumno
        schema:
          type: object
          properties:
            nombre:
              type: string
              description: Nuevo nombre del alumno
            apellido:
              type: string
              description: Nuevo apellido del alumno
            fecha_nacimiento:
              type: string
              format: date
              description: Nueva fecha de nacimiento del alumno (YYYY-MM-DD)
            correo:
              type: string
              description: Nuevo correo electrónico del alumno
            telefono:
              type: string
              description: Nuevo teléfono de contacto del alumno
          required: []
    responses:
      200:
        description: Alumno actualizado exitosamente
      400:
        description: Campos requeridos no proporcionados
      404:
        description: Alumno no encontrado
      500:
        description: Error interno del servidor
    """
    data = request.get_json()
    
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    fecha_nacimiento = data.get('fecha_nacimiento')
    correo = data.get('correo')
    telefono = data.get('telefono')

    if not (nombre or apellido or fecha_nacimiento or correo or telefono):
        return jsonify({'error': 'Debe proporcionar al menos un campo para actualizar'}), 400

    conn = mysql.connector.connect(**config_db)
    cursor = conn.cursor()
    try:
        query = "UPDATE alumnos SET "
        values = []
        if nombre:
            query += "nombre = %s, "
            values.append(nombre)
        if apellido:
            query += "apellido = %s, "
            values.append(apellido)
        if fecha_nacimiento:
            query += "fecha_nacimiento = %s, "
            values.append(fecha_nacimiento)
        if correo:
            query += "correo = %s, "
            values.append(correo)
        if telefono:
            query += "telefono = %s, "
            values.append(telefono)
        query = query.rstrip(', ')
        query += " WHERE CI = %s"
        values.append(ci)

        cursor.execute(query, tuple(values))
        if cursor.rowcount == 0:
            return jsonify({'error': 'Alumno no encontrado'}), 404
        conn.commit()
        return jsonify({'message': 'Alumno actualizado exitosamente'}), 200
    except mysql.connector.Error as err:
        conn.rollback()
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        conn.close()











# ========= Endpoints para Actividades ==========

# Obtener todas las Actividades
@app.route('/actividades', methods=['GET'])
def obtener_actividades():
    """
    Obtener todas las actividades.
    ---
    tags:
      - Actividades
    responses:
      200:
        description: Lista de actividades.
        schema:
          type: array
          items:
            type: object
            properties:
              ID:
                type: integer
              nombre:
                type: string
              descripcion:
                type: string
              costo:
                type: number
              edadRequerida:
                type: integer
    """
    connection = mysql.connector.connect(**config_db)
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM actividades")
    result = cursor.fetchall()
    cursor.close()
    connection.close()

    return jsonify([{'ID': row[0], 'nombre': row[1], 'descripcion': row[2], 'costo': row[3], 'edadRequerida': row[4]} for row in result])

# Modificación de Actividad
@app.route('/actividades/<int:id_actividad>', methods=['PUT'])
def modificar_actividad(id_actividad):
    """
    Modificar una actividad existente.
    ---
    tags:
      - Actividades
    parameters:
      - name: id_actividad
        in: path
        type: integer
        required: true
        description: ID de la actividad a modificar.
      - name: body
        in: body
        required: true
        description: Datos de la actividad a modificar. Al menos uno de los campos es obligatorio.
        schema:
          type: object
          properties:
            nombre:
              type: string
              description: Nuevo nombre de la actividad.
            descripcion:
              type: string
              description: Nueva descripción de la actividad.
            costo:
              type: number
              format: float
              description: Nuevo costo de la actividad.
    responses:
      200:
        description: Actividad actualizada exitosamente.
        schema:
          type: object
          properties:
            message:
              type: string
              example: Actividad actualizada exitosamente
      400:
        description: Error en la solicitud. No se proporcionaron campos para actualizar.
        schema:
          type: object
          properties:
            error:
              type: string
              example: Debe proporcionar al menos un campo para actualizar
      404:
        description: Actividad no encontrada.
        schema:
          type: object
          properties:
            error:
              type: string
              example: Actividad no encontrada
      500:
        description: Error interno del servidor.
        schema:
          type: object
          properties:
            error:
              type: string
              example: Error al actualizar la actividad
    """
    data = request.json
    nombre = data.get('nombre')
    descripcion = data.get('descripcion')
    costo = data.get('costo')

    # Verificación de que al menos un campo sea proporcionado
    if not (nombre or descripcion or costo):
        return jsonify({'error': 'Debe proporcionar al menos un campo para actualizar'}), 400

    connection = mysql.connector.connect(**config_db)
    cursor = connection.cursor()
    
    try:
        # Construcción de la consulta de actualización dinámica
        query = "UPDATE actividades SET "
        values = []
        
        if nombre:
            query += "nombre = %s, "
            values.append(nombre)
        
        if descripcion:
            query += "descripcion = %s, "
            values.append(descripcion)
        
        if costo:
            query += "costo = %s, "
            values.append(costo)
        
        # Remueve la última coma y espacio, y añade la condición WHERE
        query = query.rstrip(', ')
        query += " WHERE ID = %s"
        values.append(id_actividad)

        cursor.execute(query, tuple(values))
        
        if cursor.rowcount == 0:
            return jsonify({'error': 'Actividad no encontrada'}), 404
        
        connection.commit()
        return jsonify({'message': 'Actividad actualizada exitosamente'}), 200

    except mysql.connector.Error as err:
        connection.rollback()
        return jsonify({'error': str(err)}), 500

    finally:
        cursor.close()
        connection.close()











# ========== Endpoints para Autenticación ==========

# Login - Inicio de sesión
@app.route('/login', methods=['POST'])
def login():
    """
    Iniciar sesión
    ---
    tags:
      - Autenticación
    parameters:
      - name: correo
        in: body
        type: string
        required: true
        description: Correo electrónico del usuario
      - name: password
        in: body
        type: string
        required: true
        description: Contraseña del usuario
    responses:
      200:
        description: Inicio de sesión exitoso
      401:
        description: Correo o contraseña incorrectos
      500:
        description: Error interno del servidor
    """
    data = request.json
    correo = data['correo']
    password = hashlib.sha256(data['password'].encode()).hexdigest()

    # Conectar a la base de datos
    connection = mysql.connector.connect(**config_db)
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM login WHERE correo=%s AND contrasena=%s", (correo, password))
    user = cursor.fetchone()
    cursor.close()
    connection.close()

    if user:
        # Guardar datos en la sesión
        session['logged_in'] = True
        session['user_id'] = user['ID_usuario']
        session['user_role'] = user['rol']

        return jsonify({
            "message": "Login exitoso",
            "rol": user['rol'],
            "ID_usuario": user['ID_usuario']
        })
    else:
        return jsonify({"message": "Correo o contraseña incorrectos"}), 401

# Logout - Cierre de sesión
@app.route('/logout', methods=['POST'])
def logout():
    """
    Cerrar sesión
    ---
    tags:
      - Autenticación
    responses:
      200:
        description: Cierre de sesión exitoso
      500:
        description: Error interno del servidor
    """
    session.clear()
    return jsonify({"message": "Logout exitoso"})

# Registro (Solo Administrativos)
@app.route('/registro', methods=['POST'])
def registro():
    """
    Registrar un nuevo usuario administrativo
    ---
    tags:
      - Autenticación
    parameters:
      - name: correo
        in: body
        type: string
        required: true
        description: Correo electrónico del nuevo usuario
      - name: password
        in: body
        type: string
        required: true
        description: Contraseña del nuevo usuario
    responses:
      201:
        description: Registro exitoso
      400:
        description: Correo ya registrado o campos requeridos no proporcionados
      500:
        description: Error interno del servidor
    """
    data = request.json
    correo = data.get('correo')
    password = data.get('password')
    
    if not correo or not password:
        return jsonify({"message": "Correo y contraseña son requeridos"}), 400

    # Cifrar la contraseña
    password_hash = hashlib.sha256(password.encode()).hexdigest()

    # Conexión a la base de datos y consulta
    connection = mysql.connector.connect(**config_db)
    cursor = connection.cursor()

    try:
        # Verificar si el correo ya existe
        cursor.execute("SELECT * FROM login WHERE correo = %s", (correo,))
        if cursor.fetchone():
            return jsonify({"message": "El correo ya está registrado"}), 400

        # Insertar el nuevo usuario administrativo
        cursor.execute("""
            INSERT INTO login (correo, contrasena, rol)
            VALUES (%s, %s, %s)
        """, (correo, password_hash, 'administrativo'))

        connection.commit()
        return jsonify({"message": "Registro exitoso"}), 201

    except mysql.connector.Error as err:
        connection.rollback()
        return jsonify({"error": str(err)}), 500

    finally:
        cursor.close()
        connection.close()












# ========== Endpoints para Clases ============

# Obtener todas las Clases
@app.route('/clases', methods=['GET'])
def obtener_clases():
    """
    Obtener todas las clases.
    ---
    tags:
      - Clases
    responses:
      200:
        description: Lista de clases.
        schema:
          type: array
          items:
            type: object
            properties:
              ID:
                type: integer
              CI_Instructor:
                type: integer
              ID_Actividad:
                type: integer
              ID_Turno:
                type: integer
              Cupos:
                type: integer
              Fecha_inicio:
                type: string
              Fecha_fin:
                type: string
    """
    connection = mysql.connector.connect(**config_db)
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM clases")
    result = cursor.fetchall()
    cursor.close()
    connection.close()

    return jsonify([{'ID': row[0], 'CI_Instructor': row[1], 'ID_Actividad': row[2], 'ID_Turno': row[3], 'Cupos': row[4], 'Fecha_inicio': row[5], 'Fecha_fin': row[6]} for row in result])

# Función para verificar solapamiento de horarios y fechas
def verificar_solapamiento(instructor_id, turno_id, fecha_inicio, fecha_fin):
    conn = mysql.connector.connect(**config_db)
    cursor = conn.cursor(dictionary=True)
    query = """
        SELECT c.Fecha_inicio, c.Fecha_fin, t.hora_inicio, t.hora_fin
        FROM clases c
        JOIN turnos t ON c.ID_Turno = t.ID
        WHERE c.CI_Instructor = %s
          AND c.ID_Turno = %s
          AND ((%s BETWEEN c.Fecha_inicio AND c.Fecha_fin)
            OR (%s BETWEEN c.Fecha_inicio AND c.Fecha_fin)
            OR (c.Fecha_inicio BETWEEN %s AND %s))
    """
    cursor.execute(query, (instructor_id, turno_id, fecha_inicio, fecha_fin, fecha_inicio, fecha_fin))
    solapamiento = cursor.fetchone() is not None
    cursor.close()
    conn.close()
    return solapamiento

# Alta de Clase
@app.route('/clases', methods=['POST'])
def crear_clase():
    """
    Crear una nueva clase
    ---
    tags: 
      - Clases
    parameters:
      - name: body
        in: body
        required: true
        description: Datos para crear una nueva clase.
        schema:
          type: object
          properties:
            CI_Instructor:
              type: integer
              description: CI del instructor.
            ID_Actividad:
              type: integer
              description: ID de la actividad.
            ID_Turno:
              type: integer
              description: ID del turno.
            Cupos:
              type: integer
              description: Número de cupos disponibles.
            Fecha_inicio:
              type: string
              format: date
              description: Fecha de inicio de la clase (YYYY-MM-DD).
            Fecha_fin:
              type: string
              format: date
              description: Fecha de fin de la clase (YYYY-MM-DD).
          required:
            - CI_Instructor
            - ID_Actividad
            - ID_Turno
            - Cupos
            - Fecha_inicio
            - Fecha_fin
    responses:
      201:
        description: Clase creada exitosamente.
      400:
        description: Error en los datos enviados.
      409:
        description: Conflicto de horarios para el instructor en ese turno.
    """
    data = request.get_json()

    if not isinstance(data, dict):
        return jsonify({'error': 'El cuerpo de la solicitud debe ser JSON válido'}), 400

    instructor_id = data.get('CI_Instructor')
    actividad_id = data.get('ID_Actividad')
    turno_id = data.get('ID_Turno')
    cupos = data.get('Cupos')
    fecha_inicio = data.get('Fecha_inicio')
    fecha_fin = data.get('Fecha_fin')

    if not all([instructor_id, actividad_id, turno_id, cupos, fecha_inicio, fecha_fin]):
        return jsonify({'error': 'Faltan campos requeridos en el JSON'}), 400

    if verificar_solapamiento(instructor_id, turno_id, fecha_inicio, fecha_fin):
        return jsonify({'error': 'El instructor ya tiene una clase en ese turno y horario'}), 409

    conn = mysql.connector.connect(**config_db)
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO clases (CI_Instructor, ID_Actividad, ID_Turno, Cupos, Fecha_inicio, Fecha_fin) VALUES (%s, %s, %s, %s, %s, %s)",
            (instructor_id, actividad_id, turno_id, cupos, fecha_inicio, fecha_fin)
        )
        conn.commit()
        return jsonify({'message': 'Clase creada exitosamente'}), 201
    except mysql.connector.Error as err:
        conn.rollback()
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        conn.close()


# Baja de Clase
@app.route('/clases/<int:clase_id>', methods=['DELETE'])
def eliminar_clase(clase_id):
    """
    Eliminar una clase
    ---
    tags:
      - Clases
    parameters:
      - name: clase_id
        in: path
        type: integer
        required: true
        description: ID de la clase a eliminar
    responses:
      200:
        description: Clase eliminada exitosamente
      403:
        description: La clase no puede eliminarse en el horario actual
    """
    conn = mysql.connector.connect(**config_db)
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT Fecha_inicio, Fecha_fin FROM clases WHERE ID = %s", (clase_id,))
    clase = cursor.fetchone()
    if not clase:
        return jsonify({'error': 'Clase no encontrada'}), 404

    fecha_inicio = clase['Fecha_inicio']
    fecha_fin = clase['Fecha_fin']
    ahora = datetime.now().date()

    if fecha_inicio <= ahora <= fecha_fin:
        return jsonify({'error': 'La clase no puede eliminarse en el horario actual'}), 403

    cursor.execute("DELETE FROM clases WHERE ID = %s", (clase_id,))
    conn.commit()
    return jsonify({'message': 'Clase eliminada exitosamente'}), 200

# Modificación de Clase
@app.route('/clases/<int:clase_id>', methods=['PUT'])
def modificar_clase(clase_id):
    """
    Modificar una clase existente
    ---
    tags:
      - Clases
    parameters:
      - name: clase_id
        in: path
        type: integer
        required: true
        description: ID de la clase a modificar
      - name: body
        in: body
        required: true
        description: Datos de la clase a actualizar
        schema:
          type: object
          properties:
            CI_Instructor:
              type: integer
              description: CI del nuevo instructor
            ID_Turno:
              type: integer
              description: ID del nuevo turno
          required: []
    responses:
      200:
        description: Clase modificada exitosamente
      403:
        description: La clase no puede modificarse en el horario actual
      409:
        description: Conflicto de horarios para el instructor en el nuevo turno
      404:
        description: Clase no encontrada
      500:
        description: Error interno del servidor
    """
    data = request.get_json()
    nuevo_instructor = data.get('CI_Instructor')
    nuevo_turno = data.get('ID_Turno')

    conn = mysql.connector.connect(**config_db)
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT Fecha_inicio, Fecha_fin FROM clases WHERE ID = %s", (clase_id,))

    
    clase = cursor.fetchone()
    if not clase:
        return jsonify({'error': 'Clase no encontrada'}), 404

    fecha_inicio = clase['Fecha_inicio']
    fecha_fin = clase['Fecha_fin']
    ahora = datetime.now().date()

    # Verificar que no se modifique una clase en el horario actual
    if fecha_inicio <= ahora <= fecha_fin:
        return jsonify({'error': 'La clase no puede modificarse en el horario actual'}), 403

    # Verificar si el instructor tiene un conflicto de horarios
    if nuevo_instructor and nuevo_turno and verificar_solapamiento(nuevo_instructor, nuevo_turno, fecha_inicio, fecha_fin):
        return jsonify({'error': 'El instructor ya tiene una clase en ese turno y horario'}), 409

    try:

        query = "UPDATE clases SET "
        values = []
        if nuevo_instructor:
            query += "CI_Instructor = %s, "
            values.append(nuevo_instructor)
        if nuevo_turno:
            query += "ID_Turno = %s, "
            values.append(nuevo_turno)
        query = query.rstrip(', ')
        query += " WHERE ID = %s"
        values.append(clase_id)

        cursor.execute(query, tuple(values))
        conn.commit()
        return jsonify({'message': 'Clase modificada exitosamente'}), 200
    except mysql.connector.Error as err:
        conn.rollback()
        return jsonify({'error': f'Error interno del servidor: {str(err)}'}), 500
    finally:
        cursor.close()
        conn.close()











# =========== Endpoints para Reportes ===========

# Actividades Ordenadas por Ingresos Generados
@app.route('/actividades/ingresos', methods=['GET'])
def ver_actividades_por_ingresos():
    """
    Ver actividades ordenadas por ingresos totales.
    ---
    tags:
      - Reportes
    parameters:
      - name: fecha_inicio
        in: query
        type: string
        format: date
        required: true
        description: Fecha de inicio (YYYY-MM-DD).
      - name: fecha_fin
        in: query
        type: string
        format: date
        required: true
        description: Fecha de fin (YYYY-MM-DD).
    responses:
      200:
        description: Lista de actividades ordenadas por ingresos totales.
        schema:
          type: array
          items:
            type: object
            properties:
              actividad:
                type: string
              ingresos_totales:
                type: number
    """
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')

    connection = mysql.connector.connect(**config_db)
    cursor = connection.cursor()

    query = """
    SELECT 
        a.nombre AS actividad, 
        (COALESCE(SUM(ac_ingresos.total_ingresos_actividad), 0) 
         + COALESCE(SUM(alq_ingresos.total_ingresos_alquiler), 0)) AS ingresos_totales
    FROM 
        actividades a
    LEFT JOIN (
        SELECT 
            c.ID_Actividad, 
            SUM(act.costo) AS total_ingresos_actividad
        FROM 
            alumno_clase ac
        JOIN 
            clases c ON ac.ID_Clase = c.ID
        JOIN 
            actividades act ON c.ID_Actividad = act.ID
        WHERE 
            c.Fecha_inicio >= %s AND c.Fecha_fin <= %s
        GROUP BY 
            c.ID_Actividad
    ) AS ac_ingresos ON a.ID = ac_ingresos.ID_Actividad
    LEFT JOIN (
        SELECT 
            c.ID_Actividad, 
            SUM(e.costo) AS total_ingresos_alquiler
        FROM 
            alquiler al
        JOIN 
            equipamiento e ON al.ID_Equipamiento = e.ID
        JOIN 
            clases c ON al.ID_Clase = c.ID
        WHERE 
            al.fecha_inicio >= %s AND al.fecha_fin <= %s
        GROUP BY 
            c.ID_Actividad
    ) AS alq_ingresos ON a.ID = alq_ingresos.ID_Actividad
    GROUP BY 
        a.ID, a.nombre
    ORDER BY 
        ingresos_totales DESC;
    """
    cursor.execute(query, (fecha_inicio, fecha_fin, fecha_inicio, fecha_fin))
    result = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify([{'actividad': row[0], 'ingresos_totales': row[1]} for row in result])

# Actividades Ordenadas por Cantidad de Alumnos
@app.route('/actividades/alumnos', methods=['GET'])
def ver_actividades_por_alumnos():
    """
    Ver actividades ordenadas por cantidad de alumnos inscritos.
    ---
    tags:
      - Reportes
    parameters:
      - name: fecha_inicio
        in: query
        type: string
        format: date
        required: true
        description: Fecha de inicio (YYYY-MM-DD).
      - name: fecha_fin
        in: query
        type: string
        format: date
        required: true
        description: Fecha de fin (YYYY-MM-DD).
    responses:
      200:
        description: Lista de actividades ordenadas por cantidad de alumnos inscritos.
        schema:
          type: array
          items:
            type: object
            properties:
              actividad:
                type: string
              cantidad_alumnos:
                type: integer
    """
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')

    connection = mysql.connector.connect(**config_db)
    cursor = connection.cursor()

    query = """
    SELECT 
        a.nombre AS actividad, 
        COUNT(ac.ID_Alumno) AS cantidad_alumnos
    FROM 
        actividades a
    JOIN 
        clases c ON a.ID = c.ID_Actividad
    LEFT JOIN 
        alumno_clase ac ON c.ID = ac.ID_Clase
    WHERE 
        c.Fecha_inicio >= %s AND c.Fecha_fin <= %s
    GROUP BY 
        a.ID, a.nombre
    ORDER BY 
        cantidad_alumnos DESC;
    """
    cursor.execute(query, (fecha_inicio, fecha_fin))
    result = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify([{'actividad': row[0], 'cantidad_alumnos': row[1]} for row in result])

# Turnos Ordenados por Cantidad de Clases
@app.route('/turnos/clases', methods=['GET'])
def ver_turnos_por_clases():
    """
    Ver turnos ordenados por cantidad de clases dictadas.
    ---
    tags:
      - Reportes
    parameters:
      - name: fecha_inicio
        in: query
        type: string
        format: date
        required: true
        description: Fecha de inicio (YYYY-MM-DD).
      - name: fecha_fin
        in: query
        type: string
        format: date
        required: true
        description: Fecha de fin (YYYY-MM-DD).
    responses:
      200:
        description: Lista de turnos ordenados por cantidad de clases dictadas.
        schema:
          type: array
          items:
            type: object
            properties:
              turno:
                type: string
              cantidad_clases:
                type: integer
    """
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')

    connection = mysql.connector.connect(**config_db)
    cursor = connection.cursor()

    query = """
    SELECT 
        CONCAT(t.hora_inicio, ' - ', t.hora_fin) AS turno, 
        COUNT(c.ID) AS cantidad_clases
    FROM 
        turnos t
    JOIN 
        clases c ON t.ID = c.ID_Turno
    WHERE 
        c.Fecha_inicio >= %s AND c.Fecha_fin <= %s
    GROUP BY 
        t.ID, t.hora_inicio, t.hora_fin
    ORDER BY 
        cantidad_clases DESC;
    """
    cursor.execute(query, (fecha_inicio, fecha_fin))
    result = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify([{'turno': row[0], 'cantidad_clases': row[1]} for row in result])












# ========== Endpoints para Otras Operaciones ===========

# Inscribir un alumno a una clase
@app.route('/inscribir', methods=['POST'])
def inscribir_alumno():
    """
    Inscribir a un alumno en una clase
    ---
    tags:
      - Inscripciones
    parameters:
      - name: ID_Alumno
        in: body
        type: integer
        required: true
        description: ID del alumno a inscribir
      - name: ID_Clase
        in: body
        type: integer
        required: true
        description: ID de la clase a la que se quiere inscribir
    responses:
      201:
        description: Alumno inscrito exitosamente en la clase
      400:
        description: Conflicto de horario o restricción de edad no cumplida
      404:
        description: Alumno o clase no encontrados
      500:
        description: Error interno del servidor
    """
    data = request.json
    id_alumno = data.get('ID_Alumno')
    id_clase = data.get('ID_Clase')

    if not (id_alumno and id_clase):
        return jsonify({'error': 'ID de alumno y clase son requeridos'}), 400

    conn = mysql.connector.connect(**config_db)
    cursor = conn.cursor(dictionary=True)

    try:
        # Obtener información de la clase
        cursor.execute("SELECT * FROM clases WHERE ID = %s", (id_clase,))
        clase = cursor.fetchone()
        if not clase:
            return jsonify({'error': 'Clase no encontrada'}), 404

        # Obtener información del alumno
        cursor.execute("SELECT * FROM alumnos WHERE CI = %s", (id_alumno,))
        alumno = cursor.fetchone()
        if not alumno:
            return jsonify({'error': 'Alumno no encontrado'}), 404

        # Calcular la edad del alumno
        fecha_nacimiento = datetime.strptime(alumno['fecha_nacimiento'], '%Y-%m-%d')
        edad_alumno = (datetime.now() - fecha_nacimiento).days // 365

        # Verificar la restricción de edad
        cursor.execute("SELECT edadRequerida FROM actividades WHERE ID = %s", (clase['ID_Actividad'],))
        actividad = cursor.fetchone()
        if edad_alumno < actividad['edadRequerida']:
            return jsonify({'error': 'El alumno no cumple con la restricción de edad para esta actividad'}), 400

        # Verificar conflictos de horario
        cursor.execute("""
            SELECT C.Fecha_inicio, C.Fecha_fin, T.hora_inicio, T.hora_fin
            FROM alumno_clase AC
            JOIN clases C ON AC.ID_Clase = C.ID
            JOIN turnos T ON C.ID_Turno = T.ID
            WHERE AC.ID_Alumno = %s AND (
                (%s BETWEEN C.Fecha_inicio AND C.Fecha_fin OR %s BETWEEN C.Fecha_inicio AND C.Fecha_fin) AND
                ((SELECT hora_inicio FROM turnos WHERE ID = %s) < T.hora_fin AND 
                (SELECT hora_fin FROM turnos WHERE ID = %s) > T.hora_inicio)
            )
        """, (id_alumno, clase['Fecha_inicio'], clase['Fecha_fin'], clase['ID_Turno'], clase['ID_Turno']))

        conflicto_horario = cursor.fetchone()
        if conflicto_horario:
            return jsonify({'error': 'Conflicto de horario: el alumno ya está inscrito en otra clase en el mismo horario'}), 400

        # Inscribir al alumno en la clase
        cursor.execute("INSERT INTO alumno_clase (ID_Alumno, ID_Clase) VALUES (%s, %s)", (id_alumno, id_clase))
        conn.commit()
        return jsonify({'message': 'Alumno inscrito exitosamente en la clase'}), 201

    except mysql.connector.Error as err:
        conn.rollback()
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        conn.close()

# Dar de baja a un alumno de una clase
@app.route('/desinscribir', methods=['DELETE'])
def dar_de_baja_alumno():
    """
    Dar de baja a un alumno de una clase
    ---
    tags:
      - Inscripciones
    parameters:
      - name: ID_Alumno
        in: body
        type: integer
        required: true
        description: ID del alumno a dar de baja
      - name: ID_Clase
        in: body
        type: integer
        required: true
        description: ID de la clase de la cual se quiere dar de baja al alumno
    responses:
      200:
        description: Alumno dado de baja exitosamente de la clase
      404:
        description: El alumno no está inscrito en esta clase
      500:
        description: Error interno del servidor
    """
    data = request.json
    id_alumno = data.get('ID_Alumno')
    id_clase = data.get('ID_Clase')

    if not (id_alumno and id_clase):
        return jsonify({'error': 'ID de alumno y clase son requeridos'}), 400

    conn = mysql.connector.connect(**config_db)
    cursor = conn.cursor()

    try:
        # Verificar que el alumno esté inscrito en la clase
        cursor.execute("SELECT * FROM alumno_clase WHERE ID_Alumno = %s AND ID_Clase = %s", (id_alumno, id_clase))
        inscripcion = cursor.fetchone()
        
        if not inscripcion:
            return jsonify({'error': 'El alumno no está inscrito en esta clase'}), 404

        # Eliminar la inscripción del alumno en la clase
        cursor.execute("DELETE FROM alumno_clase WHERE ID_Alumno = %s AND ID_Clase = %s", (id_alumno, id_clase))
        conn.commit()
        return jsonify({'message': 'Alumno dado de baja exitosamente de la clase'}), 200

    except mysql.connector.Error as err:
        conn.rollback()
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        conn.close()

# Alquilar un Equipamiento
@app.route('/alquiler', methods=['POST'])
def alquilar_equipamiento():
    """
    Alquilar equipamiento para un alumno
    ---
    tags:
      - Alquiler
    parameters:
      - name: ID_Alquiler
        in: body
        type: integer
        required: true
        description: ID del alquiler
      - name: ID_Alumno
        in: body
        type: integer
        required: true
        description: ID del alumno que realiza el alquiler
      - name: ID_Equipamiento
        in: body
        type: integer
        required: true
        description: ID del equipamiento a alquilar
      - name: ID_Clase
        in: body
        type: integer
        required: false
        description: ID de la clase asociada al alquiler (puede ser NULL)
      - name: fecha_inicio
        in: body
        type: string
        format: date
        required: true
        description: Fecha de inicio del alquiler (YYYY-MM-DD)
      - name: fecha_fin
        in: body
        type: string
        format: date
        required: true
        description: Fecha de fin del alquiler (YYYY-MM-DD)
    responses:
      201:
        description: Equipamiento alquilado exitosamente
      400:
        description: Datos incompletos o inválidos
      500:
        description: Error interno del servidor
    """
    data = request.json
    id_alquiler = data.get('ID_Alquiler')
    id_alumno = data.get('ID_Alumno')
    id_equipamiento = data.get('ID_Equipamiento')
    id_clase = data.get('ID_Clase')
    fecha_inicio = data.get('fecha_inicio')
    fecha_fin = data.get('fecha_fin')

    # Validar que todos los campos obligatorios estén presentes
    if not (id_alquiler and id_alumno and id_equipamiento and fecha_inicio and fecha_fin):
        return jsonify({'error': 'Todos los campos obligatorios deben ser proporcionados'}), 400

    # Validar que fecha_inicio sea anterior a fecha_fin
    if fecha_inicio >= fecha_fin:
        return jsonify({'error': 'La fecha de inicio debe ser anterior a la fecha de fin'}), 400

    conn = mysql.connector.connect(**config_db)
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO alquiler (ID_Alquiler, ID_Alumno, ID_Equipamiento, ID_Clase, fecha_inicio, fecha_fin) "
            "VALUES (%s, %s, %s, %s, %s, %s)",
            (id_alquiler, id_alumno, id_equipamiento, id_clase, fecha_inicio, fecha_fin)
        )
        conn.commit()
        return jsonify({'message': 'Equipamiento alquilado exitosamente'}), 201

    except mysql.connector.Error as err:
        conn.rollback()
        return jsonify({'error': str(err)}), 500

    finally:
        cursor.close()
        conn.close()

# Obtener todos los Equipamientos
@app.route('/equipamientos', methods=['GET'])
def obtener_equipamientos():
    """
    Obtener todos los equipamientos.
    ---
    tags:
      - Equipamientos
    responses:
      200:
        description: Lista de equipamientos.
        schema:
          type: array
          items:
            type: object
            properties:
              ID:
                type: integer
              nombre:
                type: string
              descripcion:
                type: string
              costo:
                type: number
    """
    connection = mysql.connector.connect(**config_db)
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM equipamiento")
    result = cursor.fetchall()
    cursor.close()
    connection.close()

    return jsonify([{'ID': row[0], 'nombre': row[1], 'descripcion': row[2], 'costo': row[3]} for row in result])

# Obtener los equipamientos requeridos para una actividad específica
@app.route('/equipamientos/<int:id_actividad>', methods=['GET'])
def equipamientos_requeridos(id_actividad):
    """
    Obtener equipamientos requeridos para una actividad.
    ---
    tags:
      - Equipamientos
    parameters:
      - name: id_actividad
        in: path
        type: integer
        required: true
        description: ID de la actividad.
    responses:
      200:
        description: Lista de equipamientos requeridos.
        schema:
          type: array
          items:
            type: object
            properties:
              ID:
                type: integer
              nombre:
                type: string
              descripcion:
                type: string
              costo:
                type: number
    """
    connection = mysql.connector.connect(**config_db)
    cursor = connection.cursor()
    query = """
    SELECT e.ID, e.nombre, e.descripcion, e.costo
    FROM equipamiento e
    JOIN equipamiento_actividad ea ON e.ID = ea.ID_Equipamiento
    WHERE ea.ID_Actividad = %s
    """
    cursor.execute(query, (id_actividad,))
    result = cursor.fetchall()
    cursor.close()
    connection.close()

    return jsonify([{'ID': row[0], 'nombre': row[1], 'descripcion': row[2], 'costo': row[3]} for row in result])

# Obtener las clases a las que un alumno específico está inscripto
@app.route('/inscripciones/<int:ci_alumno>', methods=['GET'])
def ver_inscripciones(ci_alumno):
    """
    Obtener todas las clases a las que un alumno está inscrito.
    ---
    tags:
      - Inscripciones
    parameters:
      - name: ci_alumno
        in: path
        type: integer
        required: true
        description: CI del alumno.
    responses:
      200:
        description: Lista de clases del alumno.
        schema:
          type: array
          items:
            type: object
            properties:
              ID:
                type: integer
              CI_Instructor:
                type: integer
              ID_Actividad:
                type: integer
              ID_Turno:
                type: integer
              Cupos:
                type: integer
              Fecha_inicio:
                type: string
              Fecha_fin:
                type: string
    """
    connection = mysql.connector.connect(**config_db)
    cursor = connection.cursor()
    query = """
    SELECT c.*
    FROM clases c
    JOIN alumno_clase ac ON c.ID = ac.ID_Clase
    WHERE ac.ID_Alumno = %s
    """
    cursor.execute(query, (ci_alumno,))
    result = cursor.fetchall()
    cursor.close()
    connection.close()

    return jsonify([{'ID': row[0], 'CI_Instructor': row[1], 'ID_Actividad': row[2], 'ID_Turno': row[3], 'Cupos': row[4], 'Fecha_inicio': row[5], 'Fecha_fin': row[6]} for row in result])

# Obtener las clases dadas por un instructor específico
@app.route('/clases_instructor/<int:ci_instructor>', methods=['GET'])
def clases_dadas_por(ci_instructor):
    """
    Obtener todas las clases de un instructor.
    ---
    tags:
      - Clases
    parameters:
      - name: ci_instructor
        in: path
        type: integer
        required: true
        description: CI del instructor.
    responses:
      200:
        description: Lista de clases del instructor.
        schema:
          type: array
          items:
            type: object
            properties:
              ID:
                type: integer
              CI_Instructor:
                type: integer
              ID_Actividad:
                type: integer
              ID_Turno:
                type: integer
              Cupos:
                type: integer
              Fecha_inicio:
                type: string
              Fecha_fin:
                type: string
    """
    connection = mysql.connector.connect(**config_db)
    cursor = connection.cursor()
    query = "SELECT * FROM clases WHERE CI_Instructor = %s"
    cursor.execute(query, (ci_instructor,))
    result = cursor.fetchall()
    cursor.close()
    connection.close()

    return jsonify([{'ID': row[0], 'CI_Instructor': row[1], 'ID_Actividad': row[2], 'ID_Turno': row[3], 'Cupos': row[4], 'Fecha_inicio': row[5], 'Fecha_fin': row[6]} for row in result])











if __name__ == '__main__':
    app.run(debug=True)
