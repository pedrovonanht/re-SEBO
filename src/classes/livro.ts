import { Autor } from "./autor.ts";
import Produto from "./produto.ts";

export interface livroObject {
  titulo: string;
  autores: Autor[];
  descricao: string;
  editora: string;
  classIndicativa: number;
  dataLancamento?: Date;
}

export default class Livro extends Produto {
  //atributos
  private _autores: Autor[];

  constructor({
    titulo,
    autores,
    descricao,
    editora,
    classIndicativa,
    dataLancamento,
  }: livroObject) {
    super({
      nome:titulo,
      descricao,
      marca: editora,
      classIndicativa,
      dataLancamento: dataLancamento || new Date(Date.now()),
    });
    this._autores = autores;
  }

  public get titulo() {
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
