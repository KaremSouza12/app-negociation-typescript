import { Negociacao } from "../models/negociacao";
import { Imprimivel } from "./imprimivel";

export function imprimir(...objetos:Imprimivel[]) {

    for (const objeto of objetos) {
        console.log(objeto.paraTexto())
    }
    
}