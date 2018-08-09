import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistraStudentePage } from './registra-studente';

@NgModule({
  declarations: [
    RegistraStudentePage,
  ],
  imports: [
    IonicPageModule.forChild(RegistraStudentePage),
  ],
})
export class RegistraStudentePageModule {}
