import { Item, type ItemDados } from "./item.ts";

export default class Revista extends Item {
    private _editora: string;
    private _edicao: number;

    constructor(dados: ItemDados & { editora: string; edicao: number }) {
        super(dados);
        this.validaEdicao(dados.edicao);
        this._editora = dados.editora;
        this._edicao = dados.edicao;

        // só grava na API se for uma revista nova (sem id)
        if (dados.id === undefined) {
            this.persistir({ editora: this._editora, edicao: this._edicao });
        }
    }

    private validaEdicao(edicao: number): void {
        if (!Number.isInteger(edicao) || edicao < 1) {
            throw new Error("A edição deve ser um número inteiro maior que 0");
        }
    }

    public get tipo() {
        return "Revista";
    }

    public get editora() {
        return this._editora;
    }

    public get edicao() {
        return this._edicao;
    }

    public creditos(): string {
        return `${this._editora}, ed. ${this._edicao}`;
    }

    public override resumo(): string {
        return `${super.resumo()} (periódico)`;
    }
}
