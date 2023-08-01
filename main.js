// Variables para los precios de mate y termo
const matePrecio = 3000;
const termoPrecio = 9000;

// Elementos del DOM
const cantidadMateInput = document.querySelector("#cantidadMateInput");
const calcularMateBtn = document.querySelector("#calcularMateBtn");
const mostrarMateBtn = document.querySelector("#mostrarMateBtn");
const calcularTotalMateBtn = document.querySelector("#calcularTotalMateBtn");
const cantidadTermoInput = document.querySelector("#cantidadTermoInput");
const calcularTermoBtn = document.querySelector("#calcularTermoBtn");
const mostrarTermoBtn = document.querySelector("#mostrarTermoBtn");
const calcularTotalTermoBtn = document.querySelector("#calcularTotalTermoBtn");
const filtrarPreciosBtn = document.querySelector("#filtrarPreciosBtn");
const preciosLista = document.querySelector("#precios-lista");

// Datos de compra
let compras = [];

// Funciones para almacenar y recuperar datos del Local Storage usando JSON
function guardarDatos(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function obtenerDatos(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// Funciones de respuesta a eventos
function calcularPrecioMate() {
  const cantidadMate = parseInt(cantidadMateInput.value);
  if (!isNaN(cantidadMate) && cantidadMate > 0) {
    guardarDatos("cantidadMate", cantidadMate);
    mostrarResultado(`Cantidad de Mates ingresados: ${cantidadMate}`);
  } else {
    mostrarError(
      "Ingrese una cantidad válida de Mates que desea comprar (mayor a 0)."
    );
  }
}

function mostrarPrecioMate() {
  const cantidadMate = obtenerDatos("cantidadMate");
  if (cantidadMate > 0) {
    const totalPrecio = cantidadMate * matePrecio;
    mostrarResultado(
      `El precio de los Mates ingresados (${cantidadMate} unidades): $${totalPrecio}`
    );
  } else {
    mostrarError("Primero ingrese la cantidad de Mates.");
  }
}

function calcularPrecioTotal(producto, cantidad, precio) {
  cantidad = parseInt(cantidad);
  if (cantidad > 0) {
    let totalPrecio = cantidad * precio;
    if (cantidad > 10) {
      totalPrecio -= totalPrecio * 0.1;
    }

    mostrarResultado(`Precio Total (${cantidad} unidades): $${totalPrecio}`);

    // Almacenar datos de compra en el array
    compras.push({
      producto: producto,
      cantidad: cantidad,
      totalPrecio: totalPrecio,
    });
  } else {
    mostrarError(`Primero ingrese la cantidad de ${producto}s.`);
  }
}

function calcularPrecioTermo() {
  const cantidadTermo = parseInt(cantidadTermoInput.value);
  if (!isNaN(cantidadTermo) && cantidadTermo > 0) {
    guardarDatos("cantidadTermo", cantidadTermo);
    mostrarResultado(`Cantidad de Termos ingresados: ${cantidadTermo}`);
  } else {
    mostrarError(
      "Ingrese una cantidad válida de Termos que desea comprar (mayor a 0)."
    );
  }
}

function mostrarPrecioTermo() {
  const cantidadTermo = obtenerDatos("cantidadTermo");
  if (cantidadTermo > 0) {
    const totalPrecio = cantidadTermo * termoPrecio;
    mostrarResultado(
      `El precio de los Termos ingresados (${cantidadTermo} unidades): $${totalPrecio}`
    );
  } else {
    mostrarError("Primero ingrese la cantidad de Termos.");
  }
}

function calcularTotal() {
  const cantidadMate = obtenerDatos("cantidadMate");
  const cantidadTermo = obtenerDatos("cantidadTermo");
  const totalMate = cantidadMate ? cantidadMate * matePrecio : 0;
  const totalTermo = cantidadTermo ? cantidadTermo * termoPrecio : 0;
  const total = totalMate + totalTermo;
  mostrarResultado(`Total a pagar: $${total}`);
}

function filtrarPrecios() {
  preciosLista.innerHTML = "";

  const sortedPrecios = [...compras]
    .sort((a, b) => b.totalPrecio - a.totalPrecio)
    .map((compra) => `<li>${compra.producto}: $${compra.totalPrecio}</li>`)
    .join("");

  preciosLista.innerHTML = sortedPrecios;
}

// Event listeners para los botones
calcularMateBtn.addEventListener("click", calcularPrecioMate);
mostrarMateBtn.addEventListener("click", mostrarPrecioMate);
calcularTotalMateBtn.addEventListener("click", () =>
  calcularPrecioTotal("Mate", cantidadMateInput.value, matePrecio)
);
calcularTermoBtn.addEventListener("click", calcularPrecioTermo);
mostrarTermoBtn.addEventListener("click", mostrarPrecioTermo);
calcularTotalTermoBtn.addEventListener("click", () =>
  calcularPrecioTotal("Termo", cantidadTermoInput.value, termoPrecio)
);
filtrarPreciosBtn.addEventListener("click", filtrarPrecios);

// Funciones de manipulación del DOM
function mostrarResultado(mensaje) {
  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("resultado");
  resultadoDiv.textContent = mensaje;
  document.body.appendChild(resultadoDiv);
  setTimeout(() => resultadoDiv.remove(), 3500);
}

function mostrarError(mensaje) {
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("error");
  errorDiv.textContent = mensaje;
  document.body.appendChild(errorDiv);
  setTimeout(() => errorDiv.remove(), 3500);
}
