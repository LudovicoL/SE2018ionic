import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams, DateTime, AlertController, ModalController} from 'ionic-angular';
import { LezioneProvider } from '../../providers/lezione/lezione';
import { AulaProvider } from '../../providers/aula/aula';
import { Lezione } from '../../app/models/Lezione';
import { SegreteriadidatticaPage } from '../segreteriadidattica/segreteriadidattica';
import {EsameProvider} from "../../providers/esame/esame";
import {Esame} from "../../app/models/Esame";
import {EventModalPage} from "../event-modal/event-modal";

@IonicPage()
@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html',
})
export class CalendarioPage {
  Segreteriadidattica: boolean=false;
  Docenteee: boolean=false;
  Studenteee: boolean=false;
  Esame:boolean=false;
  Lezione:boolean=false;

  enabled:string="";
  param:any;
  items:any[];
  lessons:Lezione[];
  exam:Esame[];
  aula:boolean;
  appoiment:any;
  appoiment1:any;
  parameter: string;


  datainizio: Date;
  datafine:Date;

  data1=new Date();
  data2=new Date();


  eventSource;
  viewTitle;
  isToday: boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(public modalCtrl: ModalController,public alertCtrl : AlertController, private aulaProvider: AulaProvider, private esameProvider: EsameProvider, private lezioneProvider: LezioneProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.param = navParams.get('param');
    this.parameter = navParams.get('paramNome');

    switch (this.parameter) {
      case "Segreteriadidattica":

        this.Segreteriadidattica = true;
        this.lezioneProvider.getLezioneById(this.param.idInsegnamento).subscribe(lezioni => {
          this.lessons = lezioni;
        });

        this.esameProvider.getesameById(this.param.idInsegnamento).subscribe(esami => {
          this.exam = esami;
        });

        break;

      case "Docente":

        this.Docenteee = true;
        this.datainizio=new Date(2018,6,1, 0,0,0);
        this.datafine=new Date(2018,11,29,0,0,0);
        this.param=1;

        this.lezioneProvider.lezioneDocente(this.datainizio, this.datafine, this.param).subscribe(lezioni => {
          this.lessons = lezioni;
        })
        this.esameProvider.esameDocente(this.datainizio, this.datafine, this.param).subscribe(esami => {
          this.exam = esami;
        })

        break;

      case "Studente":
        this.Studenteee = true;
        this.datainizio=new Date(2018,6,1, 0,0,0);
        this.datafine=new Date(2018,11,29,0,0,0);
        this.param=1;

        this.lezioneProvider.lezioneStudente(this.datainizio, this.datafine, 1).subscribe(lezioni => {
          this.lessons = lezioni;
        })
        this.esameProvider.esameStudente(this.datainizio, this.datafine, 1).subscribe(esami => {
          this.exam = esami;
        })
        break;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarioPage');
  }

  dateChanged1(){
    var parts =this.appoiment.split(':');
    this.datainizio=new Date(this.data1.getFullYear(),this.data1.getMonth(),this.data1.getDate(),parts[0],parts[1]);
    if(this.datafine){
      this.aulelibere(this.datainizio, this.datafine);
    }
    else {
    }
  }

  dateChanged2(){
    var parts =this.appoiment1.split(':');
    this.datafine=new Date(this.data2.getFullYear(),this.data2.getMonth(),this.data2.getDate(),parts[0],parts[1]);
    if(this.datainizio){
      this.aulelibere(this.datainizio, this.datafine);
    }
    else {
    }
  }

  aulelibere(data1,data2) {
    this.aulaProvider.aulelibere(data1, data2).subscribe(aule => {
      this.items=aule;
    });
  }

  aulelibereEsame(data1,data2) {
    this.aulaProvider.aulelibereEsame(data1, data2).subscribe(aule => {
      this.items=aule;
    });
  }

  addlezione(data1,data2,idInsegnamento,idAula,datainizio,datafine, cont){
    datainizio=this.datainizio;
    datafine=this.datafine;
    this.lezioneProvider.lezioneesistente(datainizio,datafine,idInsegnamento).subscribe(numero =>{
      cont=numero;
      if(cont>0){
        this.showAlert('Lezioni sovrapposte');
      }
      else {
        this.lezioneProvider.saveLezione({datainizio, datafine, idInsegnamento, idAula} as Lezione).subscribe(lezioni => {
          this.showAlert('Lezione aggiunta con successo');
          this.aulelibere(datainizio, datafine);
          this.navCtrl.push(SegreteriadidatticaPage);
        });
      }
    })
  }

  addesame(data1,data2,idInsegnamento,idAula,tipo,datainizio,datafine, cont){
    datainizio=this.datainizio;
    datafine=this.datafine;
    this.esameProvider.esameesistente(datainizio,datafine,idInsegnamento).subscribe(numero =>{
      cont=numero;
      if(cont>0){
        this.showAlert('Esame sovrapposti');
      }
      else {
        this.esameProvider.saveEsame({datainizio, datafine, idInsegnamento, idAula, tipo} as Esame).subscribe(esami => {
          this.showAlert('Esame aggiunto con successo');
          this.aulelibereEsame(datainizio, datafine);
          this.navCtrl.push(SegreteriadidatticaPage);
        });
      }
    })
  }


  showAlert(message : string) {
    let alert = this.alertCtrl.create({
      title: 'Calendario!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }


  loadEvents() {
    this.eventSource = this.createEvents();
    this.Esame=false;
    this.Lezione=true;
  }

  loadEvents1() {
    this.eventSource = this.createEvents1();
    this.Esame=true;
    this.Lezione=false;
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event,param,datastart,dataend,nomeaula,idaula,insegnamento) {
    datastart=event.startTime;
    dataend=event.endTime;
    nomeaula=event.title;
    idaula=event.idaula;
    param="Info2";
    insegnamento=event.insegnamento;
    let modal = this.modalCtrl.create(EventModalPage,{datastart,dataend,param,nomeaula,idaula,insegnamento});
    modal.present();
    modal.onDidDismiss(data => {
    })
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
    this.enabled="enable"
    this.data1=new Date(ev.selectedTime)
    this.data2=new Date(ev.selectedTime);
  }

  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  createEvents() {
    var events = [];
      console.log(this.lessons.length)
      for(var i=0;i<this.lessons.length;i++) {
        var startTime;
        var endTime;
        startTime = new Date(this.lessons[i].datainizio)
        endTime = new Date(this.lessons[i].datafine)
        if(this.Docenteee==true){
          events.push({
            title: this.lessons[i].nomeInsegnamento + ' AULA:' + this.lessons[i].nomeaula,
            startTime: startTime,
            endTime: endTime,
            idaula: this.lessons[i].idAula,
            insegnamento: this.lessons[i].nomeInsegnamento,
            allDay: false
          });
        }
        if(this.Studenteee==true){
          events.push({
            //assare i parametri giusti di studente
            title: this.lessons[i].nomeInsegnamento + ' AULA:' + this.lessons[i].nomeaula,
            startTime: startTime,
            endTime: endTime,
            idaula: this.lessons[i].idAula,
            insegnamento: this.lessons[i].nomeInsegnamento,
            allDay: false
          });
        }
        if(this.Segreteriadidattica==true){
          events.push({
            title:' AULA:' + this.lessons[i].nomeaula,
            startTime: startTime,
            endTime: endTime,
            allDay: false
          });
        }
      }
    return events;
  }


  createEvents1() {
    var events = [];
    console.log(this.exam.length)
    for(var i=0;i<this.exam.length;i++) {
      var startTime;
      var endTime;
      startTime = new Date(this.exam[i].datainizio)
      endTime = new Date(this.exam[i].datafine)
      if(this.Docenteee==true){
        events.push({
          title: this.exam[i].nomeInsegnamento + ' AULA:' + this.exam[i].nomeaula,
          startTime: startTime,
          endTime: endTime,
          idaula: this.exam[i].idAula,
          insegnamento: this.exam[i].nomeInsegnamento,
          allDay: false
        });
      }
      if(this.Studenteee==true){
        events.push({
          title: this.exam[i].nomeInsegnamento + ' AULA:' + this.exam[i].nomeaula,
          startTime: startTime,
          endTime: endTime,
          idaula: this.exam[i].idAula,
          insegnamento: this.exam[i].nomeInsegnamento,
          allDay: false
        });
      }
      if(this.Segreteriadidattica==true){
        events.push({
          title:' AULA:' + this.exam[i].nomeaula,
          startTime: startTime,
          endTime: endTime,
          allDay: false
        });
      }
    }
    return events;
  }

  ciao(){
    console.log("ciao")
  }
}
