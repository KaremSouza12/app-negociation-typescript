export class View {
    constructor(seletor, escapar) {
        this.scapar = false;
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.elemento = elemento;
        }
        else {
            throw Error(`Seletor ${seletor} não existe`);
        }
        if (escapar) {
            this.scapar = escapar;
        }
    }
    update(model) {
        let template = this.template(model);
        if (this.scapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        this.elemento.innerHTML = template;
    }
}
