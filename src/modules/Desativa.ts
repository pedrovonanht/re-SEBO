import { Anuncio } from "../anuncios.ts";
import PromptSync from "prompt-sync";

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

function tratarResposta(resposta: string, anuncios: Anuncio[]): boolean {
  if (resposta === "") {
    console.log("Escolha um Anúncio para desativar ou Retorne ao Menu");
    return true;
  }

  const numero = Number(resposta);
  if (!Number.isInteger(numero) || numero < 0 || numero > anuncios.length) {
    console.log("Resposta Inválida");
    return true;
  }

  if (numero === anuncios.length) {
    return false;
  }

  desativarAnuncio(anuncios[numero]!);
  return false;
}

export default function desativa() {
  const anuncios: Anuncio[] = Anuncio.listarAnuncios();
  let continuar = true;

  while (continuar) {
    listarOpcoes(anuncios);
    const resposta: string = prompt("Escolha uma Opção: ") ?? "";
    console.clear();
    continuar = tratarResposta(resposta, anuncios);
  }
}
