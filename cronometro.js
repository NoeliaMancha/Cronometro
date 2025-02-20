let pantalla = document.getElementById("pantalla");
let parrafoPantalla =document.getElementById("parrafoPantalla");
const botonIniciar = document.getElementById('inicio');

botonIniciar.addEventListener('click', e => {
    // Ocultamos la pantalla, el unicornio y el botón de iniciar
    document.getElementById("pantalla").style.display = "none";
    botonIniciar.style.display = "none";  // También ocultamos el botón "Iniciar"
    intervalId=setInterval(iniciarContador, 10);

});

let contador = document.getElementById("contador");
let iniciar = document.getElementById("iniciar");
let parar = document.getElementById("parar");
let reset = document.getElementById("reset");
let segundos = 0;
let minutos = 0;
let horas = 0;

let intervalId;

function formatearTiempo(valor) {
    return valor < 10 ? "0" + valor : valor;
}

function iniciarContador(){
    segundos+=1;
    if(segundos == 60){
        minutos +=1;
        segundos =0;
    }else if(minutos == 60){
        horas+=1;
        minutos=0;
    }
    
    contador.innerHTML = formatearTiempo(horas) + ":" + formatearTiempo(minutos) + ":" + formatearTiempo(segundos);

    if(minutos == 10){
        pantalla.style.display = "flex";
        botonIniciar.style.display = "flex";
        parrafoPantalla.innerHTML = "Se acabó el tiempo";
        botonIniciar.innerHTML = "Reiniciar";
        botonIniciar.addEventListener("click", e =>{
            location.reload();
        }); // Agregar el nuevo evento
    }
}

parar.addEventListener('click', ()=>{
    clearInterval(intervalId);
});

reset.addEventListener('click', ()=>{
    contador.innerHTML="00:00:00";
    segundos = 0;
    minutos = 0;
    horas = 0;
});

iniciar.addEventListener('click', ()=>{
    clearInterval(intervalId);
    intervalId=setInterval(iniciarContador, 10);
});

let enunciado = document.getElementById('enunciado');

// creamos una variable que va a corresponder a la fecha actual
let fechaActual = new Date();

// creamos una variable que va a corresponder a la seleccionada en el calendario
let fechaSelect = document.getElementById('SelectDateInput');

/*
A la fecha seleccionada en el calendario le ponemos una oreja de escucha de tipo change (para que el resultado salga inmediatamente
despues de seleccionar la fecha)
Y en la función vamos creando las diferentes variables para sacar los años  los días
*/
fechaSelect.addEventListener("change", (event) => {
    let SelectDate = new Date(fechaSelect.value);
    
    // Calculamos la diferencia entre las dos fechas
    let diferencia = Math.abs(fechaActual - SelectDate); // usamos Math.abs() para obtener la diferencia absoluta

    let año = diferencia / (1000 * 60 * 60 * 24 * 365.25); // año con decimales
    let añoSinDecimales = Math.floor(año); // redondear el año hacia abajo
    let decimalesSobra = año - añoSinDecimales;
    let dias = decimalesSobra * 365.25; // los días en milisegundos a decimal
    let diaSinDecimales = Math.floor(dias); // redondear el día hacia abajo

    // Calcular horas, minutos y segundos
    let milisegundosRestantes = diferencia - (añoSinDecimales * 1000 * 60 * 60 * 24 * 365.25) - (diaSinDecimales * 1000 * 60 * 60 * 24);
    let horasFecha = Math.floor(milisegundosRestantes / (1000 * 60 * 60));
    let horasFechaSinDecimales = Math.floor(horasFecha);
    milisegundosRestantes -= horasFecha * (1000 * 60 * 60);
    let minutosFecha = Math.floor(milisegundosRestantes / (1000 * 60));
    milisegundosRestantes -= minutosFecha * (1000 * 60);
    let segundosFecha = Math.floor(milisegundosRestantes / 1000);

    // creamos una variable que sea el campo del resultado y le inyectamos lo que queremos
    if (fechaActual < SelectDate) {
        enunciado.innerHTML = "Faltan (Años/Días/Horas) para la fecha que has seleccionado";
        contador.innerHTML = formatearTiempo(añoSinDecimales) + ":" + formatearTiempo(diaSinDecimales) + ":" + formatearTiempo(horasFechaSinDecimales);
    } else {
        enunciado.innerHTML = "Han pasado (Años/Días/Horas) desde la fecha que has seleccionado";
        contador.innerHTML = formatearTiempo(añoSinDecimales) + ":" + formatearTiempo(diaSinDecimales) + ":" + formatearTiempo(horasFechaSinDecimales);
    }
});









