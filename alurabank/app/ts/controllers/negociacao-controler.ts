import { Negociacoes, Negociacao } from "../models/index";
import { NegociacoesView, MensagemView } from "../views/index";
import { domInject } from "../helpers/decorator/index";


export class NegociacaoController {
    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    adiciona(event: Event) {
        event.preventDefault();
        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if (this.ehFinaldeSemana(data)) {
            this._mensagemView.update("Negociações somente em dias úteis da semana.")
            return
        }
        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        )
        this._negociacoes.adiciona(negociacao);

        this._negociacoesView.update(this._negociacoes);

        this._mensagemView.update('Negociação adicionada com sucesso!');
    }

    private ehFinaldeSemana(data: Date): boolean {
        return data.getDay() === DiaDaSemana.Domingo || data.getDay() === DiaDaSemana.Sabado
    }

    importarDados() {
        alert('oi');
    }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terça,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}