// Asignar el nombre de una variable se hace con Let
// let nombre;
// // Consultarla con console
// console.log(nombre);
// // Asignar valor a variable
// nombre = "Damaris";
// // Constante espacio de la memoria que va a guardar que no va a cambiar su valor


// Hola Mundo desde la consola
// console.log("Hola Mundo desde la consola!");
// Hola mundo desde un alert
// alert("Hola mundo desde un alert");

// Tipo de dato String
// let texto = "Soy un texto";
// // Number
// let numero = 42;
// // Boolean Verdadero, Falso, Prendido, Apagado
// let  verdadero = true;
// let falso = false;
// // Undefined
// let undefined;
// // Null
// let vacio = null;


// EJERCICIO DE SUMA
// let a = 10;
// let b = 20;
// console.log(a + b);


// Definir mi constante y mis variables
const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const elemento = document.querySelector('#elemento');
const input = document.querySelector('input');
const botonAgregar = document.querySelector('#botonAgregar');
const check = 'bi-record-circle';
const tachado = 'tachado';
const uncheck = 'bi-circle';
let LIST;
let id;

const FECHA = new Date ();
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{
    weekday: 'long',
    month: 'short',
    day: 'numeric',
});


// PARAMETROS param se agrega los parametros para que la orden que voy a dar se ejecute
function agregarTarea(tarea,id,hecho,eliminar) {
    if (eliminar) {
        return
    };

    // Va a ver si esta hecho o no
    const realizado = hecho ? check : uncheck;
    const LINE = hecho ? tachado : '';

    // El id es el que cuando le de en la funcion la va a marcar como realizado o ya sea eliminar data hecho va indicar si la tarea ya fue hecha
    const elemento = `<li id="elemento">
    <i id="${id}" data="hecho" class="bi ${realizado}"></i>
    <p class="tarea-lista text ${LINE}"> ${tarea}</p>
    <i id="${id}" data="eliminar" class="bi bi-trash3-fill"></i>
</li> `
lista.insertAdjacentHTML("beforeend", elemento);
};

function tareaRealizada(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);

    const textoTarea = element.parentNode.querySelector('.text');
    if (textoTarea) {
        textoTarea.classList.toggle(tachado);
    }

    LIST[element.id].hecho = !LIST[element.id].hecho; 
}

function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminar = true;
    
};

botonAgregar.addEventListener("click", () => {
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea, id, false, false)
        LIST.push({
            nombre: tarea,
            id: id,
            hecho: false,
            eliminar: false,
        });
        localStorage.setItem("TODO", JSON.stringify(LIST));
        id++;
        input.value = "";
    }
});

lista.addEventListener("click", function(event){
const element = event.target;
const elementData = element.getAttribute("data")
if (elementData == "hecho") {
    tareaRealizada(element);
} else if (elementData == "eliminar") {
    tareaEliminada(element);
};
localStorage.setItem("TODO", JSON.stringify(LIST));
});

let data = localStorage.getItem ("TODO");
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    cargarLista(LIST);
} else {
    LIST = [];
    id = 0;
    
};

function cargarLista(array) {
    array.forEach( 
        function (item) {
            agregarTarea(item.nombre, item.id, item.hecho, item.eliminar);
        }
    );
}