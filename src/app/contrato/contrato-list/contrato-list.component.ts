import { Component, OnInit } from '@angular/core';
import { Contrato } from '../contrato.model';
import { ContratoService } from '../contrato.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pessoa } from 'src/app/pessoa/pessoa.model';

@Component({
  selector: 'app-contrato-list',
  templateUrl: './contrato-list.component.html',
  styleUrls: ['./contrato-list.component.css']
})

export class ContratoListComponent implements OnInit {

  contratos: Contrato[];
  pessoas: Pessoa[];
  contratoEdit : Boolean;
 
  constructor(private contratoService: ContratoService,private router: Router) { }
  

  ngOnInit() {
    this.contratoEdit  = false;

    this.contratoService.getUsers().subscribe(
      (data: Pessoa[]) => {
        this.pessoas = data;
      },
      (error) =>{
        console.log(error);
      }
    );

  
    this.contratoService.getContratos().subscribe(
      (data: Contrato[]) => {
        this.contratos = data;
      },
      (error) =>{
        console.log(error);
      }
    );
  }

  
  public onSubmit(){
    this.router.navigate(['/contrato/new']);
  }

  public onResource(contratoId: number){
    console.log("Resource list")
    this.router.navigate(['/resource/id/',contratoId]);
  }



  public onUpdateContrato(contratoId: number){
    console.log("updateContrato")
    this.contratoEdit = true;
    this.router.navigate(['/contrato/edit',contratoId]);

    //UpdateContrato
  }

  public onDeleteContrato(contrato:Contrato){
    //Delete contrato.id

    this.contratoService.deleteContratos(contrato).subscribe(
      (data: string) => {
        this.ngOnInit();
        console.log(data);
      },
      (error) =>{
        console.log(error);
      }
    );
    
    //location.reload();

  }
}