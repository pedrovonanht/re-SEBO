import PromptSync from "prompt-sync";
import { Conta } from "../classes/conta.ts";

const prompt = PromptSync({ sigint: true });

const API_CONTAS = "http://localhost:3000/contas/";

interface ContaPersistida {
  id: number | string;
  nome: string;
  cpf: string;
  telefone: string;
  endereco?: string;
}

async function buscarContas(): Promise<ContaPersistida[]> {
  const response = await fetch(API_CONTAS);

  if (!response.ok) {
    throw new Error("Erro ao buscar contas existentes");
  }

  return response.json();
}

async function criarConta(): Promise<Conta> {
  console.log("-----Criar Conta-----");
  const nome: string = prompt("Nome da conta: ");
  const cpf: string = prompt("CPF: ");
  const telefone: string = prompt("Telefone: ");

  await Conta.inicializarNextId();
  return new Conta({ nome, cpf, telefone });
}

export default async function login(): Promise<Conta | undefined> {
  const contas: ContaPersistida[] = await buscarContas();

  if (contas.length == 0) {
    return criarConta();
  }

  const resposta: string = prompt(
    `Detectamos ${contas.length} conta(s) salvas. Você quer seguir com alguma delas? (S/N) `,
  ).toLocaleLowerCase();

  if (resposta == "n") {
    return criarConta();
  }

  contas.forEach((conta, index) => {
    console.log(`${index + 1} - ${conta.nome}`);
  });

  const contaEscolhida: string = prompt("Qual conta você quer usar? ")!;
  const conta: ContaPersistida | undefined = contas[+contaEscolhida - 1];

  if (!conta) {
    return;
  }

  return new Conta(conta);
}
