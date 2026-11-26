import PromptSync from "prompt-sync";
import { Anuncio } from "../classes/anuncios.ts";
import type { Conta } from "../classes/conta.ts";
import { EntradaInvalidaError } from "../classes/entradaInvalidaError.ts";
import lerOpcao from "./lerOpcao.ts";

const prompt = PromptSync({ sigint: true });

function anunciosDisponiveis(userAcount: Conta): Anuncio[] {
  return Anuncio.listarAnuncios().filter(
    (anuncio) =>
      anuncio.dono.id == userAcount.id && anuncio.ativo && !anuncio.vendido,
  );
}

function listarOpcoes(anuncios: Anuncio[]) {
  anuncios.forEach((anuncio, indice) => {
    console.log(
      `${indice} - ${anuncio.livro.nome} | R$ ${anuncio.preco.toFixed(2)} | desconto atual: ${anuncio.desconto}% | preço de venda: R$ ${anuncio.precoVenda().toFixed(2)}`,
    );
  });
  console.log(`${anuncios.length} - Voltar`);
}

function aplicar(anuncio: Anuncio) {
  try {
    const resposta: string = prompt("Desconto em % (0 a 100): ") ?? "";
    const porcentagemDesconto = Number(resposta.replace(",", "."));

    if (resposta.trim() === "" || Number.isNaN(porcentagemDesconto)) {
      throw new EntradaInvalidaError("Valor inválido");
    }

    anuncio.aplicarDesconto({ porcentagemDesconto });
    console.log(
      `Desconto de ${anuncio.desconto}% aplicado. Novo preço de venda: R$ ${anuncio.precoVenda().toFixed(2)}`,
    );
  } catch (erro) {
    console.log((erro as Error).message);
  }
  prompt("Digite algo para continuar: ");
}

export default function aplicarDesconto(userAcount: Conta) {
  let continuar = true;

  while (continuar) {
    const anuncios = anunciosDisponiveis(userAcount);
    if (anuncios.length === 0) {
      console.log("Você não tem anúncios ativos para aplicar desconto");
      prompt("Digite algo para sair: ");
      return;
    }

    listarOpcoes(anuncios);
    let numero: number;
    try {
      numero = lerOpcao("Escolha um anúncio: ", anuncios.length);
    } catch (e) {
      if (!(e instanceof EntradaInvalidaError)) throw e;
      console.clear();
      console.log(e.message);
      continue;
    }
    console.clear();

    if (numero === anuncios.length) {
      continuar = false;
    } else {
      aplicar(anuncios[numero]!);
      console.clear();
    }
  }
}
