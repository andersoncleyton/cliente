import { Component, Input, OnInit, OnChanges, SimpleChanges, Output,  EventEmitter} from '@angular/core';
import { clientes } from '../model/clientes';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'cli-edita-cliente',
  templateUrl: './edita-cliente.component.html',
  styleUrls: ['./edita-cliente.component.css']
})
export class EditaClienteComponent implements OnChanges  {

  @Input() clienteParam: clientes;
  @Output() clienteEditado = new EventEmitter();
  cliente: clientes;

  constructor(private _snackBar: MatSnackBar) {
    this.cliente = new clientes();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    console.log(changes.clienteParam.currentValue);
    this.cliente = changes.clienteParam.currentValue;
    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values
}

  salvar(){
    console.log(this.cliente);
    if(this.validaDados() == false){
      return false;
    }
    this.openSnackBar("Dados atualizados com sucesso.");
    this.clienteEditado.emit(this.cliente);
  }


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

  cancelar(){
    this.clienteEditado.emit(null);
  }
}
