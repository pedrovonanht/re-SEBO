
import { Carrinho } from "./carrinho.ts"
import { Conta } from "./conta.ts"
import Livro from "./livro.ts"

interface anuncioObj {
    id?: number,
    dono: Conta,
    livro: Livro,
    preco: number,
    qualidade: string,
    ativo?: boolean,
    desconto?: number,
    vendido?: boolean,
}

interface AnuncioPersistido {
    id: number;
}

export class Anuncio {
    private _dono: Conta
    private _livro: Livro
    private _preco: number
    private _desconto: number
    private _qualidade: string
    private _ativo: boolean
    private _id: number;
    private _vendido: boolean;
    private _persistido: Promise<Response>;

    private static anuncios: Anuncio[] = [];
    private static nextId: number = 1;

    public static async inicializarNextId(): Promise<void> {
        const response = await fetch("http://localhost:3000/anuncios/");

        if (!response.ok) {
            throw new Error("Erro ao buscar anúncios existentes");
        }

        const anuncios: AnuncioPersistido[] = await response.json();

        Anuncio.nextId = anuncios.length > 0
            ? Math.max(...anuncios.map(anuncio => anuncio.id)) + 1
            : 1;
    }

    constructor({ id, dono, livro, preco, qualidade, ativo, desconto, vendido }: anuncioObj) {
        const jaExiste = id !== undefined;

        this._id = jaExiste ? id : Anuncio.nextId++;

        this.validaPreco(preco);
        this._dono = dono;
        this._livro = livro;
        this._preco = preco;
        this._qualidade = qualidade;
        this._ativo = ativo ?? true;
        this._desconto = desconto ?? 0;
        this._vendido = vendido ?? false;

        Anuncio.anuncios.push(this);

        if (jaExiste) {
            this._persistido = Promise.resolve(new Response(null));
            return;
        }

        this._persistido = fetch("http://localhost:3000/anuncios/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: this._id,
                nome: this.livro.nome,
                dono: this._dono.id,
                livro: this._livro.id,
                preco: this._preco,
                qualidade: this._qualidade,
                ativo: this._ativo,
                desconto: this._desconto,
                vendido: this._vendido
            }),
        });
    }

    public get id() {
        return this._id;
    }

    public get dono() {
        return this._dono;
    }

    public async marcarComoVendido(): Promise<void> {
        await this._persistido;

        const response = await fetch(`http://localhost:3000/anuncios/${this._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ vendido: true }),
        });

        if (!response.ok) {
            throw new Error(`Erro ao marcar anúncio ${this._id} como vendido`);
        }

        this._vendido = true;
    }

    public get preco() {
        return this._preco;
    }

    public set preco(preco: number) {
        this.validaPreco(preco);
        this._preco = preco;

        fetch("http://localhost:3000/anuncios/preco", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ preco: this._preco }),
        });
    }

    public get livro() {
        return this._livro;
    }

    public get qualidade() {
        return this._qualidade;
    }

    public get desconto() {
        return this._desconto;
    }

    public get ativo() {
        return this._ativo;
    }

    public get vendido() {
        return this._vendido;
    }

    public static listarAnuncios(): Anuncio[] {
        return this.anuncios;
    }

    public static limparListaAnuncios(): void {
        Anuncio.anuncios = [];
    }

    private validaPreco(preco: number): void {
        if (preco < 0) {
            throw new Error("Preço inválido");
        }
    }

    public set desconto(desconto: number) {
        this._desconto = desconto;

        fetch("http://localhost:3000/anuncios/desconto", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ desconto: this._desconto }),
        });
    }

    public aplicarDesconto({ porcentagemDesconto }: { porcentagemDesconto: number }): void {
        this.desconto = porcentagemDesconto;
    }

    public precoVenda(): number {
        return this._preco * ((100 - this._desconto) / 100);
    }

    public desativaAnuncio(): void {
        this._ativo = false;

        fetch("http://localhost:3000/anuncios/ativo", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ativo: this._ativo }),
        });
    }
}
