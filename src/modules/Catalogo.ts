import PromptSync from "prompt-sync";
import { Anuncio } from "../classes/anuncios.ts";

const prompt = PromptSync({ sigint: true });

const CABECALHO = `Pos.|                Livros            |            Autores           |  Preço  | Qualidade |`;

// anúncios que ainda podem ser comprados
export function anunciosDisponiveis(): Anuncio[] {
  return Anuncio.listarAnuncios().filter(
    (anuncio) => anuncio.ativo && !anuncio.vendido,
  );
}

export function imprimirAnuncios(anuncios: Anuncio[]): void {
  console.log(CABECALHO);

  anuncios.forEach((anuncio, indice) => {
    const autores = anuncio.livro.autores.map((autor) => autor.nome).join(", ");
    const valor = `R$ ${anuncio.precoVenda().toFixed(2)}`;

    console.log(
      `${String(indice + 1).padEnd(4)}|${anuncio.livro.nome.padEnd(34)}|${autores.padEnd(30)}|${valor.padStart(9)}|${anuncio.qualidade.padStart(11)}|`,
    );
  });
}

export default function listarCatalogo(): void {
  const anuncios = anunciosDisponiveis();

  if (anuncios.length == 0) {
    console.log("Nenhum anúncio disponível no catálogo.");
  } else {
    imprimirAnuncios(anuncios);
  }

  prompt("Digite algo para sair: ");
}
