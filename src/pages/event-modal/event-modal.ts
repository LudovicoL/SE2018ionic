import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import * as moment from 'moment';
import {AulaProvider} from "../../providers/aula/aula";
import {Aula} from "../../app/models/Aula";
import {SegnalazioneProvider} from "../../providers/segnalazione/segnalazione";
import {Segnalazione} from "../../app/models/Segnalazione";
 
@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
 
  aula:any;
  descrizione:any;
  aule:Aula[];
  segnalazioni:Segnalazione[];
  constructor(public alertCtrl : AlertController,private aulaProvider: AulaProvider,private segnalazioneProvider: SegnalazioneProvider, public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController) {
    aulaProvider.getAula().subscribe(aule => {
      this.aule=aule;
    });
  }
 
  cancel() {
    this.segnalazioneProvider.getSegnalazioni().subscribe(segnalazioni => {
      this.segnalazioni= segnalazioni;
      this.viewCtrl.dismiss(this.segnalazioni);
    });
  }
 
  save(idAula,descrizione,idDocente) {
    console.log(this.aula,this.descrizione)
    idAula=this.aula;
    descrizione=this.descrizione;
    idDocente=2;
    this.segnalazioneProvider.save({idAula,descrizione,idDocente} as Segnalazione).subscribe(segnalazione => {
    this.showAlert('Segnalazione inviata con successo');
      this.segnalazioneProvider.getSegnalazioni().subscribe(segnalazioni => {
        this.segnalazioni= segnalazioni;
        this.viewCtrl.dismiss(this.segnalazioni);
      });
    });

  }
  showAlert(message : string) {
    let alert = this.alertCtrl.create({
      title: 'Segnalazione!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
