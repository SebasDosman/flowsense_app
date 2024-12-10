from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import openai
import os
import joblib
import numpy as np
from dotenv import load_dotenv

# Cargar la clave de API de OpenAI desde una variable de entorno
load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

app = Flask(__name__)
CORS(app)

# Cargar los modelos guardados
try:
    modelo_siniestros = joblib.load('modelo_siniestros.pkl')
    modelo_comparendos = joblib.load('modelo_comparendos.pkl')
except Exception as e:
    print(f"Error al cargar los modelos: {e}")
    exit(1)

# Ruta de los archivos para entrenar el chatbot
TRAINING_FILES_PATH = 'training_files'
if not os.path.exists(TRAINING_FILES_PATH):
    os.makedirs(TRAINING_FILES_PATH)

# Variable para mantener el contenido de los archivos en memoria
file_contents = {}

# Definir los rangos para el estado de las variables
def get_variable_status(value, variable):
    ranges = {
        'estrato_vivienda': {'Bajo': (float('-inf'), 3), 'Medio': (3, 5), 'Alto': (5, float('inf'))},
        'hombre': {'Sí': (1, 1), 'No': (0, 0)},
        'edad_grupo_modificado': {'Joven': (18, 35), 'Adulto': (35, 60), 'Mayor': (60, float('inf'))},
        'moto_street': {'Sí': (1, 1), 'No': (0, 0)},
        'moto_scooter': {'Sí': (1, 1), 'No': (0, 0)},
        'costo_casco': {'Bajo': (float('-inf'), 50), 'Medio': (50, 100), 'Alto': (100, float('inf'))},
        'gasto_anual': {'Bajo': (float('-inf'), 10000), 'Medio': (10000, 50000), 'Alto': (50000, float('inf'))},
        'licencia_moto': {'Sí': (1, 1), 'No': (0, 0)},
        'experiencia': {'Baja': (0, 1), 'Media': (1, 5), 'Alta': (5, float('inf'))},
        'riesgo_velocidad': {'Bajo': (float('-inf'), 50), 'Medio': (50, 100), 'Alto': (100, float('inf'))},
        'riesgo_sinlucesdia': {'Bajo': (float('-inf'), 0.2), 'Medio': (0.2, 0.5), 'Alto': (0.5, float('inf'))},
        'epp_casco': {'Sí': (1, 1), 'No': (0, 0)}
    }
    

    for condition, rng in ranges[variable].items():
        if rng[0] <= value < rng[1]:
            return f"Dentro del rango {condition}"
    
    return "Dentro del rango Malo"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        datos_entrada = request.json
        print(f"Datos recibidos: {datos_entrada}")

        # Validar los datos de entrada
        required_fields = ['estrato_vivienda', 'hombre', 'edad_grupo_modificado', 
    'moto_street', 'moto_scooter', 'costo_casco', 
    'gasto_anual', 'licencia_moto', 'experiencia', 
    'riesgo_velocidad', 'riesgo_sinlucesdia', 'epp_casco']
        if not all(field in datos_entrada for field in required_fields):
            return jsonify({'error': 'Missing fields in input data'}), 400

        # Convertir los datos en formato adecuado para los modelos
        input_data = np.array([
            datos_entrada['estrato_vivienda'],
            datos_entrada['hombre'],
            datos_entrada['edad_grupo_modificado'],
            datos_entrada['moto_street'],
            datos_entrada['moto_scooter'],
            datos_entrada['costo_casco'],
            datos_entrada['gasto_anual'],
            datos_entrada['licencia_moto'],
            datos_entrada['experiencia'],
            datos_entrada['riesgo_velocidad'],
            datos_entrada['riesgo_sinlucesdia'],
            datos_entrada['epp_casco'],
        ]).reshape(1, -1)

        print(f"Datos para predicción: {input_data}")

        # Realizar las predicciones con ambos modelos
        pred_siniestros = modelo_siniestros.predict(input_data)[0]
        pred_comparendos = modelo_comparendos.predict(input_data)[0]

        # Mapear el resultado de clasificación a las etiquetas
        siniestro_labels = {0: 'Indica que, tras evaluar todas las características, es poco probable que esta persona cause un accidente.', 1: 'Sugiere que, con base en las características evaluadas, esta persona tiene una mayor probabilidad de causar un accidente.'}
        comparendo_labels = {0: 'Indica que, según el análisis, esta persona tiene un bajo riesgo de recibir un comparendo.', 1: 'Sugiere que, de acuerdo con las características evaluadas, esta persona es más propensa a recibir un comparendo.'}

        siniestro_status = siniestro_labels[pred_siniestros]
        comparendo_status = comparendo_labels[pred_comparendos]

        # Obtener el estado de las variables
        variable_status = {var: get_variable_status(value, var) for var, value in datos_entrada.items()}

        # Formatear resultados
        formatted_result = {
            'Estado del Siniestro': siniestro_status,
            'Estado del Comparendo': comparendo_status,
            'Estado de Variables': {k: v for k, v in variable_status.items()}
        }

        # Crear el prompt para el segundo modelo
        prompt = f"Según estos valores 'Estado de Variables:\n"
        for var, status in variable_status.items():
            prompt += f"{var}: {status}\n"
        prompt += "'Eres un experto y debes dar recomendaciones basadas en el comportamiento del riesgo hacrlo sobre siniestro_status y comparendo_status. Hazlo en máximo 200 tokens de gpt."

        # Obtener la respuesta del modelo GPT-4
        gpt_response = get_gpt4_response(prompt, file_contents)

        return jsonify({'prediction_result': formatted_result, 'gpt_response': gpt_response})

    except Exception as e:
        print(f"Error en la predicción: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/')
def serve_index():
    return render_template('index.html')

def get_gpt4_response(user_input, file_contents):
    try:
        # Construir el contexto de la conversación a partir del contenido de los archivos
        context = "\n\n".join(file_contents.values())
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "system", "content": f"Contexto de los archivos:\n{context}"},
                {"role": "user", "content": user_input}
            ],
            max_tokens=200  # Ajusta el número de tokens según tus necesidades
        )
        return response.choices[0].message['content'].strip()
    except Exception as e:
        return f"Error al obtener respuesta: {str(e)}"

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    question = data.get('question')
    if not question:
        return jsonify({'error': 'No question provided'}), 400

    # Llama a tu modelo GPT-4 para obtener una respuesta
    answer = get_gpt4_response(question, file_contents)
    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=9003)
