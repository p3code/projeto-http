import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Livro } from "src/app/application/domain/livro.domain";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class LivroSevice {
    url = environment.api;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    constructor(private httpCliente: HttpClient) {}

    async obterLivros(): Promise<Livro[]> {
        return this.httpCliente.get<Livro[]>(`${this.url}livros`).toPromise();
    }

    async salvarLivro(livro: Livro): Promise<Livro> {
      console.log(livro);
        return this.httpCliente.post<Livro>(`${this.url}livros`, JSON.stringify(livro), this.httpOptions ).toPromise();
    }
}
