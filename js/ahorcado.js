var listaPalabras = ['ALURA','EDUCATION'];
var letrasIngresadas =[];
var palabraIngresada;
var paso = 0;
var inputPalabra = document.getElementById("input-nueva-palabra")


var palabraSecreta;
function escojerPalabra() {
    var a = Math.round(  Math.random() * listaPalabras.length);

    a = listaPalabras.length == a ? (a - 1):a;
    palabraSecreta = listaPalabras[a];
    console.log("Palabra: "+palabraSecreta);
    palabraIngresada = new Array(palabraSecreta.length);
    return palabraSecreta;
}

function validarPalabra(palabra) {
    var exito  = true;
    var palabra = palabra.toUpperCase();
    for (let i = 0; i < palabra.length; i++) {
        var codigo = palabra[i].charCodeAt(0);
        if( !(codigo > 64 && codigo < 91) || palabra.trim().length == 0) {
            alert("Error solamente mayusculas");
            exito = false;
            break;
        }
    }
    return exito;
}


function agregarPalabra() {
    var palabra = inputPalabra.value.toUpperCase().trim();

    if (listaPalabras.indexOf(palabra) >= 0 ) {
        alert("Está ingresado en el listado");
        return;
    }
    if (validarPalabra(palabra)) {
        listaPalabras.push(palabra);
        console.log(listaPalabras);
    }
}

function iniciarJ() {
    console.log("iniciarJ");
    paso = 0;
    letrasIngresadas =[];
    palabraSecreta = escojerPalabra();
    window.addEventListener( "keydown", capturaLetra);
    dTablero(palabraSecreta);

}


function validarLetra(letra, codigo) {
    letra = letra.toUpperCase();
    var acentos = ['Á','É','Í','Ó','Ú']
    if (codigo > 64 && codigo < 91) {
        if (acentos.indexOf(letra) < 0 ) {
            if (letrasIngresadas.indexOf(letra) < 0) {
                return true;    
            }
            
        }
    }
    return false;
}

function coincideLetra(letra) {
    var coincide = false
    if (palabraSecreta.indexOf(letra) >= 0) {
        coincide = true;
    }
    letrasIngresadas.push(letra);
    return coincide;
}


function capturaLetra(evento) {
    console.log("capturaLetra");
    var letra = evento.key.toUpperCase();
    if (validarLetra(letra, evento.keyCode) && paso < 10) {
        if(coincideLetra(letra)){ 
            dLetrac(letra);
            if (palabraSecreta == palabraIngresada.join('')) {
                paso = 11;
                dAhorcado(paso);
            }
        }else{
            dLetra(letra);
            dAhorcado(++paso);
        }
    }
}



var btnIniciar = document.querySelector("#iniciar-juego");
btnIniciar.onclick = iniciarJ;

var btnAgregar = document.querySelector("#nueva-palabra");
btnAgregar.onclick = agregarPalabra;
