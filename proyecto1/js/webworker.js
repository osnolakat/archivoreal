function iniciar() {
	cajadatos = document.getElementById('cajadatos');
	var boton = document.getElementById('boton');
	boton.addEventListener('click', enviar, false);

	trabajador = new Worker('trabajador.js');
	trabajador.addEventListener('message', recibido, false);
}
function enviar() {
	var nombre = document.getElementById('nombre').value;
	trabajador.postMessage(nombre);
}
function recibido(e) {
	cajadatos.innerHTML = e.data;
}
window.addEventListener('load', iniciar, false);


