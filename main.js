const matePrecio = 3000;
const termoPrecio = 9000;
let cantidadMate = 0;
let cantidadTermo = 0;

const mate = {
  nombre: "Mate",
  precio: matePrecio,
};

const termo = {
  nombre: "Termo",
  precio: termoPrecio,
};

let compras = [];

function calcularPrecioMate() {
  cantidadMate = parseInt(
    prompt("Ingrese la cantidad de mates que quiere comprar:")
  );
  if (!isNaN(cantidadMate) && cantidadMate > 0) {
    alert("Cantidad de Mates ingresados: " + cantidadMate);
  } else {
    alert(
      "Ingrese la cantidad de Mates que quiere comprar (que no sea 0 o menos):"
    );
  }
}

function mostrarPrecioMate() {
  if (cantidadMate > 0) {
    const totalPrecio = cantidadMate * mate.precio;
    alert(
      "El precio de los Mates ingresados (" +
        cantidadMate +
        " unidades): $" +
        totalPrecio
    );
  } else {
    alert("Debes ingresar Mates");
  }
}

function calcularPrecioTermo() {
  cantidadTermo = parseInt(prompt("Ingresa la cantidad de Termos:"));
  if (!isNaN(cantidadTermo) && cantidadTermo > 0) {
    alert("Cantidad de Termos ingresada: " + cantidadTermo);
  } else {
    alert(
      "Ingrese la cantidad de Termos que quiere comprar (que no sea 0 o menos):"
    );
  }
}

function mostrarPrecioTermo() {
  if (cantidadTermo > 0) {
    const totalPrecio = cantidadTermo * termo.precio;
    alert(
      "Ell precio de los Termos ingresados (" +
        cantidadTermo +
        " unidades): $" +
        totalPrecio
    );
  } else {
    alert("Debes ingresar Termos");
  }
}

function calcularPrecioTotal(producto) {
  let cantidad, precio;
  if (producto === "mate") {
    cantidad = cantidadMate;
    precio = mate.precio;
  } else if (producto === "termo") {
    cantidad = cantidadTermo;
    precio = termo.precio;
  } else {
    return;
  }

  if (cantidad > 0) {
    let totalPrecio = cantidad * precio;
    if (cantidad > 10) {
      totalPrecio -= totalPrecio * 0.1;
    }
    alert("Precio Total (" + cantidad + " unidades): $" + totalPrecio);

    // array
    compras.push({
      producto: producto,
      cantidad: cantidad,
      totalPrecio: totalPrecio,
    });
  } else {
    alert("Primero ingresa la cantidad de " + producto + "s.");
  }
}

function filtrarPrecios() {
  const preciosLista = document.getElementById("precios-lista");
  preciosLista.innerHTML = "";

  const sortedprecios = [...compras]
    .sort((a, b) => b.totalPrecio - a.totalPrecio)
    .map(
      (compras) => `<li>${compras.producto}: $${compras.totalPrecio}</li>`
    )
    .join("");

  preciosLista.innerHTML = sortedprecios;
}
