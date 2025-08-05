import { createRoot } from 'react-dom/client';
import { useState } from 'react';

export default function ReactFilter({ products, target }) {
  const [marca, setMarca] = useState('');
  const [orden, setOrden] = useState('');

  const filtrados = products
    .filter((p) => !marca || p.marca.toLowerCase() === marca.toLowerCase())
    .sort((a, b) => {
      if (orden === 'asc') return a.precio - b.precio;
      if (orden === 'desc') return b.precio - a.precio;
      return 0;
    });

  const root = createRoot(target);
  root.render(
    <div className="space-y-4">
      <div className="flex gap-4 mb-4">
        <select onChange={(e) => setMarca(e.target.value)} className="border p-2 rounded">
          <option value="">Todas las marcas</option>
          {[...new Set(products.map(p => p.marca))].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <select onChange={(e) => setOrden(e.target.value)} className="border p-2 rounded">
          <option value="">Ordenar por precio</option>
          <option value="asc">Menor a mayor</option>
          <option value="desc">Mayor a menor</option>
        </select>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtrados.map((p) => {
          // Buscar el <ProductCard> correspondiente dentro de los slots renderizados por Astro
          const slot = document.querySelector(`template#card-template`).content.cloneNode(true);
          const card = [...slot.children].find(el => el.outerHTML.includes(`>${p.titulo}<`));
          return <li key={p.slug} dangerouslySetInnerHTML={{ __html: card?.outerHTML || '' }} />;
        })}
      </ul>
    </div>
  );
}
