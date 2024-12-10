"use client";

import React, { useState } from 'react';
import axios from 'axios';

export default function PredictionForm() {
  const [formData, setFormData] = useState({
    estrato_vivienda: 1,
    hombre: 1,
    edad_grupo_modificado: 30,
    moto_street: 1,
    moto_scooter: 0,
    costo_casco: 500000,
    gasto_anual: 2000000,
    licencia_moto: 1,
    experiencia: 5,
    riesgo_velocidad: 3,
    riesgo_sinlucesdia: 2,
    epp_casco: 1,
  });

  const [loading, setLoading] = useState(false);
  interface PredictionResult {
    error?: string;
    prediction_result?: {
      'Estado del Siniestro': string;
      'Estado del Comparendo': string;
      'Estado de Variables': Record<string, number>;
    };
    gpt_response?: string;
  }

  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value, 10),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://93.127.213.95:5003/predict', formData);
      setResult(response.data);
    } catch (error) {
      setResult({ error: `Hubo un error en la predicción. Por favor, intenta de nuevo: ${ error }` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Formulario de Predicción</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="estrato_vivienda">
              Estrato de la Vivienda
            </label>
            <select
              id="estrato_vivienda"
              name="estrato_vivienda"
              className="form-input w-full py-2 rounded-md"
              value={formData.estrato_vivienda}
              onChange={handleChange}
              required
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="hombre">
              Género
            </label>
            <select
              id="hombre"
              name="hombre"
              className="form-input w-full py-2 rounded-md"
              value={formData.hombre}
              onChange={handleChange}
              required
            >
              <option value={1}>Hombre</option>
              <option value={0}>Mujer</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="edad_grupo_modificado">
              Edad
            </label>
            <input
              id="edad_grupo_modificado"
              name="edad_grupo_modificado"
              className="form-input w-full py-2 rounded-md"
              type="number"
              value={formData.edad_grupo_modificado}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="moto_street">
              ¿Es Moto "Street"?
            </label>
            <select
              id="moto_street"
              name="moto_street"
              className="form-input w-full py-2 rounded-md"
              value={formData.moto_street}
              onChange={handleChange}
              required
            >
              <option value={1}>Sí</option>
              <option value={0}>No</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="moto_scooter">
              ¿Es Moto "Scooter"?
            </label>
            <select
              id="moto_scooter"
              name="moto_scooter"
              className="form-input w-full py-2 rounded-md"
              value={formData.moto_scooter}
              onChange={handleChange}
              required
            >
              <option value={1}>Sí</option>
              <option value={0}>No</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="costo_casco">
              Costo del Casco
            </label>
            <input
              id="costo_casco"
              name="costo_casco"
              className="form-input w-full py-2 rounded-md"
              type="number"
              value={formData.costo_casco}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="gasto_anual">
              Gasto Anual
            </label>
            <input
              id="gasto_anual"
              name="gasto_anual"
              className="form-input w-full py-2 rounded-md"
              type="number"
              value={formData.gasto_anual}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="licencia_moto">
              ¿Tiene Licencia de Moto?
            </label>
            <select
              id="licencia_moto"
              name="licencia_moto"
              className="form-input w-full py-2 rounded-md"
              value={formData.licencia_moto}
              onChange={handleChange}
              required
            >
              <option value={1}>Sí</option>
              <option value={0}>No</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="experiencia">
              Años de Experiencia en Conducción
            </label>
            <input
              id="experiencia"
              name="experiencia"
              className="form-input w-full py-2 rounded-md"
              type="number"
              value={formData.experiencia}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="riesgo_velocidad">
              Riesgo de Velocidad
            </label>
            <input
              id="riesgo_velocidad"
              name="riesgo_velocidad"
              className="form-input w-full py-2 rounded-md"
              type="number"
              value={formData.riesgo_velocidad}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="riesgo_sinlucesdia">
              Riesgo de Velocidad sin Luces de Día
            </label>
            <input
              id="riesgo_sinlucesdia"
              name="riesgo_sinlucesdia"
              className="form-input w-full py-2 rounded-md"
              type="number"
              value={formData.riesgo_sinlucesdia}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="epp_casco">
              ¿Usa Casco y/o Protección Personal?
            </label>
            <select
              id="epp_casco"
              name="epp_casco"
              className="form-input w-full py-2 rounded-md"
              value={formData.epp_casco}
              onChange={handleChange}
              required
            >
              <option value={1}>Sí</option>
              <option value={0}>No</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <button className="btn w-full bg-gradient-to-t from-orange-600 to-orange-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%]">
            Enviar
          </button>
        </div>
      </form>

      {/* Bottom link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Al contactarnos, aceptas los{" "}
          <a
            className="whitespace-nowrap font-medium text-gray-700 underline hover:no-underline"
            href="#0"
          >
            Términos de Servicio
          </a>{" "}
          y la{" "}
          <a
            className="whitespace-nowrap font-medium text-gray-700 underline hover:no-underline"
            href="#0"
          >
            Política de Privacidad
          </a>
          .
        </p>
      </div>

      <h2 className="mt-5 text-center">Resultado de la Predicción</h2>
      {loading && (
        <div className="d-flex justify-content-center mt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {result && (
        <div id="result" className="p-3 rounded bg-light form-container mt-4">
          {result.error ? (
            <p>{result.error}</p>
          ) : (
            <>
              <p><strong>Estado del Siniestro:</strong> {result.prediction_result?.['Estado del Siniestro']}</p>
              <p><strong>Estado del Comparendo:</strong> {result.prediction_result?.['Estado del Comparendo']}</p>
              <h3>Estado de Variables:</h3>
              <ul>
                {Object.entries(result.prediction_result?.['Estado de Variables'] || {}).map(([key, value]) => (
                  <li key={key}>{key}: {(value as number).toLocaleString('es-ES')}</li>
                ))}
              </ul>
              <h3>Recomendaciones:</h3>
              <p>{result.gpt_response}</p>
            </>
          )}
        </div>
      )}
    </>
  );
}