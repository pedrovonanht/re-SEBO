import { Anuncio } from "./anuncios.ts";

export class Carrinho {
    private _anuncios: Anuncio[] = [];

    public adicionarAnuncio(anuncio: Anuncio) {
        this._anuncios.push(anuncio)
    }

    public mostrarCarrinho(): Anuncio[] {
        return this._anuncios;
    }
}