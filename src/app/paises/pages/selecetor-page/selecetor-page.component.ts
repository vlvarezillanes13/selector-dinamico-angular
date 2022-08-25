import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises-service.service';
import { Pais, PaisSmall } from '../../interfaces/paises.interface';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selecetor-page',
  templateUrl: './selecetor-page.component.html',
  styles: [
  ]
})
export class SelecetorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region:[ '', [Validators.required, ], []],
    pais:[ '', [Validators.required, ], []],
    frontera:[ '', [Validators.required, ], []],
  });

  // llenar selectores
  regiones:string[] = [];
  paises: PaisSmall[] = [];
  //fronteras: string[] = [];
  fronteras: PaisSmall[] = [];

  //UI
  cargando: boolean = false;  

  constructor(  private fb: FormBuilder,
                private paisesService: PaisesService ) { }

  ngOnInit(): void {

    this.regiones = this.paisesService.regiones;

    // Cuando cambie la region
    // this.miFormulario.get('region')?.valueChanges
    //   .subscribe( region => {

    //     this.paisesService.getPaisesPorRegion( region )
    //       .subscribe( paises => {
    //         this.paises = paises;
    //       })
    //   })

    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap( ( _ ) => {
          this.miFormulario.get('pais')?.reset('');
          this.cargando = true;
        }),
        switchMap( region =>  this.paisesService.getPaisesPorRegion( region ) )
      ).subscribe( paises => {
        this.paises = paises;
        this.cargando = false;
      })

    //cuando cambia pais
    this.miFormulario.get('pais')?.valueChanges
    .pipe(
      tap( ( _ ) => {
        this.miFormulario.get('frontera')?.reset('');
        this.cargando = true;
      }),
      switchMap(  codigo  =>  this.paisesService.getPaisesPorCodigo( codigo ) ),
      switchMap(  pais  =>  this.paisesService.getPaisesPorCodigos( pais?.borders! ) )
    )
      .subscribe( paises => {
        this.fronteras = paises || [];
        this.cargando = false;
    })

  }

  guardar(){

  }

}
