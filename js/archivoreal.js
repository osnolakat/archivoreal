function iniciar(argument) {
	var elemento = document.getElementById('lienzo');
	lienzo = elemento.getContext('2d');
	var archivos = document.getElementById('archivos');
	archivos.addEventListener('change', procesar, false);
	window.webkitRequestFileSystem(window.TEMPORARY, 5*1024*1024, creardd, errores);
}
function creardd(sistema) {
	dd = sistema.root;
	cargarlienzo();
}
function errores(e) {
	alert('Error: '+e.code+' '+e.message);
}
function procesar(e) {
	var archivos = e.target.files;
	for (var f = 0; f < archivos.length; f++) {
		var archivo = archivos[f];
		if (archivo.type.match(/image.*/i)) {
			var lector = new FileReader();
			lector.onload = mostrar;
			lector.readAsDataURL(archivo); 
		}
	}
}
function mostrar(e) {
	var resultado = e.target.result;
	var imagen = new Image();
	imagen.src = resultado;
	imagen.addEventListener('load', function () {
		var x = Math.floor(Math.random()*451);
		var y = Math.floor(Math.random()*301);
		lienzo.drawImage(imagen,x,y,100,100);
		grabarlienzo();
	}, false);
}
function cargarlienzo() {
	dd.getFile('lienzo.dat', {create: false}, function (entrada) {
		entrada.file(function (archivo) {
			var lector = new FileReader();
			lector.onload = function (e) {
				var imagen = new Image();
				imagen.src = e.target.result;
				imagen.addEventListener('load', function () {
					lienzo.drawImage(imagen,0,0);
				}, false);
			};
			lector.readAsBinarySString(archivo);
		}, errores);
	}, errores);
}
function grabarlienzo() {
	var elemento = document.getElementById('lienzo');
	var info = elemento.toDataURL();
	dd.getFile('lienzo.dat', {create: true, explusive: false}, function (entrada) {
		entrada.createWriter(function (fileWriter) {
			var blob = new WebKitBlobBuilder();
			blob.append(info);
			fileWriter.write(blob.getBlob());
		}, errores);
	}, errores);
}
window.addEventListener('load', iniciar, false);