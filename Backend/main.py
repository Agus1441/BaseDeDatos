from flask import Flask, request, jsonify, session
from flasgger import Swagger
import mysql.connector
import hashlib
import secrets

app = Flask(__name__)
app.secret_key = secrets.token_hex(16) 
swagger = Swagger(app)

# Configuración de la base de datos
config_db = {
    'user': 'root',
    'password': 'rootpassword',
    'host': '127.0.0.1',
    'database': 'EscuelaNieve'
}

# Conectar a la base de datos
def get_db_connection():
    try:
        connection = mysql.connector.connect(**config_db)
        return connection
    except Error as e:
        print("Error al conectar a la base de datos:", e)
        return None






# ========== Endpoints para Instructores ==========

# Alta de Instructor
@app.route('/instructores', methods=['POST'])
def crear_instructor():
    """
    Crear un nuevo instructor
    ---
    tags:
      - Instructores
    parameters:
      - name: CI
        in: body
        type: integer
        required: true
        description: Cédula de identidad del instructor
      - name: nombre
        in: body
        type: string
        required: true
        description: Nombre del instructor
      - name: apellido
        in: body
        type: string
        required: true
        description: Apellido del instructor
    responses:
      201:
        description: Instructor creado exitosamente
      400:
        description: Error en la solicitud
      500:
        description: Error interno del servidor
    """
    data = request.json
    ci = data.get('CI')
    nombre = data.get('nombre')
    apellido = data.get('apellido')

    if not (ci and nombre and apellido):
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
      - name: nombre
        in: body
        type: string
        required: true
        description: Nombre actualizado del instructor
      - name: apellido
        in: body
        type: string
        required: true
        description: Apellido actualizado del instructor
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
    data = request.json
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

# Alta de Turno
@app.route('/turnos', methods=['POST'])
def crear_turno():
    """
    Crear un nuevo turno
    ---
    tags:
      - Turnos
    parameters:
      - name: hora_inicio
        in: body
        type: string
        format: time
        required: true
        description: Hora de inicio del turno (HH:MM:SS)
      - name: hora_fin
        in: body
        type: string
        format: time
        required: true
        description: Hora de fin del turno (HH:MM:SS)
    responses:
      201:
        description: Turno creado exitosamente
      400:
        description: Campos requeridos no proporcionados
      500:
        description: Error interno del servidor
    """
    data = request.json
    hora_inicio = data.get('hora_inicio')
    hora_fin = data.get('hora_fin')

    if not (hora_inicio and hora_fin):
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
      - name: hora_inicio
        in: body
        type: string
        format: time
        description: Nueva hora de inicio del turno (HH:MM:SS)
      - name: hora_fin
        in: body
        type: string
        format: time
        description: Nueva hora de fin del turno (HH:MM:SS)
    responses:
      200:
        description: Turno actualizado exitosamente
      400:
        description: Campos requeridos no proporcionados
      404:
        description: Turno no encontrado
      500:
        description: Error interno del servidor
    """
    data = request.json
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

# Alta de Alumno
@app.route('/alumnos', methods=['POST'])
def crear_alumno():
    """
    Crear un nuevo alumno
    ---
    tags:
      - Alumnos
    parameters:
      - name: CI
        in: body
        type: integer
        required: true
        description: Cédula de identidad del alumno
      - name: nombre
        in: body
        type: string
        required: true
        description: Nombre del alumno
      - name: apellido
        in: body
        type: string
        required: true
        description: Apellido del alumno
      - name: fecha_nacimiento
        in: body
        type: string
        format: date
        required: true
        description: Fecha de nacimiento del alumno (YYYY-MM-DD)
      - name: correo
        in: body
        type: string
        required: true
        description: Correo electrónico del alumno
      - name: telefono
        in: body
        type: string
        required: true
        description: Teléfono de contacto del alumno
    responses:
      201:
        description: Alumno creado exitosamente
      400:
        description: Campos requeridos no proporcionados
      500:
        description: Error interno del servidor
    """
    data = request.json
    ci = data.get('CI')
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    fecha_nacimiento = data.get('fecha_nacimiento')
    correo = data.get('correo')
    telefono = data.get('telefono')

    if not (ci and nombre and apellido and fecha_nacimiento and correo and telefono):
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
      - name: nombre
        in: body
        type: string
        description: Nuevo nombre del alumno
      - name: apellido
        in: body
        type: string
        description: Nuevo apellido del alumno
      - name: fecha_nacimiento
        in: body
        type: string
        format: date
        description: Nueva fecha de nacimiento del alumno (YYYY-MM-DD)
      - name: correo
        in: body
        type: string
        description: Nuevo correo electrónico del alumno
      - name: telefono
        in: body
        type: string
        description: Nuevo teléfono de contacto del alumno
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
    data = request.json
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
    cursor.execute("SELECT * FROM login WHERE correo=%s AND contraseña=%s", (correo, password))
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
            INSERT INTO login (correo, contraseña, rol)
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





# ========== Otros Endpoints ===========

# Modificación de Actividad
@app.route('/actividades/<int:id_actividad>', methods=['PUT'])
def modificar_actividad(id_actividad):
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






if __name__ == '__main__':
    app.run(debug=True)
