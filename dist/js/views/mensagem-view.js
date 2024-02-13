export class MenssagemView {
    constructor(selector) {
        this.elemento = document.querySelector(selector);
    }
    template(model) {
        return `
           <p class="alert alert-info">${model}</p>
        `;
    }
    update(model) {
        this.elemento.innerHTML = this.template(model);
    }
}
