import { describe, test, expect } from "@jest/globals";
import { Autor } from "../../src/classes/autor.ts";

describe("Verificar Regras de nome", () => {
    test("Nomeando fora das regras", () => {        expect(() => new Autor({nome: "JO"})).toThrow();
    })
})
