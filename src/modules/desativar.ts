import { Anuncio } from "../classes/anuncios.ts";
import PromptSync from "prompt-sync";

export function desativa() {
  const anuncios: Anuncio[] = Anuncio.listarAnuncios();
  let desativar = true;

  while (desativar) {
    anuncios.map((anuncio, indice) => {
      console.log(`${indice} - ${JSON.stringify(anuncio.livro.nome)}`);
    });
    console.log(`${anuncios.length} - Voltar`);

    while (true) {
      const resposta: string = prompt("Escolha uma Opção: ");
      console.clear();
      if (resposta == null || resposta == "") {
        console.log("Escolha um Anúncio para desativar ou Retorne ao Menu");
        break;
      }
      const respostaNumero: number = Number(resposta);
      if (Number.isNaN(respostaNumero) || respostaNumero > anuncios.length) {
        console.log("Resposta Inválida");
        break;
      } else if (respostaNumero < anuncios.length) {
        anuncios[respostaNumero]?.desativaAnuncio();
        console.log(
          `O anúncio de ${anuncios[respostaNumero]?.livro.nome} foi desativado`,
        );
        desativar = false;
        prompt("Digite algo para sair: ");
        break;
      } else {
        desativar = false;
        break;
      }
    }
  }
}