import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarioPage } from './calendario';
import {CalendarModule} from "ionic3-calendar-en";
import {NgCalendarModule} from "ionic2-calendar";

@NgModule({
  declarations: [
    CalendarioPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarioPage),
    CalendarModule,
    NgCalendarModule
  ],
})
export class CalendarioPageModule {}
