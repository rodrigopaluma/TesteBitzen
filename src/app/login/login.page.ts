import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  encapsulation: ViewEncapsulation.None
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
      this.router.navigate(['./home']); 
    } else  {
      console.log('\x1b[41m%s\x1b[37m','Formulário Inválido, preencha corretamente.');
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