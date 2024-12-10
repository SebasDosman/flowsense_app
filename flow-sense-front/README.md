# FlowSense Front-End

FlowSense es una plataforma para la identificación y mitigación de comportamientos de conducción peligrosos, utilizando analítica de datos e inteligencia artificial. Este repositorio contiene el **front-end** de la aplicación, una **landing page** construida con **Next.js** y **Tailwind CSS**, que se conecta a un back-end en **Flask** para realizar predicciones basadas en los datos proporcionados por el usuario a través de un formulario.

## Tabla de Contenidos
1. [Descripción](#descripción)
2. [Instalación](#instalación)
3. [Uso](#uso)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Conexión con el Back-End](#conexión-con-el-back-end)
6. [Contribuciones](#contribuciones)
7. [Licencia](#licencia)

## Descripción
Este proyecto está construido con **Next.js** y **Tailwind CSS** para la interfaz de usuario, proporcionando una página de aterrizaje informativa y moderna. La página permite a los usuarios enviar datos a través de un formulario **Bootstrap** que se conecta al back-end en **Flask**. El back-end procesa estos datos y devuelve predicciones basadas en modelos de inteligencia artificial.

## Instalación

### Requisitos Previos
- **Node.js** (versión 14+)
- **npm** o **yarn**

### Clonar el Repositorio
```bash
git clone https://github.com/Flow-Sense-App/flow_sense_front.git
cd flow_sense_frontend
```
### Instalar Dependencias
Usa npm o yarn para instalar las dependencias necesarias:
Con npm:
```bash
npm install
```
O con yarn:
```bash
yarn install
```

## Uso
Asegúrate de que las dependencias están instaladas.
Inicia el servidor de desarrollo:
```bash
npm run dev
```
O con yarn:
```bash
yarn dev
``` 
Accede a la página de aterrizaje en `http://localhost:3000` desde tu navegador.

## Estructura del Proyecto de Referencia
```plaintext
flow_sense_frontend/
├── public/                 # Archivos estáticos (imágenes, fuentes, etc.)
├── app/                    # Código fuente
│   ├── components/         # Componentes reutilizables (botones, formularios, etc.)
│   ├── pages/              # Páginas de Next.js (landing, contacto, etc.)
│   ├── styles/             # Archivos CSS con Tailwind
│   ├── utils/              # Utilidades (interacciones, validaciones, etc.)
│   └── services/           # Servicios para interactuar con el back-end
├── .env.local              # Variables de entorno
├── tailwind.config.js      # Configuración de Tailwind CSS
├── package.json            # Dependencias y scripts de proyecto
└── README.md               # Documentación del proyecto
```

## Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir al proyecto, por favor sigue estos pasos:
1. Realiza un fork del repositorio.
2. Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
3. Realiza tus cambios y agrega commits significativos.
4. Envía un Pull Request con una descripción clara de lo que has cambiado o agregado.

## Conexión con el Back-End
El front-end se comunica con el back-end en Flask a través de peticiones HTTP. Los datos del formulario de contacto se envían a la API del back-end, que utiliza modelos de inteligencia artificial para generar predicciones y recomendaciones.

## Licencia
Este proyecto está licenciado bajo la MIT License.