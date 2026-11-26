import PromptSync from "prompt-sync";
import type { Conta } from "../classes/conta.ts";

const prompt = PromptSync({ sigint: true });

export default function mostrarPerfil(conta: Conta): void {
  console.log("-----Meu Perfil-----");
  console.log(`ID: ${conta.id}`);
  console.log(`Nome: ${conta.nome}`);
  console.log(`CPF: ${conta.cpf}`);
  console.log(`Telefone: ${conta.telefone}`);
  console.log(`Endereço: ${conta.endereco || "Não informado"}`);

  prompt("Digite algo para sair: ");
}
