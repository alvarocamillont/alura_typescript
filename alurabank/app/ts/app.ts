import { NegociacaoController } from "./controllers/negociacao-controler";

const controller = new NegociacaoController();
$('.form').submit(controller.adiciona.bind(controller));