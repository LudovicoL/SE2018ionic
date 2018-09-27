import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime, AlertController } from 'ionic-angular';
import { LezioneProvider } from '../../providers/lezione/lezione';
import { AulaProvider } from '../../providers/aula/aula';
import { Lezione } from '../../app/models/Lezione';
import { SegreteriadidatticaPage } from '../segreteriadidattica/segreteriadidattica';

/**
 * Generated class for the CalendarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html',
})
export class CalendarioPage {
  enabled:string="";
  param:any;
  items:any[];
  @ViewChild('idAula') idAula;

  constructor(public alertCtrl : AlertController, private aulaProvider: AulaProvider, private lezioneProvider: LezioneProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.param = navParams.get('param');
    this.aulaProvider.getAula().subscribe(aule=>{
      this.items=aule;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarioPage');

  }
  datainizio1:string;
  datafine1:string;
  onDaySelect(event: any) {
    this.datainizio1=(event.year+"-"+event.month+"-"+event.date)
    this.datafine1=(event.year+"-"+event.month+"-"+event.date)
    this.enabled="enable"
  }

  addlezione(data1,data2,idInsegnamento,idAula,datainizio,datafine){
    datainizio=(this.datainizio1+" "+data1)
    datafine=(this.datafine1+" "+data2)
    this.lezioneProvider.saveLezione({datainizio,datafine,idInsegnamento,idAula} as Lezione).subscribe(lezioni => {
      this.showAlert('Lezione aggiunta con successo');
      this.navCtrl.push(SegreteriadidatticaPage);

    });
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
