import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CiaoPage } from './ciao';
import {RoundProgressModule} from "angular-svg-round-progressbar";

@NgModule({
  declarations: [
    CiaoPage,
  ],
  imports: [
    IonicPageModule.forChild(CiaoPage),
    RoundProgressModule

  ],
})
export class CiaoPageModule {}
