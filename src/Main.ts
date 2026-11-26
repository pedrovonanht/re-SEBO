import "./modules/fetchComRetry.ts";
import PromptSync from "prompt-sync";
import Livro from "./classes/livro.ts";
import { Anuncio } from "./classes/anuncios.ts";
import { Conta } from "./classes/conta.ts";
import anunciar from "./modules/Anunciar.ts";
import listar from "./modules/Listar.ts";
import desativa from "./modules/Desativa.ts";
import login from "./modules/criarConta.ts";
import listarCatalogo from "./modules/Catalogo.ts";
import mostrarPerfil from "./modules/Perfil.ts";
import { adicionarAoCarrinho, visualizarCarrinho, finalizarCompra } from "./modules/carrinho.ts";
import { Carrinho } from "./classes/carrinho.ts";
import { CarregadorApi } from "./classes/carregadorApi.ts";

const prompt = PromptSync({ sigint: true });

let userAcount: Conta = (await login())!;

// sincroniza os ids de livros e anúncios com a API antes de criar novos
await Livro.inicializarNextId();
await Anuncio.inicializarNextId();
await CarregadorApi.carregarAnuncios();

let carrinho: Carrinho = new Carrinho();

console.log("1 - Comprador")
console.log("2 - Vendedor")
let MenuChoice: number = +prompt("");

while (true) {
  if (MenuChoice == 1) {
    console.clear();
    console.log("Comprador");
    console.log("Opção 0: Listar catálogo");
    console.log("Opção 1: Adicionar ao carrinho");
    console.log("Opção 2: Visualizar carrinho");
    console.log("Opção 3: Finalizar Compra");
    console.log("Opção 4: Voltar");
    console.log("Opção 5: Sair do programa");

    const resposta: number = +prompt("Sua escolha: ");
    if (resposta == 0) {
      listarCatalogo();
    }
    if (resposta == 1) {
      adicionarAoCarrinho(carrinho);
    }
    if (resposta == 2) {
      visualizarCarrinho(carrinho);
    }
    if (resposta == 3) {
      carrinho = await finalizarCompra(userAcount, carrinho);
    }
    if (resposta == 4) {
      console.clear();

      console.log("1 - Comprador")
      console.log("2 - Vendedor")
      MenuChoice = +prompt("");
    }
    if (resposta == 5) {
      break;
    }
  }

  if (MenuChoice == 2) {
    console.clear();
    console.log("Vendedor");
    console.log("Escolha uma opção");
    console.log("Opção 0: Meus anúncios");
    console.log("Opção 1: Anunciar livros");
    console.log("Opção 2: Desativar anúncio");
    console.log("Opção 3: Meu perfil");
    console.log("Opção 4: Voltar");
    console.log("Opção 5: Sair do programa");

    const resposta: number = +prompt("Sua escolha: ");
    if (resposta == 0) {
      listar(userAcount);
    }
    if (resposta == 1) {
      anunciar(userAcount);
    }
    if (resposta == 2) {
      desativa();
    }
    if (resposta == 3) {
      mostrarPerfil(userAcount);
    }
    if (resposta == 4) {
      console.clear();

      console.log("1 - Comprador")
      console.log("2 - Vendedor")
      MenuChoice = +prompt("");
    }
    if (resposta == 5) {
      break;
    }
  }
}
