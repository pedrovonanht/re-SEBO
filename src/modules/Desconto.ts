import PromptSync from "prompt-sync";
import { Anuncio } from "../classes/anuncios.ts";
import type { Conta } from "../classes/conta.ts";

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
      `${indice} - ${anuncio.item.resumo()} | R$ ${anuncio.preco.toFixed(2)} | desconto atual: ${anuncio.desconto}% | preço de venda: R$ ${anuncio.precoVenda().toFixed(2)}`,
    );
  });
  console.log(`${anuncios.length} - Voltar`);
}

function aplicar(anuncio: Anuncio) {
  const resposta: string = prompt("Desconto em % (0 a 100): ") ?? "";
  const porcentagemDesconto = Number(resposta.replace(",", "."));

  if (resposta.trim() === "" || Number.isNaN(porcentagemDesconto)) {
    console.log("Valor inválido");
    prompt("Digite algo para continuar: ");
    return;
  }

  try {
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
    const resposta: string = prompt("Escolha um anúncio: ") ?? "";
    console.clear();

    const numero = Number(resposta);
    if (resposta === "" || !Number.isInteger(numero) || numero < 0 || numero > anuncios.length) {
      console.log("Resposta Inválida");
    } else if (numero === anuncios.length) {
      continuar = false;
    } else {
      aplicar(anuncios[numero]!);
      console.clear();
    }
  }
}
