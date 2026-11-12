import PromptSync from "prompt-sync";
import { Anuncio } from "../classes/anuncios.ts";
const prompt = PromptSync({ sigint: true });

function listaAutores(i: number) {
  const anuncios = Anuncio.listarAnuncios();
  let stringAutores: string = "";
  for (let index = 0; index < anuncios[i]!.livro.autores.length; index++) {
    if (index == 0) {
      stringAutores += `${anuncios[i]?.livro.autores[index]?.nome}`;
    } else {
      stringAutores += `, ${anuncios[i]?.livro.autores[index]?.nome}`;
    }
  }

  return stringAutores;
}

function checarStatus(i: number) {
  const anuncios = Anuncio.listarAnuncios();
  let status;

  if (anuncios[i]?.ativo == true) {
    status = "Ativo";
  } else {
    status = "Inativo";
  }

  return status;
}

function listagem() {
  let contador = 0;
  const anuncios = Anuncio.listarAnuncios();

  for (let i = 0; i < anuncios.length; i++) {
    contador++;

    let valor = `R$ ${anuncios[i]?.preco}`;

    console.log(
      `${String(contador).padEnd(4)}|${anuncios[i]?.livro.titulo.padEnd(34)}|${listaAutores(i).padEnd(30)}|${valor.padStart(7)}|${anuncios[i]?.qualidade.padStart(11)}|${checarStatus(i).padStart(8)}|`,
    );
  }
}

export function listar() {
  console.log(
    "Pos.|                Livros            |            Autores           | Preço | Qualidade | Status |",
  );

  listagem();

  prompt("Digite algo para sair: ");
}
