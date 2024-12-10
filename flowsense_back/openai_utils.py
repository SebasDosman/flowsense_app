# openai_utils.py
import openai
from config import Config

# Configurar la clave API de OpenAI
openai.api_key = Config.OPENAI_API_KEY

def get_gpt4_response(user_input, file_contents):
    try:
        # Construir el contexto de la conversación a partir del contenido de los archivos
        context = "\n\n".join(file_contents.values())
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "Eres un experto en seguridad vial y debes dar recomendaciones."},
                {"role": "system", "content": f"Contexto de los archivos:\n{context}"},
                {"role": "user", "content": user_input}
            ],
            max_tokens=200  # Ajusta el número de tokens según tus necesidades
        )
        return response.choices[0].message['content'].strip()
    except Exception as e:
        return f"Error al obtener respuesta: {str(e)}"
