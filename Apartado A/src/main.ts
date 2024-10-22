import "./style.css";
import { isValidIBAN } from "./ibantools";

export interface CrearBotonParams {
  texto: string;
  id: string;
  nombreClase: string;
  onClick: (id: string) => void;
}
export interface ResultadoIBAN {
  codigoPais: string;
  digitoControl_1: string;
  codigoBanco: string;
  codigoSucursal: string;
  digitoControl_2: string;
  numeroCuenta: string;
  esBienFormada?: boolean;
  esValida?: boolean;
}
export interface CodigoBanco {
  codigo: string;
  nombre: string;
}

export const codigoBancoEspaña: CodigoBanco[] = [
  {
    codigo: "2080",
    nombre: "Abanca Corporación Bancaria",
  },
  {
    codigo: "0061",
    nombre: "Banca March",
  },
  {
    codigo: "0188",
    nombre: "Banco Alcalá",
  },
  {
    codigo: "0182",
    nombre: "Banco Bilbao Vizcaya Argentaria",
  },
  {
    codigo: "0130",
    nombre: "Banco Caixa Geral",
  },
  {
    codigo: "0234",
    nombre: "Banco Caminos",
  },
  {
    codigo: "2105",
    nombre: "Banco Castilla-La Mancha",
  },
  {
    codigo: "0240",
    nombre: "Banco de Crédito Social Cooperativo",
  },
  {
    codigo: "0081",
    nombre: "Banco de Sabadell",
  },
  {
    codigo: "0487",
    nombre: "Banco Mare Nostrum",
  },
  {
    codigo: "0186",
    nombre: "Banco Mediolanum",
  },
  {
    codigo: "0182",
    nombre: "Banco Bilbao Vizcaya Argentaria",
  },
  {
    codigo: "0238",
    nombre: "Banco Pastor",
  },
  {
    codigo: "0075",
    nombre: "Banco Popular Español",
  },
  {
    codigo: "0049",
    nombre: "Banco Santander",
  },
  {
    codigo: "3873",
    nombre: "Banco Santander Totta",
  },

  {
    codigo: "2038",
    nombre: "Bankia",
  },
  {
    codigo: "0128",
    nombre: "Bankinter",
  },
  {
    codigo: "0138",
    nombre: "Bankoa",
  },
  {
    codigo: "0152",
    nombre: "Barclays Bank PLC",
  },
  {
    codigo: "3842",
    nombre: "BNP Paribas Paris",
  },
  {
    codigo: "3025",
    nombre: "Caixa de Credit del Enginyers",
  },
  {
    codigo: "2100",
    nombre: "Caixabank",
  },
  {
    codigo: "2045",
    nombre: "Caja de Ahorros y Monte de Piedad de Ontinyent",
  },
  {
    codigo: "3035",
    nombre: "Caja Laboral Popular CC",
  },
  {
    codigo: "3081",
    nombre: "Caja Rural Castilla-La Mancha3058 Cajamar Caja Rural",
  },
  {
    codigo: "2000",
    nombre: "Cecabank",
  },
  {
    codigo: "1474",
    nombre: "Citibank Europe PLC",
  },
  {
    codigo: "3821",
    nombre: "Commerzbank AG",
  },
  {
    codigo: "3877",
    nombre: "Danske Bank A/S",
  },
  {
    codigo: "0019",
    nombre: "Deutsche Bank SAE",
  },
  {
    codigo: "0239",
    nombre: "EVO Banco",
  },
  {
    codigo: "2085",
    nombre: "Ibercaja Banco",
  },
  {
    codigo: "1465",
    nombre: "ING Bank NV",
  },
  {
    codigo: "2095",
    nombre: "Kutxabank",
  },
  {
    codigo: "2048",
    nombre: "Liberbank",
  },
  {
    codigo: "0131",
    nombre: "Novo Banco",
  },
  {
    codigo: "0073",
    nombre: "Open Bank",
  },
  {
    codigo: "0108",
    nombre: "Société Générale",
  },
  {
    codigo: "2103",
    nombre: "Unicaja Banco",
  },
];

