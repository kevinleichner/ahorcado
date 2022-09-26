var inicio = document.querySelector("#contenidoInicio");
var agregar = document.querySelector("#contenidoAgregarPalabra");
var juego = document.querySelector("#contenidoJuego");
var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");

window.onload = function() {
	agregar.classList.add("ocultar")
	juego.classList.add("ocultar")
}

// CELULAR

var teclado = document.querySelector("#teclado");

if(window.screen.width <= 900){
	teclado.classList.remove('ocultar');
} else {
	teclado.classList.add('ocultar');
}

// PALABRA OCULTA

var palabras = ["cabaña"
// , "nueces", "brisa", "cabaña", "patear", "zapato", "arbol", "laguna", "codigo", "conejo", "bruja", "higo", "frutilla", "pizza", 
// "termo", "lengua", "piano", "campera", "hueso", "corazon", "pajaro"
]
var numeroAzar = Math.floor(Math.random()*palabras.length);
var teclasPresionadas = [];
var letras = document.querySelector("#letras");

var palabra = document.querySelector("#palabra-oculta");
var palabraOculta = palabras[numeroAzar]
var guardarPalabra = Array.from(palabraOculta);
var cantidadDeCaracteres = palabraOculta.length;

palabraOculta = palabraOculta.replace(/./g,'_');
palabraOculta = Array.from(palabraOculta);
palabra.innerHTML = palabraOculta.join('');

var aciertos = 0;
var existenciaErrores = true;
var contadorErrores = 0;
var activador = true;
var inicioJuego = false; 

function Limpiar() {
		pincel.fillStyle = "#fff";
		pincel.fillRect(0, 500, 400, -500);

		numeroAzar = Math.floor(Math.random()*palabras.length);
		palabraOculta = palabras[numeroAzar]
		guardarPalabra = Array.from(palabraOculta);
		cantidadDeCaracteres = palabraOculta.length;
		palabraOculta = palabraOculta.replace(/./g,'_');
		palabraOculta = Array.from(palabraOculta);
		palabra.innerHTML = palabraOculta.join('');
		aciertos = 0;
		contadorErrores = 0;
		letras.innerHTML = '';
		teclasPresionadas = [];
		activador = true;
}

function Errores() {
	if (contadorErrores == 1) {
		pincel.fillStyle = "#0A3871";
		pincel.fillRect(50, 450, 300, 4);
	}
	if (contadorErrores == 2) {
		pincel.fillStyle = "#0A3871";
		pincel.fillRect(100, 450, 4, -400);
	}
	if (contadorErrores == 3) {
		pincel.fillStyle = "#0A3871";
		pincel.fillRect(100, 50, 170, 4);
	}
	if (contadorErrores == 4) {
		pincel.fillStyle = "#0A3871";
		pincel.fillRect(270, 50, 4, 70);
	}
	if (contadorErrores == 5) {
		pincel.fillStyle = "#0A3871";
		pincel.beginPath();
		pincel.arc(270, 150, 30, 0, 2*3.14);
		pincel.fill();
		
		pincel.fillStyle = "#fff";
		pincel.beginPath();
		pincel.arc(270, 150, 26, 0, 2*3.14);
		pincel.fill();
	}
	if (contadorErrores == 6) {
		pincel.fillStyle = "#0A3871";
		pincel.fillRect(270, 180, 4, 150);
	}
	if (contadorErrores == 7) {
		pincel.fillStyle = "#0A3871";
		pincel.beginPath();
		pincel.moveTo(270, 180);
		pincel.lineTo(220, 250);
		pincel.lineTo(270, 250);
		pincel.fill();

		pincel.fillStyle = "#fff";
		pincel.beginPath();
		pincel.moveTo(270, 187);
		pincel.lineTo(225, 250);
		pincel.lineTo(270, 250);
		pincel.fill();
	}
	if (contadorErrores == 8) {
		pincel.fillStyle = "#0A3871";
		pincel.beginPath();
		pincel.moveTo(274, 180);
		pincel.lineTo(324, 250);
		pincel.lineTo(274, 250);
		pincel.fill();

		pincel.fillStyle = "#fff";
		pincel.beginPath();
		pincel.moveTo(274, 187);
		pincel.lineTo(319, 250);
		pincel.lineTo(274, 250);
		pincel.fill();
	}
	if (contadorErrores == 9) {
		pincel.fillStyle = "#0A3871";
		pincel.beginPath();
		pincel.moveTo(270, 323);
		pincel.lineTo(220, 393);
		pincel.lineTo(270, 393);
		pincel.fill();

		pincel.fillStyle = "#fff";
		pincel.beginPath();
		pincel.moveTo(270, 330);
		pincel.lineTo(220, 400);
		pincel.lineTo(270, 400);
		pincel.fill();
	}
	if (contadorErrores == 10) {
		pincel.fillStyle = "#0A3871";
		pincel.beginPath();
		pincel.moveTo(274, 323);
		pincel.lineTo(324, 393);
		pincel.lineTo(274, 393);
		pincel.fill();

		pincel.fillStyle = "#fff";
		pincel.beginPath();
		pincel.moveTo(274, 330);
		pincel.lineTo(319, 393);
		pincel.lineTo(274, 393);
		pincel.fill();
	}
}

