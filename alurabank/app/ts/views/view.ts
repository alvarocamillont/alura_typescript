export abstract class View<Generico> {

    protected _elemento: JQuery;
    private _escapar: boolean;


    constructor(seletor: string, escapar?: boolean) {

        this._elemento = $(seletor);
        this._escapar = escapar;
    }

    update(model: Generico) {
        let template = this.template(model)
        if (this._escapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, '')
        }
        this._elemento.html(template);
    }

    abstract template(model: Generico): string;
}