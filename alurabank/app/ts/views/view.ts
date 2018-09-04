export abstract class View<Generico> {

    private _elemento: JQuery;

    constructor(seletor: string) {

        this._elemento = $(seletor);
    }

    update(model: Generico) {

        this._elemento.html(this.template(model));
    }

    abstract template(model: Generico): string;
}