import PromptSync from "prompt-sync";
import { Carrinho } from "../classes/carrinho.ts";
import type { Conta } from "../classes/conta.ts";
import { Venda } from "../classes/Venda.ts";
import { anunciosDisponiveis, imprimirAnuncios } from "./Catalogo.ts";

const prompt = PromptSync({ sigint: true });

export function adicionarAoCarrinho(carrinho: Carrinho): void {
  const anuncios = anunciosDisponiveis();

  if (anuncios.length == 0) {
    console.log("Nenhum anúncio disponível no catálogo.");
    prompt("Digite algo para sair: ");
    return;
  }

  imprimirAnuncios(anuncios);

  const resposta: string =
    prompt("Número do anúncio para adicionar (vazio para voltar): ") ?? "";

  if (resposta === "") {
    return;
  }

  const numero = Number(resposta);
  const anuncio = Number.isInteger(numero) ? anuncios[numero - 1] : undefined;

  if (!anuncio) {
    console.log("Opção inválida.");
  } else if (carrinho.mostrarCarrinho().includes(anuncio)) {
    console.log(`"${anuncio.livro.nome}" já está no carrinho.`);
  } else {
    carrinho.adicionarAnuncio(anuncio);
    console.log(`"${anuncio.livro.nome}" adicionado ao carrinho.`);
  }

  prompt("Digite algo para sair: ");
}

function imprimirCarrinho(carrinho: Carrinho): number {
  let total = 0;
console.log("=".repeat(30))
carrinho.mostrarCarrinho().forEach((anuncio, indice) => {
  const preco = anuncio.precoVenda();
  total += preco;
  console.log(`${indice + 1} - ${anuncio.livro.nome} - R$ ${preco.toFixed(2)}`);
});

console.log(`Total: R$ ${total.toFixed(2)}`);
return total;
}
console.log("=".repeat(30))

export function visualizarCarrinho(carrinho: Carrinho): void {
  if (carrinho.mostrarCarrinho().length == 0) {
    console.log("Seu carrinho está vazio.");
  } else {
    imprimirCarrinho(carrinho);
  }

  prompt("Digite algo para sair: ");
}

export async function finalizarCompra(
  cliente: Conta,
  carrinho: Carrinho,
): Promise<Carrinho> {
  if (carrinho.mostrarCarrinho().length == 0) {
    console.log("Seu carrinho está vazio.");
    prompt("Digite algo para sair: ");
    return carrinho;
  }

  imprimirCarrinho(carrinho);

  const confirmacao: string = (
    prompt("Confirmar compra? (S/N) ") ?? ""
  ).toLocaleLowerCase();

  if (confirmacao !== "s") {
    console.log("Compra cancelada.");
    prompt("Digite algo para sair: ");
    return carrinho;
  }

  const venda = new Venda({ cliente, carrinho });

  try {
    await venda.fazerVenda();
  } catch (erro) {
    console.log("Não foi possível finalizar a compra:", (erro as Error).message);
    prompt("Digite algo para sair: ");
    return carrinho;
  }

  console.log(`Compra finalizada! Código da venda: ${venda.codigo}`);
  prompt("Digite algo para sair: ");
  return new Carrinho();
}
