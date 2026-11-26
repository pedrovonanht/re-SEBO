import { Anuncio } from "../classes/anuncios.ts";
import PromptSync from "prompt-sync";
import { EntradaInvalidaError } from "../classes/entradaInvalidaError.ts";
import lerOpcao from "./lerOpcao.ts";

const prompt = PromptSync({ sigint: true });

function listarOpcoes(anuncios: Anuncio[]) {
  anuncios.forEach((anuncio, indice) => {
    console.log(`${indice} - ${anuncio.livro.nome}`);
  });
  console.log(`${anuncios.length} - Voltar`);
}

function desativarAnuncio(anuncio: Anuncio) {
  anuncio.desativaAnuncio();
  console.log(`O anúncio de ${anuncio.livro.nome} foi desativado`);
  prompt("Digite algo para sair: ");
}

export default function desativa() {
  const anuncios: Anuncio[] = Anuncio.listarAnuncios();
  while (true) {
    listarOpcoes(anuncios);
    let numero: number;
    try {
      numero = lerOpcao("Escolha uma Opção: ", anuncios.length);
    } catch (e) {
      if (!(e instanceof EntradaInvalidaError)) throw e;
      console.clear();
      console.log(e.message);
      continue;
    }
    console.clear();

    if (numero < anuncios.length) {
      desativarAnuncio(anuncios[numero]!);
    }
    return;
  }
}
