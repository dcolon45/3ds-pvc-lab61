/* ============================================================
   3D's PVC Innovative - Calculadora de Cotizaciones
   WADE 1000L - Laboratorio 6.1: Conceptos básicos de JavaScript
   Autor: David
   ============================================================
   Este archivo cubre los siguientes conceptos requeridos:
   1. Declaración de variables y tipos de datos
   2. Arreglos y objetos
   3. Estructuras de control condicionales (if / else if / else)
   4. Bucles (for, while, do...while)
   5. Funciones
   6. Alcance (scope) de variables
   7. Clausuras (closures)
   ============================================================ */


/* ============================================================
   1. VARIABLES Y TIPOS DE DATOS
   ============================================================ */

// String (cadena de texto)
const nombreNegocio = "3D's PVC Innovative";

// Number (número)
let precioBaseporPie = 8; // dólares por pie cuadrado, acabado estándar

// Boolean (booleano)
let incluyeInstalacion = true;

// Undefined (sin definir todavía)
let descuentoAplicado;

// Null (vacío intencionalmente)
let clienteVIP = null;

// Mostramos los tipos de datos en la consola para fines de práctica
console.log("=== TIPOS DE DATOS ===");
console.log("nombreNegocio:", nombreNegocio, "→ tipo:", typeof nombreNegocio);
console.log("precioBaseporPie:", precioBaseporPie, "→ tipo:", typeof precioBaseporPie);
console.log("incluyeInstalacion:", incluyeInstalacion, "→ tipo:", typeof incluyeInstalacion);
console.log("descuentoAplicado:", descuentoAplicado, "→ tipo:", typeof descuentoAplicado);
console.log("clienteVIP:", clienteVIP, "→ tipo:", typeof clienteVIP);


/* ============================================================
   2. ARREGLOS (ARRAYS)
   ============================================================ */

// Arreglo simple de strings: tipos de proyecto disponibles
const tiposDeProyecto = ["cocina", "fachada", "ambos"];

// Arreglo de números: multiplicadores de precio según acabado
const multiplicadoresAcabado = [1, 1.4, 1.9]; // estándar, premium, luxury

console.log("\n=== ARREGLOS ===");
console.log("Tipos de proyecto disponibles:", tiposDeProyecto);
console.log("Multiplicadores de acabado:", multiplicadoresAcabado);


/* ============================================================
   3. OBJETOS
   ============================================================ */

// Objeto que representa la información del negocio
const negocio = {
  nombre: "3D's PVC Innovative",
  ubicacion: "Puerto Rico",
  servicios: ["Cocinas en PVC", "Fachadas en PVC", "Diseño personalizado"],
  añosOperando: 5,
  calificacion: 5
};

console.log("\n=== OBJETOS ===");
console.log("Información del negocio:", negocio);
console.log("Servicios que ofrece:", negocio.servicios.join(", "));


/* ============================================================
   ARREGLO DE OBJETOS - Historial de cotizaciones de ejemplo
   (Se usa más adelante con un bucle for para mostrarlas en pantalla)
   ============================================================ */

const historialCotizaciones = [
  { cliente: "María Rodríguez", tipo: "cocina", pies: 130, total: 1224 },
  { cliente: "Juan Pérez", tipo: "fachada", pies: 270, total: 2125 },
  { cliente: "Ana Torres", tipo: "ambos", pies: 320, total: 4845 },
  { cliente: "Carlos Méndez", tipo: "cocina", pies: 85, total: 952 }
];


/* ============================================================
   4. FUNCIONES
   ============================================================ */

/**
 * Función que calcula el precio base de un proyecto.
 * Practica: parámetros, operadores aritméticos y retorno de valor.
 */
function calcularPrecioBase(pies, multiplicador) {
  return pies * precioBaseporPie * multiplicador;
}

/**
 * Función que aplica el cargo de instalación si corresponde.
 * Practica: estructura condicional dentro de una función.
 */
function aplicarInstalacion(precio, incluye) {
  // ============================================================
  // 5. ESTRUCTURA DE CONTROL CONDICIONAL (if / else)
  // ============================================================
  if (incluye) {
    return precio + precio * 0.15; // 15% adicional por instalación profesional
  } else {
    return precio;
  }
}

/**
 * Función que determina el tipo de descuento según el tamaño del proyecto.
 * Practica: if / else if / else con múltiples condiciones.
 */
