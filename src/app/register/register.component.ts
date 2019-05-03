import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  message;
  constructor(private formBuilder: FormBuilder,private router: Router,private registerService: RegisterService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      mail:['', Validators.required],
      phone:['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get f(){
    return this.registerForm.controls;
  }

  public onSubmit(){

    if(this.registerForm.invalid){
      return;
    }
    this.registerService.register(this.f.name.value, this.f.mail.value,this.f.phone.value,this.f.password.value).subscribe(
      (data) => {
        console.log(data);

        //redireciona a view
        this.router.navigate(['/login']);
      },
      (error) => {
        this.message = error;
      }      
    );

  }


}
