import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmpregadoPage } from './empregado.page';

describe('EmpregadoPage', () => {
  let component: EmpregadoPage;
  let fixture: ComponentFixture<EmpregadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpregadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmpregadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
