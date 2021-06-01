const getIva = (porcentajeIVA, base) => (porcentajeIVA / 100) * base;
const total = (base, iva) => base + iva;
const colorFondo = (celda, boolean) =>
  boolean
    ? celda.classList.add("table-success")
    : celda.classList.add("table-danger");
