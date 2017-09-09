function iniciar() {
	window.addEventListener('message', receptor, false);
}
function receptor(e) {
	var cajadatos = document.getElementById('cajadatos');
	if (e.origin == 'http://localhost:8080/javascript%20desde%20un%20libro/13%20API%20Communication/13.2%20Cross%20Document%20Messaging') {
	cajadatos.innerHTML = '<p>mesaje valido: '+e.data+'</p>';
	e.source.postMessage('mensaje recibido', e.origin);
	}else{
		cajadatos.innerHTML = '<p>origen inválido</p>';
	}
}
window.addEventListener('load', iniciar, false);