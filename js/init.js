
window.mostrarPersonaje = function(){
  console.log(this.personaje);  
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