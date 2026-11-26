import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { Conta } from "../../src/classes/conta.ts";
import { Autor } from "../../src/classes/autor.ts";
import Livro from "../../src/classes/livro.ts";
import { Anuncio } from "../../src/classes/anuncios.ts";
import { anunciosDisponiveis } from "../../src/modules/Catalogo.ts";

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
  return new Anuncio({ dono, livro, preco: 100, qualidade: "boa" });
}

describe("quando listar o catalogo", () => {
  beforeEach(() => {
    globalThis.fetch = jest.fn(async () => ({
      ok: true,
    })) as unknown as typeof fetch;
    Anuncio.limparListaAnuncios();
  });

  test("Mostra so anuncios ativos e nao vendidos", async () => {
    const disponivel: Anuncio = criarAnuncio("Senhor dos pasteis");
    const vendido: Anuncio = criarAnuncio("Hobbit");
    const desativado: Anuncio = criarAnuncio("Silmarillion");

    await vendido.marcarComoVendido();
    desativado.desativaAnuncio();

    const catalogo: Anuncio[] = anunciosDisponiveis();

    expect(catalogo.length).toBe(1);
    expect(catalogo[0]).toBe(disponivel);
  });
});
