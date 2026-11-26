import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { Conta } from "../../src/classes/conta.ts";
import { Autor } from "../../src/classes/autor.ts";
import Livro from "../../src/classes/livro.ts";
import { Anuncio } from "../../src/classes/anuncios.ts";
import { Carrinho } from "../../src/classes/carrinho.ts";
import { Venda } from "../../src/classes/Venda.ts";

function criarAnuncio(nomeLivro: string): Anuncio {
  const dono: Conta = new Conta({
    nome: "roberto",
    cpf: "034574910040",
    telefone: "053991841961",
  });
  const autor: Autor = new Autor({ nome: "Tolkien" });
  const livro: Livro = new Livro({
    nome: nomeLivro,
    autores: [autor],
    descricao: "livro bom",
  });
  return new Anuncio({ dono, item: livro, preco: 100, qualidade: "boa" });
}

function criarCliente(): Conta {
  return new Conta({
    nome: "maria",
    cpf: "044455566677",
    telefone: "053988887777",
  });
}

describe("quando manipular uma venda", () => {
  beforeEach(() => {
    globalThis.fetch = jest.fn(async () => ({
      ok: true,
    })) as unknown as typeof fetch;
  });

  test("Criando uma venda", () => {
    const cliente: Conta = criarCliente();
    const carrinho: Carrinho = new Carrinho();

    const venda: Venda = new Venda({ cliente, carrinho });

    expect(venda.cliente).toBe(cliente);
    expect(venda.carrinho).toBe(carrinho);
    expect(venda.codigo.length).toBeGreaterThan(0);
  });

  test("Fazendo a venda marca os anuncios do carrinho como vendidos", async () => {
    const anuncio1: Anuncio = criarAnuncio("Senhor dos pasteis");
    const anuncio2: Anuncio = criarAnuncio("Hobbit");
    const carrinho: Carrinho = new Carrinho();
    carrinho.adicionarAnuncio(anuncio1);
    carrinho.adicionarAnuncio(anuncio2);
    const venda: Venda = new Venda({ cliente: criarCliente(), carrinho });

    await venda.fazerVenda();

    expect(anuncio1.vendido).toBe(true);
    expect(anuncio2.vendido).toBe(true);
  });

  test("Se a API falhar nenhum anuncio e marcado como vendido", async () => {
    const anuncio: Anuncio = criarAnuncio("Senhor dos pasteis");
    const carrinho: Carrinho = new Carrinho();
    carrinho.adicionarAnuncio(anuncio);
    const venda: Venda = new Venda({ cliente: criarCliente(), carrinho });
    globalThis.fetch = jest.fn(async () => ({
      ok: false,
    })) as unknown as typeof fetch;

    await expect(venda.fazerVenda()).rejects.toThrow();

    expect(anuncio.vendido).toBe(false);
  });
});
