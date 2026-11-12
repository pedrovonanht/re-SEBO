import Produto  from "./produto.ts"

export class Jogo extends Produto {
    private _minJogadores: number
    private _maxJogadores: number
    private _tipo: string

    constructor (
        nome:string,
        descricao:string,
        marca:string,
        dataLancamento:Date,
        classIndicativa: number,
        minJogadores: number,
        maxJogadores: number,
        tipo: string
    ) {
        super({nome, descricao, marca, dataLancamento, classIndicativa})
        this._minJogadores = minJogadores
        this._maxJogadores = maxJogadores
        this._tipo = tipo
    }

    public get minJogadores():number {
        return this.minJogadores
    }

    public get maxJogadores() {
        return this.minJogadores
    }

    public get tipo () {
        return this._tipo
    }

    public checarJogadores () {
        if (this._minJogadores > this._maxJogadores) {
            throw new Error("Quantidade de Jogadores recomendada Inválida");
        }
    }


}