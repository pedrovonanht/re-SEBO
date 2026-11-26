import PromptSync from "prompt-sync";
import { Autor } from "../classes/autor.ts";
import { Anuncio } from "../classes/anuncios.ts";
import Livro from "../classes/livro.ts";
import Revista from "../classes/revista.ts";
import type { Item } from "../classes/item.ts";
import type { Conta } from "../classes/conta.ts";

const prompt = PromptSync({ sigint: true });

function perguntarAutores(): Autor[] {
  let continuar = true;
  let autores: Autor[] = [];

  while (continuar) {
    const autorNome: string = prompt("Autor(a): ") ?? "";
    const autor: Autor = new Autor({ nome: autorNome });
    autores.push(autor);
    while (true) {
      const resposta: string =
        prompt(
          "Quer adicionar mais algum autor? (S/N) ",
        )?.toLocaleLowerCase() ?? "";

      if (resposta === "s") {
        break;
      }

      if (resposta === "n") {
        continuar = false;
        break;
      }

      console.log("Resposta inválida. Digite S ou N.");
    }
  }
  return autores;
}

function perguntarTipo(): "Livro" | "Revista" {
  while (true) {
    console.log("1 - Livro");
    console.log("2 - Revista");
    const resposta: string = prompt("O que você quer anunciar? ") ?? "";

    if (resposta === "1") return "Livro";
    if (resposta === "2") return "Revista";

    console.log("Resposta inválida. Digite 1 ou 2.");
  }
}

function perguntarEdicao(): number {
  while (true) {
    const edicao = Number(prompt("Edição: "));

    if (Number.isInteger(edicao) && edicao >= 1) {
      return edicao;
    }

    console.log("A edição deve ser um número inteiro maior que 0.");
  }
}

function criarLivro(nome: string, descricao: string): Livro {
  const autores: Autor[] = perguntarAutores();
  return new Livro({ nome, descricao, autores });
}

function criarRevista(nome: string, descricao: string): Revista {
  const editora: string = prompt("Editora: ") ?? "";
  const edicao: number = perguntarEdicao();
  return new Revista({ nome, descricao, editora, edicao });
}

export default async function anunciar(userAcount: Conta): Promise<void> {
  const tipo = perguntarTipo();
  const titulo: string = prompt("Título: ") ?? "";
  const descricao: string = prompt("Descrição: ") ?? "";

  const item: Item =
    tipo === "Livro"
      ? criarLivro(titulo, descricao)
      : criarRevista(titulo, descricao);

  const anuncio: Anuncio = new Anuncio({
    item,
    dono: userAcount,
    preco: 89,
    qualidade: "Excelente",
  });

  await item.aguardarPersistencia();
  await anuncio.aguardarPersistencia();
}
