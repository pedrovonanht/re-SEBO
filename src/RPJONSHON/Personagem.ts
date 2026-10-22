export default class Personagem {
  private _nome: string;
  private _forca: number;
  private _mental: number;
  protected _poder: number;
  protected _esquiva: number;
  protected _resistencia: number;
  private _vidaAtual: number;
  private _vidaMaxima: number;

  static gerarAleatorio({
    minimo,
    maximo,
  }: {
    minimo: number;
    maximo: number;
  }): number {
    return Math.floor(Math.random() * maximo) + minimo;
  }
  constructor({
    nome,
    forca,
    mental,
    poder,
    esquiva,
    resistencia,
    vidaAtual,
    vidaMaxima,
  }: {
    nome: string;
    forca: number;
    mental: number;
    poder: number;
    esquiva: number;
    resistencia: number;
    vidaAtual: number;
    vidaMaxima: number;
  }) {
    this._nome = nome;
    this._forca = forca;
    this._mental = mental;
    this._poder = poder;
    this._esquiva = esquiva;
    this._resistencia = resistencia;
    this._vidaAtual = vidaAtual;
    this._vidaMaxima = vidaMaxima;
  }

  get vidaMaxima():number {
    return this._vidaMaxima;
  }
  get nome():string {
    return this._nome;
  }
  get esquiva(): number {
    return this._esquiva;
  }

  get resistencia(): number {
    return this._resistencia;
  }

  get poder(): number {
    return this._poder;
  }

  get vidaAtual(): number {
    return this._vidaAtual;
  }

  set forca(valor: number) {
    this._forca = valor;
  }

  set vidaAtual(valor: number) {
    this._vidaAtual = valor;
  }

  get forca(): number {
    return this._forca;
  }

  receberDano(qtda: number) {
    this._vidaAtual -= qtda;
  }

  atacar(personagem: Personagem) {
    console.log("Desconhecido.");
  }

  contraAtacar({ atacante, alvo }: { atacante: Personagem; alvo: Personagem }) {
    console.log("Desconhecido.");
  }

  aprimorarHabilidadePrincipal(personagem: Personagem) {
    console.log("Desconhecido.");
  }

  regenerarVida(personagem: Personagem) {
    console.log("Desconhecido.");
  }
}
