import Produto from "./produto.ts";
import { Autor } from "./autor.ts";

export class Disco extends Produto {
    private _autores: Autor[];
    private _duracao: number;
    private _genero: string;
    private _tipo: string; 

    constructor(
    _nome: string,
    _descricao: string,
    _marca: string,
    _dataLancamento: Date,
    _classIndicativa: number,
    _autores: Autor[],
    _duracao: number,
    _genero: string,
    _tipo: string
) {
    super(_nome, _descricao, _marca, _dataLancamento, _classIndicativa)
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

    public get _tipo() {
        return this._tipo
    }
}