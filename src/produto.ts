export default class Produto {
  protected _nome: string;
  protected _descricao: string;
  protected _marca: string;
  protected _dataLancamento: Date;
  protected _id: string;
  private _classIndicativa: number;

  constructor({
    nome,
    descricao,
    marca,
    dataLancamento,
    classIndicativa,
  }: {
    nome: string;
    descricao: string;
    marca: string;
    dataLancamento: Date;
    classIndicativa: number;
  }) {
    this._nome = nome;
    this._descricao = descricao;
    this._marca = marca;
    this._dataLancamento = dataLancamento;
    this._id = crypto.randomUUID();
    this._classIndicativa = classIndicativa;
  }
}
