import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { RegisterAreaServiceService } from './register-area-service.service';
import { AreaService } from '../area.service';


@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.css']
})
export class AreaFormComponent implements OnInit {

  registerAreaForm: FormGroup;
  message;
  lt: number = -25.2970272;
  lg: number = -54.112394;
  zoom: number = 15;
  
  constructor(private formBuilder: FormBuilder,private router: Router,private registerService: AreaService) { }

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