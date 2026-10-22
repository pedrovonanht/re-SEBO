import PromptSync from "prompt-sync";
import Guerreiro from "./guerreiro.ts";
import Padre from "./padre.ts";
import Personagem from "./Personagem.ts";

function mostrarVivos(personagens: Personagem[]) {
  const vivos = contarVivos(personagens);

  console.log("=".repeat(30));
  console.log(`Personagens vivos (${vivos})`);
  console.log("=".repeat(30));
  personagens.map((personagem) => {
      if (personagem.vidaAtual > 0) {
          console.log(
              `${personagem.nome}: ${personagem.vidaAtual}/${personagem.vidaMaxima}`,
            );
        }
    });
    console.log("=".repeat(30));
}

function contarVivos(personagens: Personagem[]): number {
  let vivos = 0;

  personagens.map((personagem,index) => {
    if (personagem.vidaAtual > 0) {
      vivos += 1;
    } 
  });
  return vivos;
}

function verificarVitoria(personagens: Personagem[]): boolean {
  const vivos = contarVivos(personagens);

  return vivos === 1;
}

const prompt = PromptSync({ sigint: true });

const p1: Padre = new Padre({ nome: "Fábio de Melo" });
const p2: Padre = new Padre({ nome: "Melo de Fábio" });
const g1: Guerreiro = new Guerreiro({ nome: "Super xandão" });
let participantes = [p1, p2, g1];

prompt("Pressione [enter] para iniciar.");
while (true) {
    participantes = participantes.filter((personagem) => personagem.vidaAtual > 0)
  if (participantes.length == 1) {
    console.log(`${participantes[0]?.nome} foi o vencedor!`)
    break
  }

  
  console.log("-".repeat(30));
  console.log("QUE INICIE A BATALHAAA!");
  console.log("-".repeat(30));

  mostrarVivos(participantes);
  const atacante = Personagem.gerarAleatorio({
    minimo: 0,
    maximo: participantes.length - 1,
  });
  const atacado = Personagem.gerarAleatorio({
    minimo: 0,
    maximo: participantes.length - 1,
  });
  participantes[atacante]?.atacar(participantes[atacado] as Personagem);
  prompt("Pressione [enter] para rodar o próximo round.");
}