function calcularDescuento(pies) {
  let descuento = 0;

  if (pies >= 300) {
    descuento = 0.10; // 10% de descuento en proyectos grandes
  } else if (pies >= 150) {
    descuento = 0.05; // 5% de descuento en proyectos medianos
  } else {
    descuento = 0; // sin descuento en proyectos pequeños
  }

  return descuento;
}

/**
 * Función principal que arma la cotización completa.
 * Combina las funciones anteriores.
 */
function generarCotizacion(tipo, pies, acabado, incluyeInstalacion) {
  // Determinamos el índice del multiplicador según el acabado
  let indiceAcabado = 0;
  if (acabado === "estandar") {
    indiceAcabado = 0;
  } else if (acabado === "premium") {
    indiceAcabado = 1;
  } else if (acabado === "luxury") {
    indiceAcabado = 2;
  }

  const multiplicador = multiplicadoresAcabado[indiceAcabado];

  // Si el tipo es "ambos", se calcula como el doble de área aproximada
  let piesAjustados = pies;
  if (tipo === "ambos") {
    piesAjustados = pies * 1.6; // factor estimado para cocina + fachada
  }

  let precio = calcularPrecioBase(piesAjustados, multiplicador);
  precio = aplicarInstalacion(precio, incluyeInstalacion);

  const descuento = calcularDescuento(pies);
  const totalConDescuento = precio - (precio * descuento);

  return {
    tipo: tipo,
    pies: pies,
    acabado: acabado,
    incluyeInstalacion: incluyeInstalacion,
    precioSinDescuento: precio,
    descuentoAplicado: descuento,
    total: totalConDescuento
  };
}


/* ============================================================
   6. BUCLES (LOOPS)
   ============================================================ */

console.log("\n=== BUCLE FOR: recorriendo el historial de cotizaciones ===");

// Bucle FOR para recorrer el arreglo de objetos
for (let i = 0; i < historialCotizaciones.length; i++) {
  const cot = historialCotizaciones[i];
  console.log(`${i + 1}. ${cot.cliente} - ${cot.tipo} (${cot.pies} pies²) - $${cot.total}`);
}

console.log("\n=== BUCLE WHILE: sumando el total histórico ===");

// Bucle WHILE para sumar todos los totales del historial
let indice = 0;
let totalHistorico = 0;
while (indice < historialCotizaciones.length) {
  totalHistorico += historialCotizaciones[indice].total;
  indice++;
}
console.log("Total histórico facturado:", totalHistorico);

console.log("\n=== BUCLE DO...WHILE: simulando intentos de descuento ===");

// Bucle DO...WHILE para simular la búsqueda de un descuento válido
let intento = 0;
let descuentoEncontrado = false;
do {
  intento++;
  // Simulamos que encontramos un descuento válido en el segundo intento
  if (intento === 2) {
    descuentoEncontrado = true;
  }
  console.log(`Intento ${intento}: descuento encontrado = ${descuentoEncontrado}`);
} while (!descuentoEncontrado && intento < 5);


/* ============================================================
   7. ALCANCE (SCOPE) DE VARIABLES
   ============================================================
   Investigación: en JavaScript existen tres tipos principales
   de alcance:

   - Alcance GLOBAL: variables declaradas fuera de cualquier
     función u bloque. Son accesibles desde cualquier parte
     del archivo (ej. "nombreNegocio" declarada arriba).

   - Alcance de FUNCIÓN: variables declaradas con "var" dentro
     de una función solo existen dentro de esa función.

   - Alcance de BLOQUE: variables declaradas con "let" o "const"
     dentro de un bloque { } (como un if o un for) solo existen
     dentro de ese bloque.
   ============================================================ */

let variableGlobal = "Soy una variable de alcance global";

function demostrarAlcance() {
  let variableLocal = "Soy una variable de alcance local (función)";
  console.log("\n=== ALCANCE (SCOPE) ===");
  console.log(variableGlobal); // Sí se puede acceder, porque es global
  console.log(variableLocal);  // Se puede acceder porque estamos dentro de la función

  if (true) {
    let variableDeBloque = "Soy una variable de alcance de bloque (if)";
    console.log(variableDeBloque); // Solo accesible aquí dentro del bloque if
  }

  // console.log(variableDeBloque); // Esto daría ERROR si lo descomentamos,
  // porque variableDeBloque no existe fuera del bloque if donde fue creada.
}

demostrarAlcance();
// console.log(variableLocal); // Esto también daría ERROR, ya que
// variableLocal no existe fuera de la función demostrarAlcance().


