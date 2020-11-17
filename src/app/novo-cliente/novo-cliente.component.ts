import { Component, Input, OnInit, Output,  EventEmitter } from '@angular/core';
import { clientes } from '../model/clientes';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'cli-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.css']
})
export class NovoClienteComponent implements OnInit {

  cliente: clientes = new clientes();

  constructor(private _snackBar: MatSnackBar) {
    this.cliente = new clientes();
  }

  ngOnInit() {
  }

  salvar(){
    if(this.validaDados() == false){
      return false;
    }
    this.openSnackBar("Cliente cadastrado com sucesso.");
    this.novoCliente.emit(this.cliente);
  }


  cancelar(){
    this.novoCliente.emit(this.cliente);
  }

//  @Input() lstCliente:clientes[];

  validaDados(){
    if(this.cliente.nome == null || this.cliente.nome.trim() == ""){
      this.openSnackBar("O preenchimento do campo nome é obrigatório.");
      return false;
    }

    return true;
  }

  openSnackBar(msg:string) {
    this._snackBar.open(msg,null,{
      duration:1500
    });
  }

  @Output() novoCliente = new EventEmitter();

}
