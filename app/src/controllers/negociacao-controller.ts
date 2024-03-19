import { DiasDaSemana } from './enums/dias_da_semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';
import { logarTempoDeExecucao } from '../decorators/logar-tempo-execucao.js';
import { inspect } from '../decorators/inspect.js';
import { domInjector } from '../decorators/dom-injector.js';
import { NegociacoesDoDia } from '../interfaces/negociacoes-do-dia.js';
import { NegociacoesService } from '../services/negociacoes-service.js';

export class NegociacaoController {
    @domInjector('#data')
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;

    @domInjector('#valor')
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoesService = new NegociacoesService();

    constructor() {
        this.negociacoesView.update(this.negociacoes);
    }

  @logarTempoDeExecucao(true) 
  @inspect
  public  adiciona(): void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value,
            );
        if (!this.diaUtil(negociacao.data)) {
            this.mensagemView.update('Apenas negociações em dias úteis são permitidas');
            return;
        }
        this.negociacoes.adiciona(negociacao);
        this.limparFormulario();
        this.atualizaView();
    }

   public importaDadoa():void{
      this.negociacoesService.obterNegociacoesDoDia()
      .then(negociacoesDeHoje => {
        for (let negociacao of negociacoesDeHoje) {
            this.negociacoes.adiciona(negociacao)
            
        }
        this.negociacoesView.update(this.negociacoes)
      })
    }


 private   limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
 private atualizaView() : void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update('Negociação adicionada com sucesso');
 }
 private diaUtil(data: Date){
    return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
 }
}


