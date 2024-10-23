import "./style.css";
// import { pintarPersonajes } from "./personajes-listado";

export let HTMLtext: string = "";
export const patron =
  /(?<prefijo><img\ssrc=")(?<enlace>.{0,})(?<sufijo>"\s\/>)$/gm;
export const inputHTML = document.getElementById("inputHTML");
export const extraer = document.getElementById("extraer");
export const borrar = document.getElementById("borrar");
// export const convertir = document.getElementById("convertir");

export function habilitarBotones(
  nombreBoton: HTMLElement | null,
  ishabilitado: boolean
) {
  if (nombreBoton && nombreBoton instanceof HTMLButtonElement) {
    ishabilitado
      ? (nombreBoton.disabled = false)
      : (nombreBoton.disabled = true);
  }
}

export const crearElementoParrafo = (texto: string): HTMLParagraphElement => {
  const div = document.getElementById("contenedor");

  const parrafo = document.createElement("p");
  div?.appendChild(parrafo);
  parrafo.textContent = texto;
  return parrafo;
};

export const crearElementoBoton = (
  texto: string,
  id: string
): HTMLButtonElement => {
  const div = document.getElementById("contenedor");

  const boton = document.createElement("button");
  div?.prepend(boton);
  boton.id = id;
  boton.classList.add("boton");
  boton.textContent = texto;
  return boton;
};
export const crearContenedorImagenes = (): HTMLDivElement => {
  const div = document.getElementById("contenedor");

  const contenedorImagenes = document.createElement("div");
  div?.appendChild(contenedorImagenes);
  contenedorImagenes.id = "listado-personajes";
  contenedorImagenes.classList.add("listado-personajes");

  return contenedorImagenes;
};

export const crearElementoImagen = (texto: string): HTMLImageElement => {
  const div = document.getElementById("contenedorImagenes");
  const contenedorImagen = document.createElement("div");
  div?.appendChild(contenedorImagen);

  const imagen = document.createElement("img");
  contenedorImagen?.appendChild(imagen);
  imagen.src = texto;
  imagen.title = texto;
  return imagen;
};

export const eliminarElementos = (str: string) => {
  const element = document.getElementById(str);
  if (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
};

export function obtenerHTMLText() {
  if (inputHTML && inputHTML instanceof HTMLTextAreaElement) {
    HTMLtext = inputHTML.value;
  } else {
    HTMLtext = "";
  }
  return HTMLtext;
}

export const extraerEnlacesImagenes = (value: string) => {
  const arr = [...value.matchAll(patron)];
  const enlaces = arr.map((arr) => arr.groups?.enlace);
  return enlaces;
};
export const pintarResultado = (strArr: (string | undefined)[]) => {
  if (strArr !== undefined) {
    strArr.map((el) => {
      if (el !== undefined) {
        crearElementoParrafo(el);
      }
    });
  }
};
export const pintarImagenes = (strArr: (string | undefined)[]) => {
  if (strArr !== undefined) {
    const listado = document.querySelector("#listado-personajes");
    strArr.map((el) => {
      if (el !== undefined && listado && listado instanceof HTMLDivElement) {
        const contenedorPersonaje = crearContenedorPersonaje(el);
        listado.appendChild(contenedorPersonaje);
      }
    });
  }
};

export const crearContenedorPersonaje = (personaje: string): HTMLDivElement => {
  const elementoPersonaje = document.createElement("div");
  elementoPersonaje.classList.add("personaje-contenedor");
  const imagen = crearElementoImagen(personaje);
  elementoPersonaje.appendChild(imagen);
  return elementoPersonaje;
};

export const pintarPersonajes = (str: string[]): void => {
  const listado = document.querySelector("#listado-personajes");
  if (listado && listado instanceof HTMLDivElement) {
    str.forEach((personaje) => {
      const contenedorPersonaje = crearContenedorPersonaje(personaje);
      listado.appendChild(contenedorPersonaje);
    });
  } else {
    throw new Error("No se ha encontrado el contenedor del listado");
  }
};

export function handleClickExtraer() {
  obtenerHTMLText();
  console.log(HTMLtext);
  console.log(extraerEnlacesImagenes(HTMLtext));

  if (extraerEnlacesImagenes(HTMLtext).length === 0) {
    crearElementoParrafo("No hay enlaces a imágenes válidos en el texto");
  } else {
    pintarResultado(extraerEnlacesImagenes(HTMLtext));
    crearElementoBoton("CONVERTIR A IMÁGENES", "convertir");
    crearContenedorImagenes();
    const convertir = document.getElementById("convertir");
    if (convertir && convertir instanceof HTMLButtonElement) {
      convertir.addEventListener("click", handleClickConvertir);
    }
  }
  habilitarBotones(extraer, false);
  habilitarBotones(borrar, true);
}

export function handleClickBorrar() {
  if (inputHTML && inputHTML instanceof HTMLTextAreaElement) {
    inputHTML.value = "";
  }
  HTMLtext = "";
  eliminarElementos("contenedor");
  habilitarBotones(extraer, true);
  habilitarBotones(borrar, false);
  console.log(HTMLtext);
}

export function handleClickConvertir() {
  pintarImagenes(extraerEnlacesImagenes(HTMLtext));
}

if (extraer && extraer instanceof HTMLButtonElement) {
  extraer.addEventListener("click", handleClickExtraer);
}
if (borrar && borrar instanceof HTMLButtonElement) {
  borrar.addEventListener("click", handleClickBorrar);
}
