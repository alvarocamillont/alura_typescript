System.register(["./controllers/negociacao-controler"], function (exports_1, context_1) {
    "use strict";
    var negociacao_controler_1, controller;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (negociacao_controler_1_1) {
                negociacao_controler_1 = negociacao_controler_1_1;
            }
        ],
        execute: function () {
            controller = new negociacao_controler_1.NegociacaoController();
            $('.form').submit(controller.adiciona.bind(controller));
            $('#botao-importa').click(controller.importarDados.bind(controller));
        }
    };
});
