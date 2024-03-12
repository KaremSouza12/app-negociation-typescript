export abstract class View<T> {

    protected elemento: HTMLElement;
    private scapar = false;

    constructor(seletor: string,escapar?:boolean) {
        this.elemento = document.querySelector(seletor);
        if (escapar) {
            this.scapar = escapar
        }
    }

    update(model: T): void {
        let template = this.template(model);
        if (this.scapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/,'');
        }
        this.elemento.innerHTML = template;
    }

   protected abstract template(model: T): string;
}