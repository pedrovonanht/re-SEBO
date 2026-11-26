import { Anuncio } from "../classes/anuncios.ts";
import PromptSync from "prompt-sync";
import { Conta } from "../classes/conta.ts";

const CABECALHO = `Pos.|                Livros            |            Autores           | Preço | Qualidade | Status | Vendido |`;
const prompt = PromptSync({ sigint: true });

function montarStringAutores(anuncios: Anuncio[], indice: number): string {
  let stringAutores: string = "";
  for (let index = 0; index < anuncios[indice]!.livro.autores.length; index++) {
    if (index == 0) {
      stringAutores += `${anuncios[indice]?.livro.autores[index]?.nome}`;
    } else {
      stringAutores += `, ${anuncios[indice]?.livro.autores[index]?.nome}`;
    }
  }
  return stringAutores;
}

function montarStatus(anuncios: Anuncio[], indice: number): string {
  if (anuncios[indice]?.ativo == true) {
    return "Ativo";
  } else {
    return "Inativo";
  }
}

function printResult({
  indice,
  anuncios,
  valor,
  stringAutores,
  status,
}: {
  indice: number;
  anuncios: Anuncio[];
  valor: string;
  stringAutores: string;
  status: string;
}) {
  console.log(
    `${String(indice + 1).padEnd(4)}|${anuncios[indice]?.livro.nome.padEnd(34)}|${stringAutores.padEnd(30)}|${valor.padStart(7)}|${anuncios[indice]?.qualidade.padStart(11)}|${status.padStart(8)}|${String(anuncios[indice]?.vendido).padStart(9)}|`,
  );
}

export default function listar(ContaAnunciante: Conta) {
  console.log(CABECALHO);
  const anuncios = Anuncio.listarAnuncios();

  for (let indice = 0; indice < anuncios.length; indice++) {
    const anuncio: Anuncio = anuncios[indice]!
    if (ContaAnunciante.id == anuncio.dono.id) {
      const stringAutores = montarStringAutores(anuncios, indice);
      const status = montarStatus(anuncios, indice);
      const valor = `R$ ${anuncios[indice]?.preco}`;
  
      printResult({anuncios, indice, status, valor, stringAutores});
    }
  }
  prompt("Digite algo para sair: ");
}
