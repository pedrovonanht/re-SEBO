import { Autor } from "./autor.ts";
import { Item, type ItemDados } from "./item.ts";

export default class Livro extends Item {
    private _autores: Autor[];

    constructor(dados: ItemDados & { autores: Autor[] }) {
        super(dados);
        this._autores = dados.autores;

        // só grava na API se for um livro novo (sem id)
        if (dados.id === undefined) {
            this.persistir({ autores: this._autores });
        }
    }

    public get tipo() {
        return "Livro";
    }

    public get autores() {
        return this._autores;
    }

    public creditos(): string {
        return this._autores.map(autor => autor.nome).join(", ");
    }

    adicionaAutor(autor: Autor): void {
        this._autores.push(autor);
    }
}
