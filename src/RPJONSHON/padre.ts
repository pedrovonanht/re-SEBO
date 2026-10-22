import Guerreiro from "./guerreiro.ts";
import Personagem from "./Personagem.ts";

export default class Padre extends Personagem {
  constructor({
    nome,
  }: {
    nome: string;
  }) {
    const vidaMaxima = Personagem.gerarAleatorio({ minimo: 1, maximo: 8000 });

    super({
      nome: `${nome} Priest`,
      forca: 0,
      mental: 0,
      poder: 0,
      esquiva: 0,
      resistencia: 0,
      vidaAtual: vidaMaxima,
      vidaMaxima,
    });
  }
  atacar(alvo: Personagem): void {
    if (Personagem.gerarAleatorio({ minimo: 0, maximo: 100 }) < 40) {
      alvo.vidaAtual = 0;
      console.log(`${alvo.nome} foi convertido.`);
    }
    this.contraAtacar({ atacante: alvo, alvo: this });
  }

  contraAtacar({
    atacante,
    alvo,
  }: {
    atacante: Personagem;
    alvo: Personagem;
  }): void {
    if (atacante instanceof Guerreiro) {
      const esquiva: number = alvo.esquiva;
      if (Personagem.gerarAleatorio({ minimo: 0, maximo: 100 }) < esquiva) {
        console.log("Esquivou!");
      } else {
        const danoAplicado = atacante.poder * (alvo.resistencia / 100);
        alvo.receberDano(danoAplicado);
      }
    } else if (atacante instanceof Padre) {
      if (Personagem.gerarAleatorio({ minimo: 0, maximo: 100 }) < 40) {
          console.log(`${alvo.nome} foi convertido.`);
        alvo.vidaAtual = 0;
      }
    }
  }

  aprimorarHabilidadePrincipal(): void {
    throw new Error("Este personagem não pode executar esta ação.")
  }

  regenerarVida(): void {
    this.vidaAtual = this.vidaAtual * 1.1;
  }
}
