var arrayGrupos = [];

function Validaciones()
{
    let formValido = true;

    let campos = [
        document.getElementById("nombre"),
        document.getElementById("descripcion"),
        document.getElementById("imagen"),
        document.getElementById("sel")
    ];

    let errores = [
        document.getElementById("err-nombre"),
        document.getElementById("err-descripcion"),
        document.getElementById("err-imagen"),
        document.getElementById("err-sel")
    ];
    
    for (let i = 0; i < campos.length; i++) {
        let campo = campos[i];
        let errcampo = errores[i];
        errcampo.innerHTML = "";
        
        if (campo.className === "required") if (!ValidaCampoVacio(campo, errcampo))         { formValido = false; continue; }
        if (campo.tagName === "TEXTAREA")   if (!ValidaPalabrasCensuradas(campo, errcampo)) { formValido = false; continue; }
        if (campo.tagName === "SELECT")     if (!ValidaOpciones(campo,errcampo))            { formValido = false; continue; }
    }

    // SI EL FORMULARIO ES VALIDO
    if (formValido)
    {
        let tags = [];
        for (let index = 0; index < campos[3].selectedOptions.length; index++) {
            tags.push(campos[3].selectedOptions[index].innerHTML);
        }

        let nuevoGrupo = {
            "nombre":campos[0].value,
            "descripcion":campos[1].value,
            "imagen":campos[2].value,
            "tags":tags
        };

        // GUARDA EL GRUPO EN EL LOCAL STORAGE
        let rnd = Math.floor(Math.random() * 10000);
        let key = `grupo-${rnd}`;
        localStorage.setItem(key, JSON.stringify(nuevoGrupo))

        MostrarGrupos();
    }

    return formValido;
}

function ValidaCampoVacio(campo, error)
{
    if (campo.value == "")
    {
        error.innerHTML = "El campo no puede estar vacío.";
        return false;
    }

    return true;
}

function ValidaPalabrasCensuradas(campo, error)
{
    let censoredWords = ["word1", "word2", "word3"];
    let texto = campo.value;
    let hayPalabrasCensuradas = 0;

    censoredWords.forEach((word) => {
        if (texto.includes(word)) hayPalabrasCensuradas++;
    })

    if (hayPalabrasCensuradas > 0) error.innerHTML = "Se han encontrado palabras censuradas";
    
    return hayPalabrasCensuradas == 0;
}

function ValidaOpciones(campo, error)
{
    let selecciones = campo.selectedOptions;
    if (selecciones.length < 1 || selecciones.length > 3)
    {
        error.innerHTML = "Debe seleccionar entre 1 y 3 opciones";
        return false;  
    }

    return true;
}