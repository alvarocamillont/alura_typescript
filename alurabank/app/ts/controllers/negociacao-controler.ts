import { NegociacaoParcial } from './../models/negociacaoParcial';
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

        function isOk(res:Response){
            if (res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }
        }
        fetch('http://localhost:8080/dados')
        .then(res =>isOk(res))
        .then(res => res.json())
        .then((dados:NegociacaoParcial[]) => {
            dados
            .map(dados=> new Negociacao(new Date(), dados.vezes, dados.montante))
            .forEach(negociacao =>this._negociacoes.adiciona(negociacao))
            this._negociacoesView.update(this._negociacoes)
        }
        )
        .catch(err => console.log(err.message))
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