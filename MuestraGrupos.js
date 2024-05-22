document.addEventListener("DOMContentLoaded", MostrarGrupos);

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

    // Recorre los grupos añadiendolos al grid
    grupos.forEach(grupo => {
        CreaGrupoCard(grupo);
    });
}

function CreaGrupoCard(grupo)
{
    let grid = document.getElementById("grupos-grid");
    let nombre  = grupo.nombre;
    let desc    = grupo.descripcion;
    let imagen  = grupo.imagen;
    let tags    = grupo.tags;

    console.log(grupo.tags);

    let cell = document.createElement("article");
    cell.setAttribute("class", "flexRow grupo-card");

    let groupimg = document.createElement("img");
    groupimg.setAttribute("src", imagen);
    groupimg.setAttribute("id", "grupo-imagen");
   
    let container = document.createElement("article");
    container.setAttribute("class", "flexColumn");

    let groupname = document.createElement("h3");
    groupname.innerHTML = nombre;
    let groupdesc = document.createElement("p");
    groupdesc.innerHTML = desc;


    let grouptags = document.createElement("p");
    grouptags.innerHTML = tags.join(' | ');

    container.appendChild(groupname);
    container.appendChild(groupdesc);
    container.appendChild(grouptags);

    cell.appendChild(groupimg);
    cell.appendChild(container);

    grid.appendChild(cell);
}