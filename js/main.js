import { facturas } from "../datos/facturas.js";

const getIva = (porcentajeIVA, base) => (porcentajeIVA / 100) * base;
const parsearFecha = (timestamp) => new Date(timestamp).toLocaleDateString();
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

const listaFacturas = document.querySelector(".lista-facturas");
const pintarFacturaTabla = () => {
    for (const { numero, fecha, concepto }
        of facturas) {
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
        listaFacturas.append(nuevaFactura);
    }
};
pintarFacturaTabla();

