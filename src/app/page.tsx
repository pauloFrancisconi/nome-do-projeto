
'use client'
import { useState } from "react";

const Page = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [fuel, setFuel] = useState("");
  const [gear, setGear] = useState("");
  const [engineSize, setEngineSize] = useState<number | string>("");
  const [yearModel, setYearModel] = useState<number | string>("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const requestData = {
      brand,
      model,
      fuel,
      gear,
      engine_size: parseFloat(engineSize as string),
      year_model: parseInt(yearModel as string),
    };

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!res.ok) {
        throw new Error("Falha na requisição");
      }

      const data = await res.json();
      setResponse(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Previsão de Preço de Carro
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6"
      >
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Marca:
          </label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Modelo:
          </label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Combustível:
          </label>
          <input
            type="text"
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Câmbio:
          </label>
          <input
            type="text"
            value={gear}
            onChange={(e) => setGear(e.target.value)}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Tamanho do Motor:
          </label>
          <input
            type="number"
            step="0.1"
            value={engineSize}
            onChange={(e) => setEngineSize(e.target.value)}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Ano do Modelo:
          </label>
          <input
            type="number"
            value={yearModel}
            onChange={(e) => setYearModel(e.target.value)}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white font-bold transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Carregando..." : "Enviar Dados"}
        </button>
      </form>

      {response && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
          <h2 className="text-xl font-semibold">Preço Predito:</h2>
          <p className="text-lg">{response.Preco}</p>
        </div>
      )}

      {error && (
        <p className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg">{error}</p>
      )}
    </div>
  );
};

export default Page;
