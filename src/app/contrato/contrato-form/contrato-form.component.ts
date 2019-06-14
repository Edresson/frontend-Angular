import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContratoService } from '../contrato.service';
import { Contrato } from '../contrato.model';
import { PessoaService } from 'src/app/pessoa/pessoa.service';
import { Pessoa } from 'src/app/pessoa/pessoa.model';

@Component({
  selector: 'app-contrato-form',
  templateUrl: './contrato-form.component.html',
  styleUrls: ['./contrato-form.component.css']
})
export class ContratoFormComponent implements OnInit {
  editContratoflag: boolean;
  registerContratoForm: FormGroup;
  
  message;
  contratoID: number;
  personID:number;
  constructor(private formBuilder: FormBuilder,private router: Router,private registerService: ContratoService,private route: ActivatedRoute,private contratoService: ContratoService, private pessoa:PessoaService) { }

  ngOnInit() {
    this.editContratoflag = false;
    
    this.registerContratoForm = this.formBuilder.group({
        authorized: ['', Validators.required],
        dateStart:['', Validators.required],
        dateEnd:['', Validators.required]
    });
    this.personID =0
    this.getPessoa() 

    this.route.paramMap.subscribe(params => {
      const contratoId = +params.get('id');
      console.log('contratoid:')
      if(contratoId){
        this.getContrato(contratoId);
        this.contratoID = contratoId;
        this.editContratoflag = true;

      }
    });
  }

  getPessoa(){
    this.pessoa.getPessoa().subscribe(
      (pessoaOb: Pessoa) => {
        //console.log("id da pessoa",pessoaOb.id)
        this.personID =pessoaOb.id;
      },
      (err:any) => console.log('error')
    );
    
  }

  getContrato(contratoId: number){
    this.contratoService.getContrato(contratoId).subscribe(
      (contrato: Contrato) => {
        //console.log("entrou no edit contrato",contrato);
        this.editContrato(contrato);
      },
      (err:any) => console.log('error')
    );
    
  }
  editContrato(contrato: Contrato){
    console.log('contrato:',contrato);
    console.log('editcontrato:',contrato.authorized.id,contrato.person.id,contrato.dateStart,this.personID);
    //não acessa o for
    
    
    //console.log('contrato',item.description,item.geometry,item.soil.id);
    this.registerContratoForm.patchValue({
        id: contrato.id,
        authorized: contrato.authorized.id,
        person: contrato.person.id,
        dateStart: contrato.dateStart,
        dateEnd: contrato.dateEnd
    })
    
  }
  get f(){
    return this.registerContratoForm.controls;
  }

  public onSubmit(){
    if(this.registerContratoForm.invalid){
      console.log('retornou');
      return;
    }
    if(!this.editContratoflag){
      this.registerService.register(Number(this.f.authorized.value),Number(this.personID ),this.f.dateStart.value, this.f.dateEnd.value).subscribe(
      (data) => {
        console.log(data);

        //redireciona a view
        this.router.navigate(['/contrato/all']);
      },
      (error) => {
        this.message = error;
      }      
    );
  }
  else{
      this.registerService.edit(this.contratoID,Number(this.f.authorized.value),Number(this.personID ),this.f.dateStart.value, this.f.dateEnd.value).subscribe(
      (data) => {
        console.log(data);

        //redireciona a view
        this.router.navigate(['/contrato/all']);
      },
      (error) => {
        this.message = error;
      }      
    );
  }
  }




}
