import "./style.css";

export interface CrearBotonParams {
  texto: string;
  id: string;
  nombreClase: string;
  onClick: (id: string) => void;
}

export let HTMLtext: string = "";
export const patron =
  /(?<prefijo><img\ssrc=")(?<enlace>.{0,})(?<sufijo>"\s\/>)$/gm;
export const inputHTML = document.getElementById("inputHTML");
export const extraer = document.getElementById("extraer");

export const crearElementoParrafo = (texto: string): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  parrafo.textContent = texto;
  return parrafo;
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

export const extraerSrc = (str: string) => {
  const coincidencia = patron.exec(str);
  if (coincidencia) {
    const { enlace } = coincidencia.groups as any;
    return enlace;
  }
};

export const extratoArray = (value: string) => value.match(patron);

export const extraerSRC = (extractoArray: RegExpMatchArray | null) => {
  if (extractoArray !== null) {
    let extractoSRC: string[] = [];
    extractoSRC = extractoArray.map((el) => extraerSrc(el));
    return extractoSRC;
  } else {
    return null;
  }
};

export function handleClick() {
  obtenerHTMLText();
  console.log(HTMLtext);
  console.log(extratoArray(HTMLtext));
  console.log(extraerSRC(extratoArray(HTMLtext)));
}

if (extraer && extraer instanceof HTMLButtonElement) {
  extraer.addEventListener("click", handleClick);
}
