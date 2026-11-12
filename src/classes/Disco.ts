import Produto from "./produto.ts";
import { Autor } from "./autor.ts";

export class Disco extends Produto {
    private _autores: Autor[];
    private _duracao: number;
    private _genero: string;
    private _tipo: string; 

    constructor(
    nome: string,
    descricao: string,
    marca: string,
    dataLancamento: Date,
    classIndicativa: number,
    autores: Autor[],
    duracao: number,
    genero: string,
    tipo: string
) {
    super({nome, descricao, marca, dataLancamento, classIndicativa})
    this._autores = autores
    this._duracao = duracao
    this._genero = genero
    this._tipo = tipo
}
    public get autores() {
        return this._autores
    }

    public get duracao() {
        return this._duracao
    }

    public get genero() {
        return this._genero
    }

    public get tipo() {
        return this._tipo
    }
}