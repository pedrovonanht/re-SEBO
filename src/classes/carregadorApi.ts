import { Anuncio } from "./anuncios.ts";
import { Autor } from "./autor.ts";
import { Conta } from "./conta.ts";
import Livro from "./livro.ts";

interface AnuncioPersistido {
    id: number;
    nome: string;
    dono: number | string;
    livro: number | string;
    preco: number;
    qualidade: string;
    ativo: boolean;
    desconto: number;
    vendido: boolean;
}

interface LivroPersistido {
    id: number | string;
    nome: string;
    descricao: string;
    autores: { _nome: string, _nascimento: string }[];
}

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
        const [anuncios, livros, contas] = await Promise.all([
            CarregadorApi.buscarLista<AnuncioPersistido>("anuncios"),
            CarregadorApi.buscarLista<LivroPersistido>("livro"),
            CarregadorApi.buscarLista<ContaPersistida>("contas"),
        ]);

        const contasPorId = CarregadorApi.mapearContas(contas);
        const livrosPorId = CarregadorApi.mapearLivros(livros);

        Anuncio.limparListaAnuncios();

        for (const anuncio of anuncios) {
            const dono = contasPorId.get(Number(anuncio.dono));
            const livro = livrosPorId.get(Number(anuncio.livro));

            if (!dono || !livro) continue;

            new Anuncio({
                id: anuncio.id,
                dono,
                livro,
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

    private static mapearLivros(livros: LivroPersistido[]): Map<number, Livro> {
        return new Map(livros.map(livro => [Number(livro.id), CarregadorApi.recriarLivro(livro)]));
    }

    private static recriarLivro(livro: LivroPersistido): Livro {
        return new Livro({
            id: Number(livro.id),
            nome: livro.nome,
            descricao: livro.descricao,
            autores: livro.autores.map(autor => new Autor({
                nome: autor._nome,
                nascimento: new Date(autor._nascimento),
            })),
        });
    }
}
