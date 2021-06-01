import { facturas } from "../datos/facturas.js";

const getIva = (porcentajeIVA, base) => (porcentajeIVA / 100) * base;
const parsearFecha = (timestamp) => new Date(timestamp).toLocaleDateString();
const total = (base, iva) => +(base + iva).toFixed(2);
const compararFechas = (fecha1, fecha2) => fecha1 - fecha2;
const colorFondo = (celda, boolean) =>
  boolean
    ? celda.classList.add("table-success")
    : celda.classList.add("table-danger");
const vence = (celda, vencimiento, abonada) => {
  if (abonada) {
    celda.textContent = "-";
    colorFondo(celda, abonada);
  } else {
    celda.textContent = vencimiento.toLocaleString();
    const fecha = new Date();
    if (vencimiento < fecha.getTime()) {
      celda.textContent = compararFechas();
      colorFondo(celda, false);
    } else {
      celda.textContent = compararFechas();
      colorFondo(celda, true);
    }
  }
};

const listaFacturas = document.querySelector(".lista-facturas");
const pintarFacturaTabla = () => {
  for (const {
    numero,
    fecha,
    concepto,
    base,
    tipoIva,
    abonada,
    vencimiento,
  } of facturas) {
    const nuevaFactura = document
      .querySelector(".factura-molde")
      .cloneNode(true);
    nuevaFactura.classList.remove("factura-molde");
    nuevaFactura.classList.remove("d-none");
    const numeroFactura = nuevaFactura.querySelector(".numero");
    numeroFactura.textContent = numero;
    const fechaFactura = nuevaFactura.querySelector(".fecha");
    fechaFactura.textContent = parsearFecha(fecha);
    const conceptoFactura = nuevaFactura.querySelector(".concepto");
    conceptoFactura.textContent = concepto;
    const baseFactura = nuevaFactura.querySelector(".base");
    baseFactura.textContent = base;
    const ivaFactura = nuevaFactura.querySelector(".iva");
    const ivaCalculado = getIva(tipoIva, base);
    ivaFactura.textContent = ivaCalculado;
    const totalFactura = nuevaFactura.querySelector(".total-base-iva");
    totalFactura.textContent = total(base, ivaCalculado);
    const estadoFactura = nuevaFactura.querySelector(".estado");
    estadoFactura.textContent = abonada ? "Abonada" : "Pendiente";
    colorFondo(estadoFactura, abonada);
    const venceFactura = nuevaFactura.querySelector(".vence");
    vence(venceFactura, vencimiento, abonada);
    const totalBaseFactura = listaFacturas.append(nuevaFactura);
  }
};
const pintarTotalBase = () => {
  const totalBase = document.querySelector(".total-base");
  totalBase.textContent = facturas.reduce(
    (acumulador, { base }) => acumulador + base,
    0
  );
};
pintarFacturaTabla();
pintarTotalBase();

const totalBase = document.querySelector(".total-base");
totalBase.textContent = `${facturas
  .reduce((acumulador, { base }) => acumulador + base, 0)
  .toFixed(0)}€`;

const pintarTotalIVA = () => {
  const totalIVA = document.querySelector(".total-iva");
  totalIVA.textContent = `${facturas
    .reduce(
      (acumulador, { base, tipoIva }) => acumulador + getIva(base, tipoIva),
      0
    )
    .toFixed(0)}€`;
};
const pintarTotalBaseIVA = () => {
  const totalFinal = document.querySelector(".total-final-base-iva");
  totalFinal.textContent = `${facturas
    .reduce(
      (acumulador, { base, tipoIva }) =>
        acumulador + base + getIva(base, tipoIva),
      0
    )
    .toFixed(0)}€`;
};
pintarTotalIVA();
pintarTotalBaseIVA();
