import { Component } from '@angular/core';
import {AlertController, DateTime, NavController, NavParams} from "ionic-angular";
import {AulaProvider} from "../../providers/aula/aula";
import {LezioneProvider} from "../../providers/lezione/lezione";
import {Lezione} from "../../app/models/Lezione";


@Component({
  selector: 'page-ciao',
  templateUrl: 'ciao.html'
})
export class CiaoPage {
  constructor(public alertCtrl: AlertController, private aulaProvider: AulaProvider, private lezioneProvider: LezioneProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  lessons: Lezione[];
  eventSource;
  viewTitle;
  param = 1;
  datainizio: Date;
  datafine: Date;
  isToday: boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
   datainiziolezione: Date;
   datafinelezione:Date;

  // these are the variable used by the calendar.
  loadEvents() {
    this.eventSource = this.createRandomEvents();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }

  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  createRandomEvents() {
    this.datainizio=new Date(2018,6,1, 0,0,0);
    this.datafine=new Date(2018,11,29,0,0,0);
    this.param=1;
    var events = [];
    this.lezioneProvider.lezioneDocente(this.datainizio, this.datafine,this.param).subscribe(lezioni =>{
      this.lessons=lezioni;
      console.log(this.lessons.length)
      //console.log(this.lessons[0].datainizio.getMonth().toString())
      for(var i=0;i<this.lessons.length;i++) {
        console.log(this.lessons[i].datainizio);
        this.datainiziolezione = new Date(this.lessons[i].datainizio)
        this.datafinelezione = new Date(this.lessons[i].datafine)
        console.log(this.datainiziolezione)
        console.log(this.datafinelezione)
        var date = new Date();
        var eventType = Math.floor(Math.random() * 2);
        //var startDay = i;
        //console.log(startDay)
        //var endDay =i+1;
        var startTime;
        var endTime;
        //if (eventType === 0) {
        startTime = new Date(this.datainiziolezione);
        console.log(startTime)

        endTime = new Date(this.datafinelezione);
        events.push({
          title: 'Robotica ',
          startTime: startTime,
          endTime: endTime,
          allDay: false
        });
        /*} else {
          var startMinute = Math.floor(Math.random() * 24 * 60);
          var endMinute = Math.floor(Math.random() * 180) + startMinute;
          startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
          endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
          events.push({
            title: 'Event - ' + i,
            startTime: startTime,
            endTime: endTime,
            allDay: false
          });
        }*/
      }

    });
    return events;

  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };
}
