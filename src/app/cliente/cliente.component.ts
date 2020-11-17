import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { clientes } from '../model/clientes';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'cli-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {


  listagem = "list";
  novo = "new";
  edicao = "edit";

  clientes: clientes[] = [];
  clienteEdit: clientes = new clientes();
  identity_cliente:number = 0;

  tipoExibicao: string = "list";

  dataSource: MatTableDataSource<clientes> = new MatTableDataSource<clientes>();

  displayedColumns: string[] = ['nome','idade','id','editar'];

  constructor(private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    var teste = new clientes();
  teste.nome = "anderson";
  teste.idade = 2;
  teste.endereco = "erererrer";
  teste.id = this.getProximoIdCliente();
  this.clientes.push(teste);
  this.dataSource.data = this.clientes;
  }

  retornoCadastro(resposta: clientes){

    if(resposta){
      resposta.id = this.getProximoIdCliente();
      this.clientes.push(resposta);
    }
    this.dataSource.data = this.clientes;
    this.changeDetectorRefs.detectChanges();
    this.changeDetectorRefs.reattach();
    this.tipoExibicao = this.listagem;
  }

  retornoClienteEditado(resposta: clientes){

    if(resposta){
      this.clientes = this.clientes.filter(x=> x.id != resposta.id);
      this.clientes.push(resposta);
    }
    this.dataSource.data = this.clientes;
    this.changeDetectorRefs.detectChanges();
    this.tipoExibicao = this.listagem;
  }

  getProximoIdCliente(){
    this.identity_cliente += 1;
    return this.identity_cliente;
  }

  iniciaEdicaoCliente(cliente: clientes){
    console.log(cliente);
    this.clienteEdit = cliente;
    this.mudaExibicao(this.edicao);
  }

  mudaExibicao(tela: string){
    this.tipoExibicao = tela;
  }
}
