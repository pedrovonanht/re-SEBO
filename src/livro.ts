import { Autor } from "./autor.ts";
import Produto from "./produto.ts";

export default class Livro extends Produto {
  //atributos
  private _autores: Autor[];

  constructor({
    nome,
    autores,
    descricao,
    editora,
    classIndicativa,
    dataLancamento,
  }: {
    nome: string;
    autores: Autor[];
    descricao: string;
    editora: string;
    classIndicativa: number;
    dataLancamento?: Date;
  }) {
    super({
      nome,
      descricao,
      marca: editora,
      classIndicativa,
      dataLancamento: dataLancamento || new Date(Date.now()),
    });
    this._autores = autores;
  }

  public get nome() {
    return this._nome;
  }

  public get descricao() {
    return this._descricao;
  }

  public get autores() {
    return this._autores;
  }

  adicionaAutor(autor: Autor): void {
    this.autores.push(autor);
  }
}
