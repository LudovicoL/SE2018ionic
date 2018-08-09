import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Corso } from '../../app/models/Corso';
import { CorsoProvider } from '../../providers/corso/corso';
import { HomePage } from '../home/home';

/**
 * Generated class for the CorsoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-corso',
  templateUrl: 'corso.html',
})
export class CorsoPage {
  corso:Corso;
  corsi:Corso[];

  @ViewChild('nome') nome;
  @ViewChild('facolta') facolta;
  @ViewChild('durata') durata;
  @ViewChild('livello') livello;


  constructor(public alertCtrl : AlertController,private corsoProvider: CorsoProvider, public navCtrl: NavController, public navParams: NavParams) {
  }
  ngOnInit() {
    this.corsoProvider.getCorso().subscribe(corsi => {
      this.corsi = corsi;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CorsoPage');
  }
  
  addCorso(nome,facolta,durata,livello) {
    this.corsoProvider.saveCorso({nome,facolta,durata,livello} as Corso).subscribe(corso => {
      this.showAlert('Corso aggiunto con successo');
      this.navCtrl.push(HomePage);
    })
      console.log(this.corso);
    };

    showAlert(message : string) {
      let alert = this.alertCtrl.create({
        title: 'Aggiunta corso!',
        subTitle: message,
        buttons: ['OK']
      });
      alert.present();
    }
  }



