//Arrays
let carrito = []
let sugerenciaUsuario = []



//DOM

let botonSugerencia = document.getElementById("botonSugerencia")
let divProductos = document.getElementById("divProductos")
let formulario = document.getElementById("formulario")
const total = document.getElementById("eliminarTotal")
const botonDinamico = document.querySelectorAll(".boton")
let modal = document.querySelector(".modalCarrito")

//Selecciono cada producto de la lista
botonDinamico.forEach(btn => {
btn.addEventListener("click", (e) => {



  const button = e.target
  console.log(button)
  const item = button.closest(".card")
  const itemTitle = item.querySelector(".card-title").textContent
  const itemImg = item.querySelector(".imagen").src 
  const itemAlbum = item.querySelector(".card-subtitle").textContent
  const itemPrice = item.querySelector(".precio").textContent



  const newItem = {
    title : itemTitle,
    img : itemImg,
    album: itemAlbum,
    precio : itemPrice,
   cantidad :1

    
  }

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
 


  for(let i =0; i < carrito.length ; i++){
    if(carrito[i].title.trim() === newItem.title.trim()){
   
      CarritoTotal()
    return null}

    }

  carrito.push(newItem)

enviarAModal()

})
})




//Envio el producto seleccionado al modal
const enviarAModal = () => {


  modal.innerHTML= ``
 
  carrito.map(item => {
    const tr = document.createElement('div')
    tr.classList.add('ItemCarrito')
    const Content = 
    `
  
  <img src="${item.img}" height="50px" width="50px" >
 <p class ="title"> ${item.title}  </p>
  -  ${item.album}
  <p class ="table__price">- $${item.precio}</p>
    
    
<button class="delete btn btn-dark">x</button>
    
  

    <br>
    `
    tr.innerHTML = Content;
    modal.append(tr)

    tr.querySelector(".delete").addEventListener('click', removeItemCarrito)

  })
  CarritoTotal()
}


//Imprimo en el modal el total de la compra
function CarritoTotal(){
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''))
    Total = Total + precio*item.cantidad
  })

  itemCartTotal.innerHTML = `Total $${Total}`
  addLocalStorage()
}

//Elimino de manera individual un producto del carrito
function removeItemCarrito(e){
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for(let i=0; i<carrito.length ; i++){

    if(carrito[i].title.trim() === title.trim()){
      carrito.splice(i, 1)
    }
  }

  tr.remove()
  CarritoTotal()
}





//Guardo en localStorage
function addLocalStorage(){
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if(storage){
    carrito = storage;
    enviarAModal()
  }
}

//Creo una funcion para eliminar los productos del carrito 
const vaciarCarrito = document.getElementById("vaciarCarrito")
vaciarCarrito.addEventListener("click", ()=> {

  carrito = []
  modal.innerHTML = ""
  total.innerHTML= ""
  localStorage.setItem("carrito",JSON.stringify(carrito))
})

//Finalizo la compra
const finalizarCompra = document.getElementById("finalizarCompra")
finalizarCompra.addEventListener("click", ()=> {
  modal.innerHTML = ""
  total.innerHTML= ""
  Swal.fire(
    'Compra finalizada',
    'En minutos te llegara un mail con los detalles del envio',
    'success'
  )

} )

//Obtengo los datos del formulario y los imprimo en el html

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



//Creo un buscador utilizando FETCH desde un archivo JSON
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
<li> <a href="${artista.url}" target="_blank" style="text-decoration: none;">
<img src="${artista.img}" height="20px" width="20px" >
${artista.nombre} - 
${artista.album}




</a>


</li>


`

}
}

)
if(resultado.innerHTML === ''){
   resultado.innerHTML += `
   <li> No se encontro el producto</li>
   
   `
 }
}
)}






botonBuscador.addEventListener("click",barraBuscador)
buscador.addEventListener("keyup",barraBuscador)