export function obtenerNombreBanco(str: string): string {
  const nombreBanco: string =
    codigoBancoEspaña[
      codigoBancoEspaña.findIndex(
        (codigoBancoEspaña) => codigoBancoEspaña.codigo === str
      )
    ].nombre;
  return nombreBanco;
}

export let IBAN: string = "";

export const inputIBAN = document.getElementById("inputIBAN");
export const validar = document.getElementById("validar");

export const crearContenidoParrafo = (texto: string, id: string) => {
  const parrafo = document.getElementById(id);
  if (parrafo && parrafo instanceof HTMLParagraphElement) {
    parrafo.textContent = texto;
  }
};
export const borrarContenidoParrafo = () => {
  crearContenidoParrafo("", "formacion");
  crearContenidoParrafo("El IBAN no es válido", "validez");
  crearContenidoParrafo("", "banco");
  crearContenidoParrafo("", "sucursal");
  crearContenidoParrafo("", "digito");
  crearContenidoParrafo("", "cuenta");
};
export const electronicFormatIBAN = (value: string) =>
  value.replace(/(\s|-|_)?/g, "");

export const validarFormacionIBAN = (value: string): boolean => {
  const iban = electronicFormatIBAN(value);
  return isValidIBAN(iban);
};

export const validarIBAN = (value: string): ResultadoIBAN | undefined => {
  const patron =
    /^(?<codigoPais>[A-Z]{2})(\s|-)?(?<digitoControl_1>\d{2})(\s|-)?(?<codigoBanco>\d{4})(\s|-)?(?<codigoSucursal>\d{4})(\s|-)?(?<digitoControl_2>\d{2})(\s|-)?(?<numeroCuenta>\d{10})$/;
  const coincidencia = patron.exec(value);

  if (coincidencia) {
    const {
      codigoPais,
      digitoControl_1,
      codigoBanco,
      codigoSucursal,
      digitoControl_2,
      numeroCuenta,
    } = coincidencia.groups as any;
    let IBANExtract: ResultadoIBAN = {
      codigoPais: codigoPais,
      digitoControl_1: digitoControl_1,
      codigoBanco: codigoBanco,
      codigoSucursal: codigoSucursal,
      digitoControl_2: digitoControl_2,
      numeroCuenta: numeroCuenta,
      esValida: true,
    };

    crearContenidoParrafo("El IBAN está bien formado", "formacion");
    validarFormacionIBAN(value)
      ? crearContenidoParrafo("El IBAN es válido", "validez")
      : crearContenidoParrafo("El IBAN NO es válido", "validez");
    crearContenidoParrafo(`Banco: ${obtenerNombreBanco(codigoBanco)}`, "banco");
    crearContenidoParrafo(`Código Sucursal: ${codigoSucursal}`, "sucursal");
    crearContenidoParrafo(`Dígito de control: ${digitoControl_2}`, "digito");
    crearContenidoParrafo(`Número de cuenta: ${numeroCuenta}`, "cuenta");

    return IBANExtract;
  } else {
    let IBANExtract: ResultadoIBAN = {
      codigoPais: "",
      digitoControl_1: "",
      codigoBanco: "",
      codigoSucursal: "",
      digitoControl_2: "",
      numeroCuenta: "",
      esValida: false,
    };
    borrarContenidoParrafo();
    return IBANExtract;
  }
};

export function obtenerIBAN() {
  if (inputIBAN && inputIBAN instanceof HTMLInputElement) {
    IBAN = inputIBAN.value;
  } else {
    IBAN = "";
  }
  return IBAN;
}
export function handleClick() {
  validarIBAN(obtenerIBAN());

  if (inputIBAN && inputIBAN instanceof HTMLInputElement) {
    inputIBAN.value = "";
  }
}

if (validar && validar instanceof HTMLButtonElement) {
  validar.addEventListener("click", handleClick);
}

//export const ibantools = require('ibantools');
// const iban = electronicFormatIBAN('NL91 ABNA 0417 1643 00'); // 'NL91ABNA0517164300'
// ibantools.isValidIBAN(iban);
