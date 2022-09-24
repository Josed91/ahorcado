var palabras = ['CSS','HTML','ORACLE','ALURA','ONE','DIGITO','JAVA','SCRIPT','LETRA','BUG','PAJARO','VENTANA','PAIS','EDITOR','PROGRAMA','ELEMENTO'];
var incorrectas = document.getElementById('letras-incorrectas');
var letrasIncorrectas=[];
var letrasIngresadas=[];
var palabraSecreta="";
var palabraIngresada = ["","","","","","","",""];
let intentos=0;
const intentosmax=8;
var letracapturada = "";
//var patron = /^[a-zA-Z\s]+$/;


function desistir(){
	var menu = document.getElementById('menu-principal').style.display = "block";   
	var juego = document.getElementById('menu-juego').style.display = "none";
	var palabra = document.getElementById('menu-palabra').style.display = "none";
}
function vaciarletras(){
    var dato;
    for(var i=0;i<letrasIncorrectas.length;i++){
        dato=letrasIncorrectas.pop();
    }
    for(var j=0;j<letrasIngresadas.length;j++){
        dato=letrasIngresadas.pop();
    }
}
function palabra(){
	var menu = document.getElementById('menu-principal').style.display = "none";   
	var juego = document.getElementById('menu-juego').style.display = "none";
	var palabra = document.getElementById('menu-palabra').style.display = "block";
}

function juego(){
	var menu = document.getElementById('menu-principal').style.display = "none";   
	var juego = document.getElementById('menu-juego').style.display = "block";
	var palabra = document.getElementById('menu-palabra').style.display = "none";
}

function limpiarLineas(){
    let pantalla = document.getElementById('lineas');
	pantalla.width=pantalla.width;
    pantalla.height=pantalla.height;
}

function dibujarLineas(palabraSecreta){
    limpiarLineas();
    var pantalla = document.getElementById('lineas');
    var pincel = pantalla.getContext('2d');
    pincel.fillStyle = "#0A3871";
    let x = 240;
    for(var i=0;i<palabraSecreta.length;i++){
        pincel.fillRect(x,80,30,3);
        x+=45;
    }
}
function guardarIncorrectas(letra){
    letrasIncorrectas.push(letra);
    incorrectas.value = letrasIncorrectas.join("");
}
function esLetra (caracter){
    var patron = new RegExp("^[A-Za-z]+$");
    return patron.test(caracter);;
}
function esMayuscula(cadena){
    var patroncadena = new RegExp("^[A-Z\\s]+$");
    return patroncadena.test(cadena);
}
function cantidadletras (cadenanueva){
    return cadenanueva.length<9;
}
function guardarpalabra(){
    var palabranueva = document.getElementById('ingreso').value;
    if(esMayuscula(palabranueva) && cantidadletras(palabranueva)){
        palabras.push(palabranueva);
        document.getElementById('ingreso').value="";
        alert("Se agrego palabra");
    }
    else {
        alert("No se puede agregar palabra");
    }
}

function posicion(posicion){
    x = 240;
    x = x + (posicion * 45);
    return x;
}
function dibujarLetra(letra,x,y) {
    let pantalla = document.getElementById("lineas");
    let pincel = pantalla.getContext("2d");
    pincel.beginPath() 
    pincel.fillStyle="#0A3871 "; 
    pincel.font="bold 35px arial"; 
    pincel.fillText(letra,x,y); 
}

function mostrarGano(){
	intentos=11;
	document.getElementById("carteles").style.display = "block";
    document.getElementById("gano").style.display = "block";
    document.getElementById("perdio").style.display = "none";
    document.getElementById("solucion").style.display = "none";
    vaciarletras();
}

function mostrarperdio(){
	
	document.getElementById("carteles").style.display = "block";
    document.getElementById("gano").style.display = "none";
    document.getElementById("perdio").style.display = "block";
    document.getElementById("solucion").style.display = "block";
    document.getElementById("palabracorrecta").innerHTML = palabraSecreta;
    vaciarletras();
}
function seleccionarPalabra(){
	var posicion=Math.floor(Math.random()*palabras.length);
	palabraSecreta=palabras[posicion];
}

function ocultarmensajes(){
	var cartel = document.getElementById('carteles').style.display = "none";
}

function esCorrecta(letra){
    return palabraSecreta.indexOf(letra) !== -1;
}
function dibujarpiso(){
    var pantalla = document.getElementById("dibujo").src = "imagenes/inicio.jpg";
}
function esRepetida(letra){
    return letrasIngresadas.indexOf(letra) !== -1;
}
function dibujarErrores(){
    var error = document.getElementById("dibujo");
    switch (intentos) {
        case 1:
            error.src = "imagenes/error1.jpg";
            break;

        case 2:
            error.src = "imagenes/error2.jpg";
            break;

        case 3:
            error.src = "imagenes/error3.jpg";
            break;

        case 4:
            error.src = "imagenes/error4.jpg";
            break;

        case 5:
            error.src = "imagenes/error5.jpg";
            break;
          
        case 6:
            error.src = "imagenes/error6.jpg";
            break;

        case 7:
            error.src = "imagenes/error7.jpg";
            break;

        case 8:
            error.src = "imagenes/error8.jpg";
            break;

        default:
            break;
      }
} 
function verificarletra(letra){
	if (intentos<intentosmax) {
		if (esLetra(letra) && !esRepetida(letra)){
			letrasIngresadas.push(letra);
			if (esCorrecta(letra)) {
				for(var i = 0 ; i< palabraSecreta.length; i++){
                    if(palabraSecreta[i] == letra){
                        palabraIngresada.splice(i,1,letra);
                        dibujarLetra(letra,posicion(i),70);
                    } 
                }
                if(palabraIngresada.join("") == palabraSecreta){
                    mostrarGano();
                } 
			}
			else{
				intentos++;
                guardarIncorrectas(letra);
                dibujarErrores();
				if(intentos == intentosmax){
					mostrarperdio();

				}
				
			}
		}
	}
	
}

function detectarPresionada(){
        document.addEventListener('keydown', (event) => {
            letraCapturada = event.key;
            verificarletra(letraCapturada.toUpperCase());
		}, false);
}

     
function iniciarJuego(){
	intentos=0;
	juego();
	letraCapturada="";
    letrasIncorrectas=[];
    letrasIngresadas=[];
    
    palabraIngresada = ["","","","","","","",""];
    incorrectas.value="";
	seleccionarPalabra();
    ocultarmensajes()
	dibujarpiso();
	dibujarLineas(palabraSecreta);
	detectarPresionada(letracapturada);
}