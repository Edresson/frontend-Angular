import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AuthUtilService } from './auth-util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl;

  message;

  constructor(private formBuilder: FormBuilder, private loginServise: LoginService, private router: Router, private authUtil: AuthUtilService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f(){
    return this.loginForm.controls;
  }

  public onSubmit(){
    this.submitted = true;

    if(this.loginForm.invalid){
      return;
    }

    this.loading = true;
    this.loginServise.login(this.f.username.value, this.f.password.value).subscribe(
      (data) => {
        this.loading = false;
        console.log(data);
        localStorage.setItem('token', data);
        this.authUtil.currentTokenValue = data;

        //redireciona a view
        this.router.navigate(['/']);
      },
      (error) => {
        this.loading = false;
        this.message = error;
      }      
    );
  }
}
