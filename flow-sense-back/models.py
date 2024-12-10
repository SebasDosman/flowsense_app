# models.py
import pickle

def cargar_modelo(path):
    try:
        with open(path, 'rb') as f:
            return pickle.load(f)
    except Exception as e:
        print(f"Error al cargar el modelo desde {path}: {e}")
        return None

# Cargar los modelos
modelo_siniestros = cargar_modelo('modelo_siniestros.pkl')
modelo_comparendos = cargar_modelo('modelo_comparendos.pkl')