function Ganaste() {
	alert("¡¡Felicidades Ganaste!!");
}

function Perdiste() {
	alert("Fin del juego, la palabra era " + guardarPalabra.join('').toUpperCase());
}

document.addEventListener('keydown', (event) => {
	var teclaPresionada = event.key;
	if(window.screen.width <= 900 && teclaPresionada == 'Enter'){
		if (teclado.value.match(/[a-zA-ZñÑ]/g)) {
			teclaPresionada = teclado.value.toLowerCase();
			if(aciertos < cantidadDeCaracteres && contadorErrores < 10 && inicioJuego == true){
			for(var i=0; i < cantidadDeCaracteres ; i++){
			  	if(guardarPalabra[i] == teclaPresionada && teclasPresionadas.indexOf(teclaPresionada) == -1){
			  		palabraOculta.splice(i, 1, teclaPresionada);
					palabra.innerHTML = palabraOculta.join('');
					aciertos++;
					existenciaErrores = false;
			  		}
			} 
			teclado.value = '';
			}
			if(aciertos == cantidadDeCaracteres && existenciaErrores == false && inicioJuego == true){
			setTimeout(Ganaste, 100);
			}
			if (existenciaErrores == true && aciertos < cantidadDeCaracteres && contadorErrores < 10 && teclasPresionadas.indexOf(teclaPresionada) == -1 && inicioJuego == true) {
				contadorErrores++;
				Errores();
				letras.innerHTML += teclaPresionada + ' ';
			} else {
				existenciaErrores = true;
			}
			if (teclasPresionadas.indexOf(teclaPresionada) == -1 && inicioJuego == true) {
				teclasPresionadas.push(teclaPresionada);
			}
			if (contadorErrores == 10 && activador == true && inicioJuego == true){
				setTimeout(Perdiste, 100);
				activador = false;
			}
		} else{
			alert("Ingresar solo letras por favor");
			teclado.value = '';
		}
}

	if (window.screen.width > 900) {
		if (teclaPresionada.match(/[a-zA-ZñÑ]/g)) {
			if(aciertos < cantidadDeCaracteres && contadorErrores < 10 && inicioJuego == true){
				for(var i=0; i < cantidadDeCaracteres ; i++){
				  	if(guardarPalabra[i] == teclaPresionada && teclasPresionadas.indexOf(teclaPresionada) == -1){
				  		palabraOculta.splice(i, 1, teclaPresionada);
						palabra.innerHTML = palabraOculta.join('');
						aciertos++;
						existenciaErrores = false;
				  		}
				} 
			}
			if(aciertos == cantidadDeCaracteres && existenciaErrores == false && inicioJuego == true){
				setTimeout(Ganaste, 100);
			}
			if (existenciaErrores == true && aciertos < cantidadDeCaracteres && contadorErrores < 10 && teclasPresionadas.indexOf(teclaPresionada) == -1 && inicioJuego == true) {
				contadorErrores++;
				Errores();
				letras.innerHTML += teclaPresionada + ' ';
			} else {
				existenciaErrores = true;
			}
			if (teclasPresionadas.indexOf(teclaPresionada) == -1 && inicioJuego == true) {
				teclasPresionadas.push(teclaPresionada);
			}
			if (contadorErrores == 10 && activador == true && inicioJuego == true){
				setTimeout(Perdiste, 100);
				activador = false;
			}
		} else{
			alert("Ingresar solo letras por favor");
			}
	}

}, false);

// BOTONES

var btnInicioJuego = document.querySelector("#btn-inicioJuego");
var btnAgregar = document.querySelector("#btn-agregarPalabra");
var btnGuardar = document.querySelector("#btn-guardar");
var btnCancelar = document.querySelector("#btn-cancelar");
var palabraAgregar = document.querySelector("#palabraAgregar");
var btnNuevoJuego = document.querySelector("#btn-nuevoJuego");
var btnDesistir = document.querySelector("#btn-desistir");

btnInicioJuego.onclick = function() {
    agregar.classList.add("ocultar")
    inicio.classList.add("ocultar")
    juego.classList.remove("ocultar")
    inicioJuego = true;
}

btnAgregar.onclick = function() {
    inicio.classList.add("ocultar")
    juego.classList.add("ocultar")
    agregar.classList.remove("ocultar")
    inicioJuego = false;
}

btnGuardar.onclick = function() {
    if (palabraAgregar.value.match(/^[a-zA-ZñÑ]*$/g)){
    	agregar.classList.add("ocultar")
    	inicio.classList.add("ocultar")
    	juego.classList.remove("ocultar")
    	palabras.push(palabraAgregar.value.toLowerCase());
    	inicioJuego = true;
    	palabraAgregar.value = '';
    } else {
    	alert("Ingresar solo letras por favor");
    	palabraAgregar.value = '';
    }
}

btnCancelar.onclick = function() {
    juego.classList.add("ocultar")
    agregar.classList.add("ocultar")
    inicio.classList.remove("ocultar")
    inicioJuego = false;
}

btnNuevoJuego.onclick = function() {
	Limpiar();
    inicioJuego = true;
}

btnDesistir.onclick = function() {
    agregar.classList.add("ocultar")
    juego.classList.add("ocultar")
    inicio.classList.remove("ocultar")
    Limpiar();
    inicioJuego = false;
}
