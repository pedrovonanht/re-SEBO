import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import Livro from "../../src/classes/livro.ts";
import { Item } from "../../src/classes/item.ts";
import { Autor } from "../../src/classes/autor.ts";

describe("Quando manipular um Livro", () => {
    beforeEach(() => {
        globalThis.fetch = jest.fn(async () => ({
            ok: true,
        })) as unknown as typeof fetch;
    });

    test("Mudando nome diretamente", () => {

//setup
        const autor:Autor = new Autor({nome:"Tolkien"})
        const livro1:Livro = new Livro({nome:"Senhor dos pasteis", descricao: "Livro bom", autores:[autor]})
//action
//assertions (expects)
// @ts-ignore      
expect(() => {livro1.nome = "Jefferson"}).toThrow();
    })

    test("Livro é um Item e informa tipo e créditos", () => {
        const autores: Autor[] = [
            new Autor({ nome: "Tolkien" }),
            new Autor({ nome: "Christopher" }),
        ];
        const livro: Livro = new Livro({ nome: "Silmarillion", descricao: "Mitos", autores });

        expect(livro instanceof Item).toBe(true);
        expect(livro.tipo).toBe("Livro");
        expect(livro.creditos()).toBe("Tolkien, Christopher");
        expect(livro.resumo()).toBe("[Livro] Silmarillion — Tolkien, Christopher");
    });

    test("Livro novo é gravado na API já com os autores", () => {
        const autor: Autor = new Autor({ nome: "Tolkien" });
        new Livro({ nome: "Hobbit", descricao: "Aventura", autores: [autor] });

        const chamada = (globalThis.fetch as jest.Mock).mock.calls[0] as [string, { body: string }];
        const corpo = JSON.parse(chamada[1].body);

        expect(chamada[0]).toMatch(/\/itens$/);
        expect(corpo.tipo).toBe("Livro");
        expect(corpo.autores.length).toBe(1);
    });

    test("Livro com id (já existe na API) não faz POST", () => {
        const autor: Autor = new Autor({ nome: "Tolkien" });
        new Livro({ id: 7, nome: "Hobbit", descricao: "Aventura", autores: [autor] });

        expect(globalThis.fetch).not.toHaveBeenCalled();
    });
})
