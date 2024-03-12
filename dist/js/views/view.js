export class View {
    constructor(seletor, escapar) {
        this.scapar = false;
        this.elemento = document.querySelector(seletor);
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
