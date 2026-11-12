import PromptSync from "prompt-sync";
import Livro from "./classes/livro.ts";
import { Anuncio } from "./classes/anuncios.ts";
import fs from "node:fs";
import { Conta } from "./classes/conta.ts";
import { Autor } from "./classes/autor.ts";
import login from "./modules/criarConta.ts";
import { listar } from "./modules/listar.ts"
import anunciar from "./modules/anunciar.ts";
import { desativa } from "./modules/desativar.ts";

const prompt = PromptSync({ sigint: true });

const nome: string = "Edécio";
let userAcount: Conta = login()!;

console.log("1 - Comprador");
console.log("2 - Vendedor");
let MenuChoice: number = +prompt("");

while (true) {
  if (MenuChoice == 1) {
    console.clear();
    console.log("Vendedor");
    console.log("Opção 0: Listar catálogo");
    console.log("Opção 1: Pesquisar livro");
    console.log("Opção 2: Pesquisar autor");
    console.log("Opção 3: Adicionar ao carrinho");
    console.log("Opção 4: Visualizar carrinho");
    console.log("Opção 5: Finalizar Compra");
    console.log("Opção 6: Voltar");
    console.log("Opção 9: Sair do programa");

    const resposta: number = +prompt("Sua escolha: ");
    if (resposta == 6) {
      console.clear();

      console.log("1 - Comprador");
      console.log("2 - Vendedor");
      MenuChoice = +prompt("");
    }
    if (resposta == 9) {
      break;
    }
  }

  if (MenuChoice == 2) {
    console.clear();
    console.log("Vendedor");
    console.log("Escolha uma opção");
    console.log("Opção 0: Meus anúncios");
    console.log("Opção 1: Anunciar livros");
    console.log("Opção 2: Atualizar anúncios");
    console.log("Opção 3: Desativar anúncio");
    console.log("Opção 4: Pedidos");
    console.log("Opção 5: Mensagens");
    console.log("Opção 6: Meu perfil");
    console.log("Opção 7: Voltar");
    console.log("Opção 8: Sair do programa");

    const resposta: number = +prompt("Sua escolha: ");
    if (resposta == 0) {
      listar();
    }
    if (resposta == 1) {
      anunciar(userAcount);
    }
    if (resposta == 3) {
      desativa();
    }
    if (resposta == 7) {
      console.clear();

      console.log("1 - Comprador");
      console.log("2 - Vendedor");
      MenuChoice = +prompt("");
    }
    if (resposta == 8) {
      break;
    }
  }
}
