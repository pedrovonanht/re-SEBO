import { describe, expect, test, beforeEach, jest } from "@jest/globals";
import { Anuncio } from "../../src/classes/anuncios.ts";
import { Conta } from "../../src/classes/conta.ts";
import Livro from "../../src/classes/livro.ts";
import { Autor } from "../../src/classes/autor.ts";
import { faker } from "@faker-js/faker";

function criarAnuncio({ preco }: { preco?: number }): Anuncio {
  const conta: Conta = new Conta({
    nome: faker.person.firstName(),
    cpf: "000111222333",
    telefone: faker.phone.number(),
  });
  const autor: Autor = new Autor({ nome: faker.book.author() });
  const livro: Livro = new Livro({
    nome: faker.book.title(),
    autores: [autor],
    descricao: faker.book.genre(),
  });
  const anuncio: Anuncio = new Anuncio({
    dono: conta,
    item: livro,
    preco: preco || faker.number.int(),
    qualidade: "boa",
  });
  return anuncio;
}

describe("Quando manipular anuncio", () => {
  test("Aplicando desconto", () => {
    const conta: Conta = new Conta({
      nome: "roberto",
      cpf: "034574910040",
      telefone: "053991841961",
    });
    const autor: Autor = new Autor({ nome: "Tolkien" });
    const livro: Livro = new Livro({
      nome: "Senhor dos pasteis",
      autores: [autor],
      descricao: "livro de fantasia sensacional",
    });
    const anuncio: Anuncio = new Anuncio({
      dono: conta,
      item: livro,
      preco: 100,
      qualidade: "boa",
    });

    anuncio.desconto = 0;
    anuncio.aplicarDesconto({ porcentagemDesconto: 10 });

    expect(anuncio.preco).toBeGreaterThan(anuncio.precoVenda());
    expect(anuncio.precoVenda()).toBe(90);
  });

  test("Desconto fora de 0 a 100 deve lançar erro", () => {
    const anuncio: Anuncio = criarAnuncio({});

    expect(() => anuncio.aplicarDesconto({ porcentagemDesconto: -1 })).toThrow();
    expect(() => anuncio.aplicarDesconto({ porcentagemDesconto: 101 })).toThrow();
    expect(() => anuncio.aplicarDesconto({ porcentagemDesconto: NaN })).toThrow();
  });

  test("Listando anuncios", () => {
    Anuncio.limparListaAnuncios();
    const anuncio1: Anuncio = criarAnuncio({});
    const anuncio2: Anuncio = criarAnuncio({});

    const anuncios = Anuncio.listarAnuncios();

    expect(anuncios.length > 0).toBe(true);
    expect(anuncios.length).toBe(2);

    expect(anuncios[0] instanceof Anuncio).toBe(true);
    expect(anuncios[1] instanceof Anuncio).toBe(true);
  });

  test("Verificando Preço", () => {
    const conta: Conta = new Conta({
      nome: "roberto",
      cpf: "034574910040",
      telefone: "053991841961",
    });
    const autor: Autor = new Autor({ nome: "Tolkien" });
    const livro: Livro = new Livro({
      nome: "Senhor dos pasteis",
      autores: [autor],
      descricao: "livro de fantasia sensacional",
    });

    expect(
      () => new Anuncio({ dono: conta, item: livro, preco: -10, qualidade: "boa" }),
    ).toThrow();
  });
});

describe("Quando vender um anuncio", () => {
  beforeEach(() => {
    globalThis.fetch = jest.fn(async () => ({
      ok: true,
    })) as unknown as typeof fetch;
  });

  test("Anuncio novo nasce ativo e nao vendido", () => {
    const anuncio: Anuncio = criarAnuncio({});

    expect(anuncio.ativo).toBe(true);
    expect(anuncio.vendido).toBe(false);
  });

  test("Marcando como vendido", async () => {
    const anuncio: Anuncio = criarAnuncio({});

    await anuncio.marcarComoVendido();

    expect(anuncio.vendido).toBe(true);
  });

  test("Se a API falhar nao marca como vendido", async () => {
    const anuncio: Anuncio = criarAnuncio({});
    globalThis.fetch = jest.fn(async () => ({
      ok: false,
    })) as unknown as typeof fetch;

    await expect(anuncio.marcarComoVendido()).rejects.toThrow();

    expect(anuncio.vendido).toBe(false);
  });
});
