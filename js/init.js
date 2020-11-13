//Escuchando cuando se carga la página
window.addEventListener('DOMContentLoaded', async ()=>{
    let respuesta = await axios.get("https://rickandmortyapi.com/api/character");
    let personajes = respuesta.data.results;
    console.log(personajes);
    //TODO: Renderizar la lista de personajes en la pagina
});