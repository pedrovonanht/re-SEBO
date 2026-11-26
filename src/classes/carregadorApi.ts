import { Anuncio } from "./anuncios.ts";
import { Autor } from "./autor.ts";
import { Conta } from "./conta.ts";
import Livro from "./livro.ts";
import Revista from "./revista.ts";
import type { Item } from "./item.ts";

interface AnuncioPersistido {
    id: number;
    nome: string;
    dono: number | string;
    item: number | string;
    preco: number;
    qualidade: string;
    ativo: boolean;
    desconto: number;
    vendido: boolean;
}

interface ItemPersistidoBase {
    id: number | string;
    nome: string;
    descricao: string;
}

interface LivroPersistido extends ItemPersistidoBase {
    tipo: "Livro";
    autores: { _nome: string, _nascimento: string }[];
}

interface RevistaPersistida extends ItemPersistidoBase {
    tipo: "Revista";
    editora: string;
    edicao: number;
}

// o campo `tipo` diz qual classe recriar
type ItemPersistido = LivroPersistido | RevistaPersistida;

interface ContaPersistida {
    id: number | string;
    nome: string;
    cpf: string;
    telefone: string;
    endereco?: string;
}


export class CarregadorApi {
    private static readonly URL: string = "http://localhost:3000";

    public static async carregarAnuncios(): Promise<void> {
        const [anuncios, itens, contas] = await Promise.all([
            CarregadorApi.buscarLista<AnuncioPersistido>("anuncios"),
            CarregadorApi.buscarLista<ItemPersistido>("itens"),
            CarregadorApi.buscarLista<ContaPersistida>("contas"),
        ]);

        const contasPorId = CarregadorApi.mapearContas(contas);
        const itensPorId = CarregadorApi.mapearItens(itens);

        Anuncio.limparListaAnuncios();

        for (const anuncio of anuncios) {
            const dono = contasPorId.get(Number(anuncio.dono));
            const item = itensPorId.get(Number(anuncio.item));

            if (!dono || !item) continue;

            new Anuncio({
                id: anuncio.id,
                dono,
                item,
                preco: anuncio.preco,
                qualidade: anuncio.qualidade,
                ativo: anuncio.ativo,
                desconto: anuncio.desconto,
                vendido: anuncio.vendido,
            });
        }
    }

    private static async buscarLista<T>(recurso: string): Promise<T[]> {
        const response = await fetch(`${CarregadorApi.URL}/${recurso}/`);

        if (!response.ok) {
            throw new Error(`Erro ao buscar ${recurso} na API`);
        }

        return response.json();
    }

    private static mapearContas(contas: ContaPersistida[]): Map<number, Conta> {
        return new Map(contas.map(conta => [Number(conta.id), new Conta(conta)]));
    }

    private static mapearItens(itens: ItemPersistido[]): Map<number, Item> {
        return new Map(itens.map(item => [Number(item.id), CarregadorApi.recriarItem(item)]));
    }

    private static recriarItem(item: ItemPersistido): Item {
        switch (item.tipo) {
            case "Livro":
                return new Livro({
                    id: Number(item.id),
                    nome: item.nome,
                    descricao: item.descricao,
                    autores: item.autores.map(autor => new Autor({
                        nome: autor._nome,
                        nascimento: new Date(autor._nascimento),
                    })),
                });
            case "Revista":
                return new Revista({
                    id: Number(item.id),
                    nome: item.nome,
                    descricao: item.descricao,
                    editora: item.editora,
                    edicao: item.edicao,
                });
        }
    }
}
