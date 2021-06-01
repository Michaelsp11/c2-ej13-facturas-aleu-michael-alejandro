const getIva = (porcentajeIVA, base) => (porcentajeIVA / 100) * base;
const total = (base, iva) => base + iva;
const compararFechas = () => true;
const colorFondo = (celda, boolean) =>
  boolean
    ? celda.classList.add("table-success")
    : celda.classList.add("table-danger");
const vence = (celda, vencimiento, abonada, callback) => {
  if (abonada) {
    celda.textContent = "-";
    callback(celda, abonada);
  } else {
    celda.textContent = vencimiento.toLocaleString();
    if (vencimiento < Date.getTime()) {
      celda.textContent = compararFechas();
      callback(celda, false);
    } else {
      celda.textContent = compararFechas();
      callback(celda, true);
    }
  }
};
