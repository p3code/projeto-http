export class Livro {
    readonly id: number;
    readonly nome: string;
    readonly preco: number;
    readonly tipo: string;

    constructor(
        id: number,
        nome: string,
        preco: number,
        tipo: string
    ) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.tipo = tipo
    }

    public formatarPreco(): string {
      return `R$ ${this.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2})}`;
    }

}
