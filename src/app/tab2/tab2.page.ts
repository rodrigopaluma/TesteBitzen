import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  empregados;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.empregados = this.http.get<any>('http://dummy.restapiexample.com/api/v1/employees').pipe(
      map(empregados => {
        return empregados.data;
      })
    )
  }

}
