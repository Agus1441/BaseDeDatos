# app.py
from flask import Flask, request, jsonify
from database import get_connection

app = Flask(__name__)

@app.route('/alumnos', methods=['POST'])
def agregar_alumno():
    data = request.json
    try:
        connection = get_connection()
        cursor = connection.cursor()
        sql = "INSERT INTO alumnos (ci, nombre, apellido, fecha_nacimiento, telefono, correo) VALUES (%s, %s, %s, %s, %s, %s)"
        values = (data['ci'], data['nombre'], data['apellido'], data['fecha_nacimiento'], data['telefono'], data['correo'])
        cursor.execute(sql, values)
        connection.commit()
        return jsonify({"mensaje": "Alumno agregado correctamente"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/alumnos', methods=['GET'])
def obtener_alumnos():
    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM alumnos")
        alumnos = cursor.fetchall()
        return jsonify(alumnos), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
