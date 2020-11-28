//Registro del service worker
if(navigator.serviceWorker){//Esta disponible trabajar con service worker en este navegador?
    if(window.location.href.includes("localhost")){
        navigator.serviceWorker.register("/sw.js");
    } else { 
        //Esta servidor en un servidor web (github pages)
        navigator.serviceWorker.register("/rickmortyduoc/sw.js");
    }
}

window.mostrarPersonaje = function(){
  //Tomar todos los datos del personaje y renderizarlos dentro de un clon del molde
  //1. Crear molde
  let molde = document.querySelector('.molde-personaje-sa').cloneNode(true);
  let personaje = this.personaje;
  molde.querySelector('.nombre-per').innerText = personaje.name;
  molde.querySelector('.especie-per').innerText = personaje.species;
  molde.querySelector('.genero-per').innerText = personaje.gender;

  const icono = molde.querySelector('.icono-estado');

  if(personaje.status == "Dead"){
    icono.classList.add("fas","fa-skull-crossbones", "text-danger");
  }else if(personaje.status == "Alive"){
      icono.classList.add("fab","fa-odnoklassniki", "text-primary");
  } else if(personaje.status == "unknown"){
      icono.classList.add("fas","fa-question", "text-success");
  }

  molde.querySelector('.imagen-per').src = personaje.image;

  Swal.fire({
      title: personaje.name,
      html: molde.innerHTML
  });
};

window.mostrar = (personajes)=>{

    const molde = document.querySelector(".molde-personaje");
    const contenedor = document.querySelector(".contenedor");
    for(let i=0; i < personajes.length; ++i){
        let p = personajes[i];
        let copia = molde.cloneNode(true);
        copia.querySelector('.nombre-titulo').innerText = p.name;
        copia.querySelector('.imagen-personaje').src = p.image;
        copia.querySelector('.btn-personaje').personaje = p;
        copia.querySelector('.btn-personaje').addEventListener('click', window.mostrarPersonaje);
        contenedor.appendChild(copia);
    }
};
//window->document->HtmlElement
//Escuchando cuando se carga la página
window.addEventListener('DOMContentLoaded', async ()=>{
    //Retorna una promesa

    let respuesta = await axios.get("https://rickandmortyapi.com/api/character");
    let personajes = respuesta.data.results;
    window.mostrar(personajes);
    //TODO: Renderizar la lista de personajes en la pagina
});