import { useState } from 'react';
import "../../styles/global.css"

export default function FinancingForm({ price }) {
  const [down, setDown] = useState(0);
  const [rate, setRate] = useState(5);    // tasa anual por defecto
  const [months, setMonths] = useState(12);

  // Función que calcula la cuota mensual (EMI) según fórmula de préstamo
  const cuotaMensual = () => {
    const principal = price - Number(down);
    const r = rate/100/12; // tasa mensual (decimal)
    if (r <= 0) {
      // Si la tasa es 0, se reparte principal equitativamente
      return (principal / months).toFixed(2);
    }
    const x = Math.pow(1 + r, months);
    const mensual = (principal * x * r) / (x - 1);
    return mensual.toFixed(2);
  };

  return (
    <form className='py-6 px-4 bg-dark-card rounded-md'>
      <h2 className='text-2xl'>Calcular financiamiento</h2>
      <div className='flex flex-col'>
        <label className='py-2'>Monto inicial(RD$):</label>
          <input type="number" className='border-2 border-slate-200 rounded-md px-2 py-1 w-full bg-slate-600/40' value={down} onChange={e => setDown(e.target.value)} />
        
      </div>
      <div className='flex flex-col'>
        <label className='py-2'>Tasa anual (%):</label>
          <input type="number" className='border-2 border-slate-200 rounded-md px-2 py-1 w-full bg-slate-600/40' value={rate} onChange={e => setRate(e.target.value)} />
        
      </div>
      <div className='flex flex-col '>
        <label className='py-2'>Plazo (meses): </label>
          <input type="number" className='border-2 border-slate-200 rounded-md px-2 py-1 w-full bg-slate-600/40' value={months} onChange={e => setMonths(e.target.value)} />
        
      </div>
      <p className='text-xl pt-6'>Cuota mensual aproximada: ${cuotaMensual()}</p>
    </form>
  );
}