import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterAreaServiceService } from './register-area-service.service';

@Component({
  selector: 'app-new-area',
  templateUrl: './new-area.component.html',
  styleUrls: ['./new-area.component.css']
})
export class NewAreaComponent implements OnInit {

  registerAreaForm: FormGroup;
  message;
  constructor(private formBuilder: FormBuilder,private router: Router,private registerService: RegisterAreaServiceService) { }

  ngOnInit() {
    this.registerAreaForm = this.formBuilder.group({
      descricao: ['', Validators.required],
      geometria:['', Validators.required],
      tiposolo:['', Validators.required]
    });
  }
  get f(){
    return this.registerAreaForm.controls;
  }

  public onSubmit(){
    if(this.registerAreaForm.invalid){
      console.log('retornou');
      return;
    }
    this.registerService.register(this.f.descricao.value, this.f.geometria.value,this.f.tiposolo.value).subscribe(
      (data) => {
        console.log(data);

        //redireciona a view
        this.router.navigate(['/area/all']);
      },
      (error) => {
        this.message = error;
      }      
    );

  }


}