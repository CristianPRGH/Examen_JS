document.addEventListener("DOMContentLoaded", MostrarGrupos);

let filtrosBuscar = document.getElementById("buscador-grupos");
filtrosBuscar.addEventListener("submit", (e)=>{
    e.preventDefault();
    MostrarGrupos();
});

function MostrarGrupos()
{
    // Recoge todas las entradas del local storage
    let entries = Object.entries(localStorage);
    let grupos = [];

    // Recorre las entradas
    for (const key in entries)
    {
        // Pregunta si la entrada es un grupo y lo añade a un array de grupos
        if (entries[key][0].includes("grupo-"))
        {
            grupos.push(JSON.parse(entries[key][1]));
        }
    }
    let grid = document.getElementById("grupos-grid");
    grid.innerHTML = "";
    // Recorre los grupos añadiendolos al grid
    grupos.forEach(grupo => {
        CreaGrupoCard(grupo, grid);
    });
}

function CreaGrupoCard(grupo, grid)
{
    let nombre  = grupo.nombre;
    let desc    = grupo.descripcion;
    let imagen  = grupo.imagen;
    let tags    = grupo.tags;



    
    // FILTROS
    let filtroNombre = document.getElementById("filtro-nombre");
    if (!nombre.toLowerCase().includes(filtroNombre.value.toLowerCase())) return;

    let filtroTags = document.getElementById("filtro-tags");
    if (!tags.some( (tag) => tag.toLowerCase().includes(filtroTags.value.toLowerCase()))) return;



    let cell = document.createElement("article");
    cell.setAttribute("class", "flex-row grupo-card");



    let groupimg = document.createElement("img");
    groupimg.setAttribute("src", imagen);
    groupimg.setAttribute("id", "grupo-imagen");
   


    let container = document.createElement("article");
    container.setAttribute("class", "flex-column card-content");

    let groupname = document.createElement("h3");
    groupname.innerHTML = nombre;
    let groupdesc = document.createElement("p");
    groupdesc.setAttribute("class", "card-description");
    groupdesc.innerHTML = desc;
    let grouptags = document.createElement("p");
    grouptags.setAttribute("class", "card-tags");
    grouptags.innerHTML = tags.join(' | ');

    container.appendChild(groupname);
    container.appendChild(groupdesc);
    container.appendChild(grouptags);

    cell.appendChild(groupimg);
    cell.appendChild(container);

    grid.appendChild(cell);
}
