import { Anuncio } from "../classes/anuncios.ts";
import PromptSync from "prompt-sync";
import { Conta } from "../classes/conta.ts";

const CABECALHO = `Pos.|  Tipo  |              Título              |           Créditos           | Preço | Qualidade | Status | Vendido |`;
const prompt = PromptSync({ sigint: true });

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
  creditos,
  status,
}: {
  indice: number;
  anuncios: Anuncio[];
  valor: string;
  creditos: string;
  status: string;
}) {
  console.log(
    `${String(indice + 1).padEnd(4)}|${anuncios[indice]?.item.tipo.padEnd(8)}|${anuncios[indice]?.item.nome.padEnd(34)}|${creditos.padEnd(30)}|${valor.padStart(7)}|${anuncios[indice]?.qualidade.padStart(11)}|${status.padStart(8)}|${String(anuncios[indice]?.vendido).padStart(9)}|`,
  );
}

export default function listar(ContaAnunciante: Conta) {
  console.log(CABECALHO);
  const anuncios = Anuncio.listarAnuncios();

  for (let indice = 0; indice < anuncios.length; indice++) {
    const anuncio: Anuncio = anuncios[indice]!
    if (ContaAnunciante.id == anuncio.dono.id) {
      const creditos = anuncio.item.creditos();
      const status = montarStatus(anuncios, indice);
      const valor = `R$ ${anuncios[indice]?.preco}`;
  
      printResult({anuncios, indice, status, valor, creditos});
    }
  }
  prompt("Digite algo para sair: ");
}
