import PromptSync from "prompt-sync";
import { Autor } from "../classes/autor.ts";
import Livro, { type livroObject } from "../classes/livro.ts";
import { Anuncio } from "../classes/anuncios.ts";
import type { Conta } from "../classes/conta.ts";

function askAutores() {
  let autores: Autor[] = [];
  const prompt = PromptSync({ sigint: true });
  const autoresCopy = [ ...autores ];

  let continuar = true;
  while (continuar) {
    const autorNome: string = prompt("Autor(a): ");
    const autor: Autor = new Autor({ nome: autorNome });
    autoresCopy.push(autor);
    while (true) {
      const resposta: string = prompt(
        "Quer adicionar mais algum autor? (S/N) ",
      ).toLocaleLowerCase();

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
  return autoresCopy;
}

function askDataWithPrompt() {
  const prompt = PromptSync({ sigint: true });
  const titulo: string = prompt("Título: ");
  const autores: Autor[] = askAutores();
  const descricao: string = prompt("Descrição: ");
  const classIndicativa: number = +prompt("Classificação indicativa: ");
  const editora: string = prompt("Editora: ");

  const returnedObject = {
    titulo,
    autores,
    descricao,
    classIndicativa,
    editora,
  };

  return returnedObject;
}

export default function anunciar(userAcount: Conta) {
  const data: livroObject = askDataWithPrompt();
  const l: Livro = new Livro({
    titulo: data.titulo,
    autores: data.autores,
    descricao: data.descricao,
    classIndicativa: data.classIndicativa,
    editora: data.editora,
  });
  const anuncio: Anuncio = new Anuncio({
    livro: l,
    dono: userAcount,
    preco: 89,
    qualidade: "Excelente",
  });
}
