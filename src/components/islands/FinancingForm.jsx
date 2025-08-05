import { useState } from 'react';
import "../../styles/global.css";

export default function FinancingForm({ price }) {
  const [down, setDown] = useState(0);
  const [months, setMonths] = useState(12);

  const cuotaMensual = () => {
    const principal = price - Number(down);
    const rate = 0.05; // 5% anual fijo
    const r = rate / 12; // mensual
    if (r <= 0) return (principal / months).toFixed(2);
    const x = Math.pow(1 + r, months);
    const mensual = (principal * x * r) / (x - 1);
    return mensual.toFixed(2);
  };

  const formatCurrency = (num) => Number(num).toLocaleString('es-DO', {
    style: 'currency',
    currency: 'DOP',
    minimumFractionDigits: 2,
  });

  const plazoOpciones = [6, 12, 18, 24, 36, 48, 60];

  return (
    <>
      <h2 className="text-xl font-semibold text-green-700 text-center">Modifica los datos de tu préstamo aquí</h2>
      
      <form className="py-4 px-6 mx-auto w-full space-y-6 flex flex-col md:flex-row justify-center gap-4 max-w-4xl">

        {/* Monto Inicial */}
        <div className="bg-white p-6 rounded-xl shadow-md text-dark w-full text-left border border-main">
          <label className="block mb-2 font-medium text-lg" htmlFor="monto-inicial">
            Monto inicial
          </label>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">$</span>
            <input
              id="monto-inicial"
              type="number"
              min={0}
              max={price}
              step={1000}
              value={down}
              onChange={e => setDown(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-md bg-main/10 border border-main text-main font-semibold text-right focus:outline-none focus:ring-2 focus:ring-main"
            />
          </div>
        </div>

        {/* Plazo en meses */}
        <div className="bg-white p-6 rounded-xl shadow-inner text-dark w-full text-left border border-main">
          <label className="block mb-2 font-medium text-lg">Plazo:</label>
          <select
            value={months}
            onChange={e => setMonths(Number(e.target.value))}
            className="w-full bg-main/10 text-main font-semibold rounded-md px-3 py-2 border border-main"
          >
            {plazoOpciones.map((m) => {
              let label = `${m} meses`;
              if (m > 6) {
                const years = m / 12;
                const yearLabel = Number.isInteger(years)
                  ? years === 1
                    ? "1 año"
                    : `${years} años`
                  : `${years.toFixed(1)} años`;
                label += ` (${yearLabel})`;
              }
              return (
                <option key={m} value={m}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>

        {/* Resultado */}
        <div className="text-center text-white w-full">
          <p className="text-lg text-dark">Cuota mensual aproximada:</p>
          <p className="text-center text-2xl font-bold text-main bg-main/10 py-2 px-4 rounded-full">{formatCurrency(cuotaMensual())}</p>
        </div>
      </form>
    </>
  );
}
