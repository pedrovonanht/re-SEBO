
import { Autor } from "./autor.ts";

export default class Livro {
    private static nextId: number = 1;

    private _id: number;
    private _nome: string;
    private _descricao: string;
    private _autores: Autor[];

    constructor({ id, nome, autores, descricao }: {
        id?: number,
        nome: string,
        autores: Autor[],
        descricao: string
    }) {
        // com id, o livro já existe na API: reaproveita o id e não faz POST
        const jaExiste = id !== undefined;

        this._id = jaExiste ? id : Livro.nextId++;

        this._nome = nome;
        this._descricao = descricao || "";
        this._autores = autores;

        if (jaExiste) return;

        fetch("http://localhost:3010/livro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: this._id,
                nome: this._nome,
                descricao: this._descricao,
                autores: this._autores,
            }),
        });
    }

    public static async inicializarNextId(): Promise<void> {
        const response = await fetch("http://localhost:3010/livro");

        if (!response.ok) {
            throw new Error("Erro ao buscar livros existentes");
        }

        const livros: { id: number }[] = await response.json();

        Livro.nextId = livros.length > 0
            ? Math.max(...livros.map(livro => livro.id)) + 1
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

    public get autores() {
        return this._autores;
    }

    adicionaAutor(autor: Autor): void {
        this._autores.push(autor);
    }
}
