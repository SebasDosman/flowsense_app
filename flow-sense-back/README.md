# FlowSense

FlowSense es una aplicación Flask que permite realizar predicciones en base a diversos factores de riesgo asociados con el uso de motocicletas. Utiliza un modelo de machine learning para generar predicciones y proporciona recomendaciones específicas.

## Tabla de Contenidos
1. [Descripción](#descripción)
2. [Instalación](#instalación)
3. [Uso](#uso)
4. [API Endpoints](#api-endpoints)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Contribuciones](#contribuciones)
7. [Licencia](#licencia)

## Descripción
Este proyecto está construido en **Flask** y se complementa con una interfaz en **Bootstrap** que permite a los usuarios interactuar con el modelo de predicción. Además, utiliza jQuery para enviar peticiones AJAX a un servidor Flask, el cual procesa los datos y devuelve una predicción.

## Instalación

### Requisitos Previos
- **Python 3.8+**
- **pip**
- Opcional: Entorno virtual (recomendado para aislar dependencias)

### Clonar el Repositorio
```bash
git clone https://github.com/Flow-Sense-App/flow_sense_back
cd flowsense
```

### Crear el Entorno Virtual y Activarlo
```bash
python3 -m venv venv
source venv/bin/activate  # En Windows usa `venv\Scripts\activate`
```

### Instalar Dependencias
Usa el archivo requirements.txt para instalar todas las dependencias necesarias:
```bash
pip install -r requirements.txt
```

### Configuración
Crea un archivo .env en la raíz del proyecto y define tus configuraciones (puedes omitir este paso si no usas variables de entorno específicas):
```bash
OPENAI_API_KEY=<OPENAI_API_KEY>
```

## Uso
1. Asegúrate de que el entorno virtual está activado.
2. Inicia la aplicación:
```bash
flask run
```
3. Accede a la aplicación en `http://127.0.0.1:5000` desde tu navegador.

### API Endpoints
`POST /predict`: Recibe los datos enviados desde el formulario y devuelve el resultado de la predicción en formato JSON.
#### Ejemplo de Solicitud
```json
POST http://127.0.0.1:5000/predict
Content-Type: application/json

{
  "estrato_vivienda": 2,
  "hombre": 1,
  "edad_grupo_modificado": 30,
  "moto_street": 1,
  "moto_scooter": 0,
  "costo_casco": 500000,
  "gasto_anual": 2000000,
  "licencia_moto": 1,
  "experiencia": 5,
  "riesgo_velocidad": 3,
  "riesgo_sinlucesdia": 2,
  "epp_casco": 1
}
```
#### Ejemplo de Respuesta
```json
{
  "prediction_result": {
    "Estado del Siniestro": "Alto riesgo",
    "Estado del Comparendo": "No emitido",
    "Estado de Variables": {
      "factor_1": "valor_1",
      "factor_2": "valor_2"
    }
  },
  "gpt_response": "Se recomienda conducir a velocidades moderadas y usar casco en todo momento."
}
```

## Estructura del Proyecto
```plaintext
flowsense/
├── app/                   # Contiene la lógica principal de la aplicación
│   ├── __init__.py        # Inicialización del paquete Flask
│   ├── routes.py          # Define las rutas y lógica de predicción
│   └── templates/         # Archivos HTML
├── static/                # Archivos estáticos (CSS, JS, imágenes)
├── tests/                 # Tests unitarios para la aplicación
├── .gitignore
├── requirements.txt       # Dependencias del proyecto
├── README.md              # Documentación del proyecto
└── run.py                 # Punto de entrada principal
```

## Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un Issue o envía un Pull Request con tus cambios y una breve descripción de lo que has mejorado o agregado.

## Licencia
Este proyecto está licenciado bajo la MIT License.
