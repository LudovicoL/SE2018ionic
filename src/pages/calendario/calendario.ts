import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime, AlertController } from 'ionic-angular';
import { LezioneProvider } from '../../providers/lezione/lezione';
import { AulaProvider } from '../../providers/aula/aula';
import { Lezione } from '../../app/models/Lezione';
import { SegreteriadidatticaPage } from '../segreteriadidattica/segreteriadidattica';

@IonicPage()
@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html',
})
export class CalendarioPage {
  Segreteriadidattica: boolean=false;
  Docenteee: boolean=false;
  Studenteee: boolean=false;

  enabled:string="";
  param:any;
  items:any[];
  lessons:Lezione[];
  aula:boolean;
  appoiment:any;
  appoiment1:any;
  parameter: string;

  datainizio1:string;
  datafine1:string;
  datainizio: Date;
  datafine:Date;
  prova:Date[];

  data1=new Date();
  data2=new Date();

  constructor(public alertCtrl : AlertController, private aulaProvider: AulaProvider, private lezioneProvider: LezioneProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.param = navParams.get('param');
    this.parameter = navParams.get('paramNome');

    switch (this.parameter) {
      case "Segreteriadidattica":
        this.Segreteriadidattica = true;
        this.lezioneProvider.getLezioneById(this.param.idInsegnamento).subscribe(lezioni =>{
          this.lessons=lezioni;
        });
        break;

      case "Docente":
        this.Docenteee = true;
        break;

      case "Studente":
        this.Studenteee = true;
        break;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarioPage');
  }

  onDaySelect(event: any) {
    this.data1=new Date(event.year,event.month,event.date);
    this.data2=new Date(event.year,event.month,event.date);
    //this.datainizio1=(event.year+"-"+event.month+"-"+event.date)
    //this.datafine1=(event.year+"-"+event.month+"-"+event.date)
    this.enabled="enable"
  }

  onDayDocenteSelect(event: any) {

    this.data1=new Date(event.year,event.month,event.date);
    this.data2=new Date(event.year,event.month,event.date);
    this.appoiment="00:00"
    this.appoiment1="23:59"
    var parts =this.appoiment.split(':');
    this.datainizio=new Date(this.data1.getFullYear(),this.data1.getMonth(),this.data1.getDate(),parts[0],parts[1]);
    var parts =this.appoiment1.split(':');
    this.datafine=new Date(this.data2.getFullYear(),this.data2.getMonth(),this.data2.getDate(),parts[0],parts[1]);
    this.lezioneProvider.lezioneDocente(this.datainizio,this.datafine,this.param).subscribe(lezioni =>{
      this.lessons=lezioni;
      //console.log(this.lessons[0].datainizio.getMonth().toString())
    });
    this.enabled="enable"
  }

  dateChanged1(){
    var parts =this.appoiment.split(':');
    this.datainizio=new Date(this.data1.getFullYear(),this.data1.getMonth(),this.data1.getDate(),parts[0],parts[1]);
    console.log(this.data1)
    //this.datainizio=(this.datainizio1+" "+this.appoiment);


    if(this.datafine){
      this.aulelibere(this.datainizio, this.datafine);
    }
    else {
    }
  }

  dateChanged2(){
    var parts =this.appoiment1.split(':');
    this.datafine=new Date(this.data2.getFullYear(),this.data2.getMonth(),this.data2.getDate(),parts[0],parts[1]);

    //this.datafine=(this.datafine1+" "+this.appoiment1)
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

  showAlert(message : string) {
    let alert = this.alertCtrl.create({
      title: 'Registrazione!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }


}