/* ============================================================
   8. CLAUSURAS (CLOSURES)
   ============================================================
   Una clausura ocurre cuando una función "recuerda" el entorno
   (las variables) en el que fue creada, incluso después de que
   la función externa ya terminó de ejecutarse.

   Aquí lo aplicamos a un caso real: un contador de cotizaciones
   generadas, que mantiene su valor en privado y solo se puede
   modificar a través de las funciones que devuelve.
   ============================================================ */

function crearContadorDeCotizaciones() {
  let contador = 0; // Esta variable queda "encerrada" dentro de la clausura

  return {
    incrementar: function () {
      contador++;
      return contador;
    },
    obtenerTotal: function () {
      return contador;
    }
  };
}

// Creamos un contador específico para esta sesión
const contadorSesion = crearContadorDeCotizaciones();

console.log("\n=== CLAUSURAS (CLOSURES) ===");
console.log("Cotizaciones generadas:", contadorSesion.incrementar()); // 1
console.log("Cotizaciones generadas:", contadorSesion.incrementar()); // 2
console.log("Cotizaciones generadas:", contadorSesion.incrementar()); // 3
console.log("Total final de cotizaciones en esta sesión:", contadorSesion.obtenerTotal());

// La variable "contador" NO es accesible directamente desde aquí afuera.
// Solo podemos interactuar con ella a través de las funciones que la clausura expone.
// console.log(contador); // Esto daría ERROR, "contador" no existe en este alcance.


/* ============================================================
   9. INTERACCIÓN CON EL DOM
   (conecta toda la lógica anterior con el HTML)
   ============================================================ */

// Al cargar la página, mostramos el historial de cotizaciones en pantalla
function mostrarHistorialEnPantalla() {
  const lista = document.getElementById("listaHistorial");

  // Bucle FOR para crear un elemento <li> por cada cotización del arreglo
  for (let i = 0; i < historialCotizaciones.length; i++) {
    const cot = historialCotizaciones[i];
    const li = document.createElement("li");
    li.className = "historial-item";
    li.innerHTML = `
      <span class="historial-cliente">${cot.cliente}</span>
      <span class="historial-detalle">${cot.tipo} · ${cot.pies} pies²</span>
      <span class="historial-total">$${cot.total.toLocaleString()}</span>
    `;
    lista.appendChild(li);
  }
}

// Función que se ejecuta cuando el usuario presiona "Calcular cotización"
function manejarCalculoCotizacion() {
  const tipo = document.getElementById("tipoProyecto").value;
  const pies = Number(document.getElementById("piesCuadrados").value);
  const acabado = document.getElementById("acabado").value;
  const incluye = document.getElementById("instalacion").checked;

  // Validación simple con estructura condicional
  if (pies <= 0 || isNaN(pies)) {
    alert("Por favor ingresa un área válida mayor a cero.");
    return;
  }

  const cotizacion = generarCotizacion(tipo, pies, acabado, incluye);

  // Usamos la clausura para contar cuántas cotizaciones ha hecho el usuario
  const numeroDeCotizacion = contadorSesion.incrementar();

  // Mostramos el resultado en consola (para revisar en DevTools)
  console.log("\n=== NUEVA COTIZACIÓN GENERADA ===");
  console.log(cotizacion);

  // Mostramos el resultado en el HTML
  const resumen = document.getElementById("resumenContenido");

  let nombreTipo = "";
  if (tipo === "cocina") {
    nombreTipo = "Cocina en PVC";
  } else if (tipo === "fachada") {
    nombreTipo = "Fachada en PVC";
  } else {
    nombreTipo = "Cocina + Fachada en PVC";
  }

  resumen.innerHTML = `
    <p><strong>Cotización #${numeroDeCotizacion}</strong></p>
    <p>Tipo de proyecto: ${nombreTipo}</p>
    <p>Área: ${cotizacion.pies} pies²</p>
    <p>Acabado: ${cotizacion.acabado}</p>
    <p>Instalación incluida: ${cotizacion.incluyeInstalacion ? "Sí" : "No"}</p>
    <p>Descuento aplicado: ${(cotizacion.descuentoAplicado * 100).toFixed(0)}%</p>
    <p class="resultado-total">Total estimado: $${cotizacion.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
  `;
}

// Conectamos el botón con la función
document.getElementById("btnCalcular").addEventListener("click", manejarCalculoCotizacion);

// Ejecutamos al cargar la página
mostrarHistorialEnPantalla();
