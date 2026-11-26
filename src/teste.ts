import { Conta } from "./classes/conta.ts";
import { Autor } from "./classes/autor.ts";
import Livro from "./classes/livro.ts";
import { Item } from "./classes/item.ts";
import { Anuncio } from "./classes/anuncios.ts";
import { Carrinho } from "./classes/carrinho.ts";
import { Venda } from "./classes/Venda.ts";

await Conta.inicializarNextId();
await Item.inicializarNextId();
await Anuncio.inicializarNextId();

const vendedor: Conta = new Conta({
    nome: "Pedro Henrique",
    cpf: "00011122233",
    telefone: "53999998888"
});

const comprador: Conta = new Conta({
    nome: "Maria Souza",
    cpf: "44455566677",
    telefone: "53988887777"
});

const autor: Autor = new Autor({
    nome: "Machado de Assis"
});

const livro: Livro = new Livro({
    nome: "Dom Casmurro",
    autores: [autor],
    descricao: "Romance clássico da literatura brasileira."
});

const anuncio: Anuncio = new Anuncio({
    dono: vendedor,
    item: livro,
    preco: 49.90,
    qualidade: "boa"
});

const carrinho: Carrinho = new Carrinho();
carrinho.adicionarAnuncio(anuncio);


const venda: Venda = new Venda({
    cliente: comprador,
    carrinho
});

console.log("Venda criada:", venda.codigo);
console.log("Cliente:", venda.cliente.nome);
console.log("Itens:", venda.carrinho.mostrarCarrinho().map(a => a.item.nome));

await venda.fazerVenda();
console.log("Anúncio vendido:", anuncio.vendido);
