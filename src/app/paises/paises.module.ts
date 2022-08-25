import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PaisesRoutingModule } from './paises-routing.module';
import { SelecetorPageComponent } from './pages/selecetor-page/selecetor-page.component';



@NgModule({
  declarations: [
    SelecetorPageComponent
  ],
  imports: [
    CommonModule,
    PaisesRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PaisesModule { }
