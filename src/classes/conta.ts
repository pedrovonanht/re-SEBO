
interface ContaPersistida {
    id: number;
}

export class Conta {
    private _id: number;
    private _nome: string;
    private _cpf: string | number;
    private _telefone: string | number;
    private _endereco: string;

    private static nextId = 1;

    public static async inicializarNextId(): Promise<void> {
        const response = await fetch("http://localhost:3000/contas/");

        if (!response.ok) {
            throw new Error("Erro ao buscar contas existentes");
        }

        const contas: ContaPersistida[] = await response.json();

        Conta.nextId = contas.length > 0
            ? Math.max(...contas.map(conta => conta.id)) + 1
            : 1;
    }

    constructor({ id, nome, cpf, telefone, endereco }: {
        id?: number | string,
        nome: string,
        cpf: string | number,
        telefone: string | number,
        endereco?: string
    }) {
        const jaExiste = id !== undefined;

        this._id = jaExiste ? Number(id) : Conta.nextId++;
        this._nome = nome;
        this._cpf = String(cpf);
        this._telefone = String(telefone);
        this._endereco = endereco || "";

        if (jaExiste) return;

        fetch("http://localhost:3000/contas/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: this._id,
                nome: this._nome,
                cpf: this._cpf,
                telefone: this._telefone,
                endereco: this._endereco
            }),
        });
    }

    public get id() {
        return this._id;
    }

    public get nome() {
        return this._nome;
    }

    public get cpf() {
        return this._cpf;
    }

    public get telefone() {
        return this._telefone;
    }

    public get endereco() {
        return this._endereco;
    }
}
