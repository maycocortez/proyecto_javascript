
//Fetch
async function traerProductosJson() {
  const response = await fetch("productos.json");
  return await response.json();
}



//ARRAYS



let carrito = JSON.parse(localStorage.getItem("artistaCarrito")) ?? []
let sugerenciaUsuario = []
let productos = []



//DOM

let botonSugerencia = document.getElementById("botonSugerencia")
let divProductos = document.getElementById("divProductos")
let formulario = document.getElementById("formulario")
const recuadroProductos = document.querySelector("#recuadroProductos");


fetch("productos.json")
  .then((response) => response.json())
.then((data) => {
data.forEach( (artista)=> { 

  const {nombre,album,formato,precio,id,img} = artista
recuadroProductos.innerHTML += `

    <div class="col-sm-12 col-md-6 col-xl-4 text-center p-5">
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">${nombre}</h5>
          <h6 class="card-subtitle text-muted">${album}</h6>
        </div>
          <img src="${img}" alt="">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${album}</li>
          <li class="list-group-item">${formato}</li>
          <li class="list-group-item">${precio}</li>
        </ul>
        <div class="card-body">
          <button class="btn btn-dark boton1" id="boton${id}">Añadir al carrito</button>
        </div>
      </div>

`

})

////// ESTO ES LO QUE NO ME SALE//////////////////////////
let btns = document.querySelectorAll(".boton1")
btns.forEach((e) =>
e.addEventListener("click",() =>{

  
  const dataGuardada = data.find((artista) => artista.id === this.id);
  
  console.log(dataGuardada)

    
    localStorage.setItem("artistaCarrito", JSON.stringify(carrito))
    //TOASTIFY
    Toastify({
      text: "Añadido al carrito!",
      duration: 3000,
      close: true,
      gravity: "top", // 
      position: "right",
      stopOnFocus: true, 
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
   
    }).showToast();

 
}))
})

//////////////////////////////////////////////////


//EVENTOS

formulario.addEventListener("submit", (e) => {
    e.preventDefault()
    let datForm = new FormData (e.target)
    const producto = new Dataformulario(datForm.get("nombre"),datForm.get("album"),datForm.get("formato"))
    sugerenciaUsuario.push(producto)
    localStorage.setItem("Sugerencia", JSON.stringify(sugerenciaUsuario))
    formulario.reset()
})





botonSugerencia.addEventListener("click",() => {

  
  let sugerenciasGuardadas = JSON.parse(localStorage.getItem("Sugerencia")) 
  sugerenciasGuardadas.forEach (artista => {
    Swal.fire({
      title: `Nombre: ${artista.nombre}`,
      html: `Album: ${artista.album} <br> Formato ${artista.formato} ` ,
      icon: 'success',
      confirmButtonText: 'Listo!'
    })

  })
  
  
  })

let buscador = document.getElementById("buscador")
let botonBuscador = document.getElementById("botonBuscador")
let resultado = document.getElementById("resultado")

const barraBuscador = ()=> {
  resultado.innerHTML = ""

 const texto = buscador.value.toLowerCase();
 fetch('productos.json')
.then(response => response.json())
.then(data => {
data.forEach( artista => {
let nombre = artista.nombre.toLowerCase();
if(nombre.indexOf(texto) !== -1) {
resultado.innerHTML += `
<li> <img src="${artista.img}" height="50px" width="50px" >
Nombre: ${artista.nombre} 
- Album: ${artista.album}
- Precio: ${artista.precio}
- Formato: ${artista.formato}


</li>

`
}
})
if(resultado.innerHTML === ''){
   resultado.innerHTML += `
   <li> No se encontro el producto</li>
   
   `
 }
}
)}

botonBuscador.addEventListener("click",barraBuscador)
buscador.addEventListener("change",barraBuscador)


