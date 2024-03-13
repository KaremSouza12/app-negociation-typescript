import { logarTempoDeExecucao } from "../decorators/logar-tempo-execucao.js";

export abstract class View<T> {

    protected elemento: HTMLElement;
    private scapar = false;

    constructor(seletor: string,escapar?:boolean) {
    const elemento = document.querySelector(seletor);
    if (elemento) {
        this.elemento = elemento as HTMLElement
    }else{
        throw Error(`Seletor ${seletor} não existe`); 
    }
        if (escapar) {
            this.scapar = escapar
        }
    }

    @logarTempoDeExecucao()
    update(model: T): void {
        let template = this.template(model);
        if (this.scapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/,'');
        }
        this.elemento.innerHTML = template;
    }

   protected abstract template(model: T): string;
}