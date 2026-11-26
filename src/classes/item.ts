export interface ItemDados {
    id?: number;
    nome: string;
    descricao: string;
}

// Classe abstrata: ninguém faz `new Item()`, só `new Livro()` ou `new Revista()`.
export abstract class Item {
    protected static nextId: number = 1;

    protected readonly _id: number;
    protected _nome: string;
    protected _descricao: string;

    constructor({ id, nome, descricao }: ItemDados) {
        this._id = id ?? Item.nextId++;
        this._nome = nome;
        this._descricao = descricao || "";
    }

    public static async inicializarNextId(): Promise<void> {
        const response = await fetch("http://localhost:3000/itens");

        if (!response.ok) {
            throw new Error("Erro ao buscar itens existentes");
        }

        const itens: { id: number }[] = await response.json();

        Item.nextId = itens.length > 0
            ? Math.max(...itens.map(item => item.id)) + 1
            : 1;
    }

    public get id() {
        return this._id;
    }

    public get nome() {
        return this._nome;
    }

    public get descricao() {
        return this._descricao;
    }

    abstract get tipo(): string;
    abstract creditos(): string;

    public resumo(): string {
        return `[${this.tipo}] ${this._nome} — ${this.creditos()}`;
    }

    protected persistir(camposDaSubclasse: object): void {
        fetch("http://localhost:3000/itens", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: this._id,
                tipo: this.tipo,
                nome: this._nome,
                descricao: this._descricao,
                ...camposDaSubclasse,
            }),
        });
    }
}
