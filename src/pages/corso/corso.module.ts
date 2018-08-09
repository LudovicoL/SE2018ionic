import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CorsoPage } from './corso';

@NgModule({
  declarations: [
    CorsoPage,
  ],
  imports: [
    IonicPageModule.forChild(CorsoPage),
  ],
})
export class CorsoPageModule {}
