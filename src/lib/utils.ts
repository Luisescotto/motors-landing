export function formatPrice(value: number | string): string {
  const number = Number(value);
  if (isNaN(number)) return "Precio no disponible";

  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
  }).format(number);
}