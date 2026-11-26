export class Autor {
    private _nome: string;
    private _nascimento: Date;

    constructor({ nome, nascimento }: {
        nome: string,
        nascimento?: Date
    }) {
        this._nascimento = nascimento || new Date(Date.now());
        this.validaNome(nome);
        this._nome = nome;
    }

    private validaNome(nome: string): void {
        if (nome.length < 3 || nome.length > 80) {
            throw new Error('O nome deve ter entre 3 e 80 caracteres');
        }
    }

    public get nome(): string {
        return this._nome;
    }

    public set nome(nome: string) {
        this.validaNome(nome);
        this._nome = nome;
    }

    public get nascimento(): Date {
        return this._nascimento;
    }
    

    // esse set não faz nada (ainda)
    public set nascimento(nascimento: Date) {
        this._nascimento = nascimento;
    }
}