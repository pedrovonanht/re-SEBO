import PromptSync from "prompt-sync";
import { EntradaInvalidaError } from "../classes/entradaInvalidaError.ts";

const prompt = PromptSync({ sigint: true });


export default function lerOpcao(texto: string, max: number, min: number = 0): number {
  const resposta: string = (prompt(texto) ?? "").trim();
  const n = Number(resposta);

  if (resposta === "" || !Number.isInteger(n) || n < min || n > max) {
    throw new EntradaInvalidaError(`Escolha um número de ${min} a ${max}`);
  }
  return n;
}
