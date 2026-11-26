import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import Revista from "../../src/classes/revista.ts";
import Livro from "../../src/classes/livro.ts";
import { Item } from "../../src/classes/item.ts";
import { Autor } from "../../src/classes/autor.ts";

function criarRevista(): Revista {
    return new Revista({
        nome: "Superinteressante",
        descricao: "Ciência e tecnologia",
        editora: "Abril",
        edicao: 450,
    });
}

describe("Quando manipular uma Revista", () => {
    beforeEach(() => {
        globalThis.fetch = jest.fn(async () => ({
            ok: true,
        })) as unknown as typeof fetch;
    });

    test("Revista é um Item e informa tipo e créditos", () => {
        const revista: Revista = criarRevista();

        expect(revista instanceof Item).toBe(true);
        expect(revista.tipo).toBe("Revista");
        expect(revista.creditos()).toBe("Abril, ed. 450");
    });

    test("resumo() sobrescrito reaproveita o do pai", () => {
        expect(criarRevista().resumo()).toBe(
            "[Revista] Superinteressante — Abril, ed. 450 (periódico)",
        );
    });

    test("Edição inválida lança erro", () => {
        expect(() => new Revista({ nome: "X", descricao: "", editora: "Abril", edicao: 0 })).toThrow();
        expect(() => new Revista({ nome: "X", descricao: "", editora: "Abril", edicao: 1.5 })).toThrow();
    });

    test("Revista nova é gravada na API com editora e edição", () => {
        criarRevista();

        const chamada = (globalThis.fetch as jest.Mock).mock.calls[0] as [string, { body: string }];
        const corpo = JSON.parse(chamada[1].body);

        expect(chamada[0]).toMatch(/\/itens$/);
        expect(corpo.tipo).toBe("Revista");
        expect(corpo.editora).toBe("Abril");
        expect(corpo.edicao).toBe(450);
    });

    test("Livros e revistas se comportam como Item (polimorfismo)", () => {
        const itens: Item[] = [
            new Livro({ nome: "Hobbit", descricao: "", autores: [new Autor({ nome: "Tolkien" })] }),
            criarRevista(),
        ];

        expect(itens.map(item => item.tipo)).toEqual(["Livro", "Revista"]);
    });

    test("Ids são sequenciais e compartilhados entre livros e revistas", () => {
        const a: Revista = criarRevista();
        const b: Livro = new Livro({ nome: "Hobbit", descricao: "", autores: [new Autor({ nome: "Tolkien" })] });

        expect(b.id).toBe(a.id + 1);
    });
});
