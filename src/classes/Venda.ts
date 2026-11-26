import { Anuncio } from "./anuncios.ts";
import { Carrinho } from "./carrinho.ts";
import { Conta } from "./conta.ts";

interface vendaObj {
  cliente: Conta,
  carrinho: Carrinho,
}

export class Venda {
  private _cliente: Conta;
  private _carrinho: Carrinho;
  private _codigo: string;

  constructor({ cliente, carrinho }: vendaObj) {
    this._cliente = cliente;
    this._carrinho = carrinho;
    this._codigo = crypto.randomUUID();
  }
  
  public get cliente() {
    return this._cliente
  }
  public get carrinho() {
    return this._carrinho
  }
  public get codigo() {
    return this._codigo
  }

  public async fazerVenda(): Promise<void> {
    await Promise.all(
      this._carrinho.mostrarCarrinho().map((anuncio) => anuncio.marcarComoVendido()),
    );
  }
}
