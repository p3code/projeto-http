import { Component, OnInit } from '@angular/core';
import { Livro } from '../application/domain/livro.domain';
import { LivroSevice } from '../infrastructure/services/livro-api-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  listaDeLivros: Livro[] = [];
  carregando = true;

  formGroup = new FormGroup({
    titulo: new FormControl('', Validators.required),
    preco: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required)
  });

  constructor(private livroApi: LivroSevice) {}

  ngOnInit() {
    this.buscarLivros();
  }

  async buscarLivros() {
    const lista = await this.livroApi.obterLivros();
    this.listaDeLivros = lista.map(livro => new Livro(livro.id, livro.nome, livro.preco, livro.tipo));
    this.carregando = false;
  }

  async salvarLivro() {
    if(this.formGroup.valid) {
      const ultimoItem = this.listaDeLivros[this.listaDeLivros.length - 1];
      const novoId = ultimoItem.id + 1;
      const titulo: string = this.formGroup.get('titulo').value;
      const preco: number = Number(this.formGroup.get('preco').value);
      const tipo: string = this.formGroup.get('tipo').value;
      await this.livroApi.salvarLivro(
        new Livro(
          novoId,
          titulo,
          preco,
          tipo
        )
      );
      this.limparForm();
    }
  }

  async limparForm() {
    this.formGroup.reset();
    await this.buscarLivros()
  }
}
