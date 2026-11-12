import { Conta } from "./conta.ts";
import Livro from "./livro.ts";
import { Autor } from "./autor.ts";
/* import db from "./infra/database.ts"; */

interface vendaObj {
  cliente: Conta;
  livro: Livro;
}

export class Venda {
  private _cliente: Conta;
  private _livro: Livro;
  private _codigo: string;

  constructor({ cliente, livro }: vendaObj) {
    this._cliente = cliente;
    this._livro = livro;
    this._codigo = crypto.randomUUID();
  }
  public get cliente() {
    return this._cliente;
  }
  public set cliente(valor) {
    this._cliente = valor;
  }
  public get livro() {
    return this._livro;
  }
  public set livro(valor) {
    this._livro = valor;
  }
  public get codigo() {
    return this._codigo;
  }
  public set codigo(valor) {
    this._codigo = valor;
  }

  /* public RealizarVenda() {
    db.prepare(
      `
      insert into Livro (titulo, genero, sinopse, lingua)
      values (?, ?, ?, ?)
      `,
    ).run(this.livro.nome, "ação", this.livro.descricao, "portugues");

    const resposta = db
      .prepare(
        `
        SELECT * FROM Livro`,
      )
      .all();

    console.log(resposta);
  } */
}

