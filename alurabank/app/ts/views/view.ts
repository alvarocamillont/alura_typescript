abstract class View<Generico> {

    private _elemento: Element;

    constructor(seletor: string) {

        this._elemento = document.querySelector(seletor);
    }

    update(model: Generico) {

        this._elemento.innerHTML = this.template(model);
    }

    abstract template(model: Generico): string ;
}