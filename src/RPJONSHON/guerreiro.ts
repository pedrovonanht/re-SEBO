import Padre from "./padre.ts";
import Personagem from "./Personagem.ts";

export default class Guerreiro extends Personagem {
  constructor({ nome }: { nome: string }) {
    const forca = Personagem.gerarAleatorio({ minimo: 1, maximo: 1000 });
    const esquiva = Personagem.gerarAleatorio({ minimo: 0, maximo: 50 });
    const resistencia = Personagem.gerarAleatorio({ minimo: 0, maximo: 80 });
    const vidaMaxima = Personagem.gerarAleatorio({ minimo: 1, maximo: 40000 });

    super({
      nome: `${nome} Warrior`,
      forca,
      mental: 0,
      poder: forca * 10,
      esquiva,
      resistencia,
      vidaAtual: vidaMaxima,
      vidaMaxima,
    });
  }
  atacar(alvo: Personagem): void {
    const esquiva: number = alvo.esquiva;
    if (Personagem.gerarAleatorio({ minimo: 0, maximo: 100 }) < esquiva) {
      console.log("Esquivou!");
    } else {
      const danoAplicado = this.poder * (alvo.resistencia / 100);
      alvo.receberDano(danoAplicado);

      this.contraAtacar({ atacante: alvo, alvo: this });
    }
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
        alvo.vidaAtual = 0;
        console.log(`${alvo.nome} foi convertido.`);
      }
    }
  }

  aprimorarHabilidadePrincipal(): void {
    this.forca = this.forca * 1.1;
    this._poder = this.forca;
  }

  regenerarVida(): void {
    this.vidaAtual = this.vidaAtual * 1.05;
  }
}
