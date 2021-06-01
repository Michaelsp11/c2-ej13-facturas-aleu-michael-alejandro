const getIva = (porcentajeIVA, base) => (porcentajeIVA / 100) * base;
const total = (base, iva) => base + iva;
const estado = (estado, abonada) =>
  abonada
    ? estado.classList.add("table-success")
    : estado.classList.add("table-danger");
