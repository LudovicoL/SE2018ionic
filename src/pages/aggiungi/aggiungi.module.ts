import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AggiungiPage } from './aggiungi';

@NgModule({
  declarations: [
    AggiungiPage,
  ],
  imports: [
    IonicPageModule.forChild(AggiungiPage),
  ],
})
export class AggiungiPageModule {}
