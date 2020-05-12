import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpregadoPageRoutingModule } from './empregado-routing.module';

import { EmpregadoPage } from './empregado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpregadoPageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  declarations: [EmpregadoPage]
})
export class EmpregadoPageModule {}