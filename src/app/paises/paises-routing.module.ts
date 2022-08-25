import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelecetorPageComponent } from './pages/selecetor-page/selecetor-page.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'selector',
        component: SelecetorPageComponent
      },
      {
        path:'**',
        redirectTo: 'selector'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaisesRoutingModule { }
