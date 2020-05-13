import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-empregado',
  templateUrl: './empregado.page.html',
  styleUrls: ['./empregado.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmpregadoPage implements OnInit {

  form: FormGroup;
  create = true;
  idEmpregado;
  empregadoResolved;

  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public toastController: ToastController) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.create = false;
        this.idEmpregado = params.id;
        this.http.get<any>(`http://dummy.restapiexample.com/api/v1/employee/${params.id}`).subscribe(empregado => {
          this.empregadoResolved = empregado;
          this.form = this.formBuilder.group({
            name: [empregado.employee_name, [Validators.required]],
            salary: [empregado.employee_salary, [Validators.required]],
            age: [empregado.employee_age, [Validators.required]]
          });
        }, error => {
          // Como a API de um empregado especifico esta dando falha, criei um fallback para pegar o item da listagem
          this.http.get<any>(`http://dummy.restapiexample.com/api/v1/employees`).pipe(map(empregados => {
            const emp = empregados.data.filter(tmp => {
              if (tmp.id === params.id) {
                return tmp;
              }
            });
            return emp[0];
          })).subscribe(empregado => {
            this.empregadoResolved = empregado;
            this.form = this.formBuilder.group({
              name: [empregado.employee_name, [Validators.required]],
              salary: [empregado.employee_salary, [Validators.required]],
              age: [empregado.employee_age, [Validators.required]]
            });
          })
        })
      } else {
        this.form = this.formBuilder.group({
          name: ['', [Validators.required]],
          salary: ['', [Validators.required]],
          age: ['', [Validators.required]]
        });
      }
    });
  }

  getErrorMessage(controlName) {
    const control = this.form.get(controlName);
    if (control.hasError('required')) {
      return 'Este campo é obrigatório';
    }
  }

  save() {
    if (!this.create) {
      this.http.put(`http://dummy.restapiexample.com/api/v1/update/${this.idEmpregado}`, this.form.value).subscribe(() => {
        this.presentToastUpdateSuccess()
      }, () => {
        this.presentToastUpdateError()
      });
    } else {
      this.http.post('http://dummy.restapiexample.com/api/v1/create', this.form.value).subscribe(() => {
        this.presentToastCreateSuccess()
      }, () => {
        this.presentToastCreateError()
      });
    }
  }

  async presentToastUpdateSuccess() {
    const toast = await this.toastController.create({
      message: 'Empregado atualizado com sucesso',
      duration: 2000
    });
    toast.present();
  }

  async presentToastUpdateError() {
    const toast = await this.toastController.create({
      message: 'Não foi possível atualizar o empregado',
      duration: 2000
    });
    toast.present();
  }

  async presentToastCreateSuccess() {
    const toast = await this.toastController.create({
      message: 'Empregado criado com sucesso',
      duration: 2000
    });
    toast.present();
  }

  async presentToastCreateError() {
    const toast = await this.toastController.create({
      message: 'Não foi possível criar o empregado',
      duration: 2000
    });
    toast.present();
  }

}