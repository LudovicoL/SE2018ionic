import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item, AlertController, Alert, App, MenuController } from 'ionic-angular';
import { AggiungiPage } from '../aggiungi/aggiungi';
import { ModificaPage } from '../modifica/modifica';
import { SegnalazioneProvider } from '../../providers/segnalazione/segnalazione';
import { Segnalazione } from '../../app/models/Segnalazione';

/**
 * Generated class for the SegreteriadidatticaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()


@Component({
  selector:'page-segreteriadidattica',
  templateUrl:'segreteriadidattica.html'
})
export class SegreteriadidatticaPage {
  items = [];
  items1:any;

  constructor(public alertCtrl: AlertController,public navCtrl: NavController,public nav: NavController,private segnalazioneProvider: SegnalazioneProvider) {
    this.segnalazioneProvider.getSegnalazioni().subscribe(segnalazioni =>{
      this.items1 = segnalazioni;
      for(var i=0; i<segnalazioni.length;i++){
        this.items1[i].data=new Date(segnalazioni[i].data);
      }
    })
    
    this.items = [
      {
        'title': 'Studente',
        'icon': 'person',
        'color': '#000000'
      },
      {
        'title': 'Docente',
        'icon': 'person',
        'color': '#000000'
      },
      {
        'title': 'Corso',
        'icon': 'school',
        'color': '#000000'
      },
      {
        'title': 'Insegnamento',
        'icon': 'book',
        'color': '#000000'
      },
      {
        'title': 'Aula',
        'icon': 'home',
        'color': '#000000'
      },
      {
        'title': 'Strumento',
        'icon': 'build',
        'color': '#000000'
      },
    ]
  }
  aggiungi(item){
    this.navCtrl.push('AggiungiPage',{paramNome:item})
  }
  
  modifica(item){
    this.navCtrl.push('ModificaPage',{paramNome:item})
  }

  cancella(item){
    this.navCtrl.push('DeletePage',{paramNome:item})
  }

  modificaSegnalazione(idSegnalazione,descrizione,abilitazione,commento){

    const prompt = this.alertCtrl.create({
      title: 'CAMBIA STATO',
      message: descrizione,
      inputs: [
        {
          name: "commento",
          placeholder: 'Rilascia un commento'
        },
      ],
      buttons: [
        {
          text: 'In carico',
          handler: data => {
            abilitazione=1;
            commento=data.commento;
            this.segnalazioneProvider.update({idSegnalazione,abilitazione,commento} as Segnalazione).subscribe(segnalazione => {
              this.showAlert('Stato aggiornato con successo');
              this.navCtrl.push(SegreteriadidatticaPage);
            });

          }
        },
        {
          text: 'Risolto',
          handler: data => {
            abilitazione=2;
            commento=data.commento;
            this.segnalazioneProvider.update({idSegnalazione,abilitazione,commento} as Segnalazione).subscribe(segnalazione => {
              this.showAlert('Stato aggiornato con successo');
              this.navCtrl.push(SegreteriadidatticaPage);
            });
          }
        },
        {
          text: 'Rifiutata',
          handler: data => {
            abilitazione=3;
            commento=data.commento;
            this.segnalazioneProvider.update({idSegnalazione,abilitazione,commento} as Segnalazione).subscribe(segnalazione => {
              this.showAlert('Stato aggiornato con successo');
              this.navCtrl.push(SegreteriadidatticaPage);
            });
          }
        }
      ]
    });
    prompt.present();
  }

  cancellaSegnalazione(idSegnalazione){
    const confirm = this.alertCtrl.create({
      title: "Segnalazione",
      message: 'Sei sicuro di voler eliminare la segnalazione?',
      buttons: [
        {
          text: 'si',
          handler: () => {
            this.segnalazioneProvider.delete(idSegnalazione as Response).subscribe(response =>{
              this.showAlert('Segnalazione eliminata con successo');
              this.navCtrl.push(SegreteriadidatticaPage);
            })
              //this.showAlert('Docente aggiornato con successo');
              //this.navCtrl.push('DeletePage',{paramNome:"Docente"});

          }
        },
        {
          text: 'No',
          handler: () => {

          }
        }
      ]
    });
    confirm.present();
  } 

  show(nomeaula,descrizione){
    this.showAlert1(nomeaula,descrizione)
  }

  showAlert(message : string) {
    let alert = this.alertCtrl.create({
      title: 'Eliminato!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  showAlert1(nomeaula:string, descrizione : string) {
    let alert = this.alertCtrl.create({
      title: nomeaula,
      subTitle: descrizione,
      buttons: ['OK']
    });
    alert.present();
  }
}

