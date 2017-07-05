window.addEventListener("load",function(){
    if(localStorage.getItem("tareas")){
        printLocalStorage();
    }
    
});

var addBtn = document.querySelector(".addbtn");
addBtn.addEventListener("click",function(){
    crearTarea();
});

function Tarea(id,titulo,descripcion,completado){
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.completado = completado;
    this.contenedor = '';
    this.eliminarTarea = function(){
        removeTaskFromLocalStorage(this);
        var ul = this.contenedor.parentNode;
        ul.removeChild(this.contenedor);
    };
    this.editarTarea = function (){
        var tituloEdit = prompt("editar titulo");
        var descEdit = prompt("editar descripcion");
        var estadoEdit = prompt("cambiar estado");
        estadoEdit === "to do" ? estadoEdit = "to do" : estadoEdit = "done";
        var div = this.contenedor.childNodes[0];
        editTaskFromLocalStorage(div.querySelector("h3").innerText,tituloEdit,descEdit,estadoEdit);
        div.querySelector("h3").innerText = tituloEdit;
        div.querySelector("p").innerText = descEdit;
        div.querySelector("span").innerText = estadoEdit;
        
    };
}
function ListaTareas(){
    id = 0;
    this.tareas = [];
}
var id = 0;

function crearTarea(){
    var titulo = document.getElementById("titulo");
    var desc = document.getElementById("desc");
    var completado = document.getElementById("checkbox");
    
    completado.checked == true ? completado = "done" : completado = " to do";
    var nuevaTarea = new Tarea(id,titulo.value,desc.value,completado);
    id = id+1;
     titulo.value = '';
     desc.value = '';
     completado.checked = false;
    // Lista1.tarea.push(nuevaTarea);
     setTareaInArray(nuevaTarea);
     agregarTarea(nuevaTarea);

}
/*function agregarTareaALista(tarea){

}*/
function agregarTarea(tarea){
    var self = tarea;
    //agregarTareaALista(tarea);
    var nodotitulo =createTextNode(tarea.titulo);
    var nododesc = createTextNode(tarea.descripcion);
    var nodocompletado = createTextNode(tarea.completado);

    
    var labelTitulo = createElement("h3");
    labelTitulo.classList.add("title");
    labelTitulo.classList.add("itemdisplay");
    labelTitulo.appendChild(nodotitulo);

    var labelDesc = createElement("p");
    labelDesc.classList.add("title");
    labelDesc.classList.add("itemdisplay");
    labelDesc.appendChild(nododesc);

    var labelCompletado = createElement("span");
    labelCompletado.classList.add("title");
    labelCompletado.classList.add("itemdisplay");
    labelCompletado.appendChild(nodocompletado);

    /*botones edicion eliminar*/
    var editar = createElement("BUTTON");
    editar.setAttribute("placeholder","editar");
    editar.innerText="Editar";
    var eliminar = createElement("BUTTON");
    eliminar.setAttribute("placeholder","eliminar");
    eliminar.classList.add("deleditbtn");
    eliminar.innerText="Eliminar";
    /** appendear listeners */
    editar.addEventListener("click",function(e){
        self.editarTarea(self);
    });

     eliminar.addEventListener("click",function(e){
        self.eliminarTarea(self);
    });

    var div = createElement("DIV");
    var li = createElement("LI");
    div.appendChild(labelTitulo);
    div.appendChild(labelDesc);
    div.appendChild(labelCompletado);
    li.classList.add("itemstyle");
    li.appendChild(div);
    var divbotonera = createElement("DIV");
    divbotonera.appendChild(editar);
    divbotonera.appendChild(eliminar);
    li.appendChild(divbotonera);
    this.contenedor = li;
    var ul = document.querySelector(".lista");
    ul.appendChild(li);

    tarea.contenedor = li;
    
}

function createTextNode(text){
    return document.createTextNode(text);
}
function createElement(element){
    return document.createElement(element);
}
var tareaArray = [];
var tareaArrayJSON = [];

function setTareaInArray(tarea){
    tareaArray.push(tarea);
    setLocalStorage(tareaArray);
}
function setLocalStorage(tareaArray){
    if(tareaArray.length>0){
        tareaArrayJSON = JSON.stringify(this.tareaArray);
        localStorage.setItem("tareas",tareaArrayJSON);
    }else{
        localStorage.removeItem("tareas");
    }
}

function  getLocalStorage(){
  return localStorage.getItem("tareas");
}
function parseTareas(){
    var tareaArrayJSON = getLocalStorage();
    return tareaArray = JSON.parse(tareaArrayJSON);
}
function printLocalStorage(){
    var  tareas = parseTareas();
    for(var i = 0; i<tareas.length; i++){
        rebuildTarea(tareas[i]);
    };
}

function removeTaskFromLocalStorage(tarea){
    var index = -1;
    for(var i =0; i<tareaArray.length; i++){
        if(tareaArray[i].descripcion === tarea.descripcion){ index = i;}
    }
    tareaArray.splice(index,1);
    setLocalStorage(this.tareaArray);
}

function editTaskFromLocalStorage(tituloviejo,titulo,descripcion,estado){
    for(var i = 0; i<tareaArray.length; i++){
        if(tareaArray[i].titulo === tituloviejo){
            tareaArray[i].titulo = titulo;
            tareaArray[i].descripcion = descripcion;
            tareaArray[i].estado = estado;
        }
    }
    setLocalStorage(this.tareaArray);
}

function rebuildTarea(tarea){
    var nuevaTarea = new Tarea(tarea.id,tarea.titulo,tarea.descripcion,tarea.completado,tarea.contenedor);
     agregarTarea(nuevaTarea);
}