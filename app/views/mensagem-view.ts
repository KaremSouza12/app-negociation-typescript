

export class MenssagemView{

    private elemento: HTMLElement;

    constructor(selector: string){
        this.elemento = document.querySelector(selector);
    }

    template(model: string): string{
        return `
           <p class="alert alert-info">${model}</p>
        `
    }

    update(model: string): void{
        this.elemento.innerHTML = this.template(model);
    }
}