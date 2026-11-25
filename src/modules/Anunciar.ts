import PromptSync from "prompt-sync";
import { Autor } from "../autor.ts";
import { Anuncio } from "../anuncios.ts";
import Livro from "../livro.ts";
import type { Conta } from "../conta.ts";

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

function perguntar(): { titulo: string; descricao: string; autores: Autor[] } {
  const titulo: string = prompt("Título: ");
  const descricao: string = prompt("Descrição: ");
  const autores: Autor[] = perguntarAutores();

  return { titulo, descricao, autores };
}

export default function anunciar(userAcount: Conta) {
  const {
    titulo,
    descricao,
    autores,
  }: { titulo: string; descricao: string; autores: Autor[] } = perguntar();
  
  const l: Livro = new Livro({ nome: titulo, autores: autores, descricao });
  const anuncio: Anuncio = new Anuncio({
    livro: l,
    dono: userAcount,
    preco: 89,
    qualidade: "Excelente",
  });
}
