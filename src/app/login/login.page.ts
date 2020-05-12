import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  login() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.router.navigate(['./tabs/tab1']);
    } else  {
      console.log('Invalido');
    }
  }
  getErrorMessage(controlName) {

    const control = this.form.get(controlName);
    if (control.hasError('required') && control.touched) {
      return 'Este campo é obrigatório';
    }
    if (control.hasError('email') && control.touched) {
      return 'Este campo campo deve conter um e-mail válido';
    }
  }

}