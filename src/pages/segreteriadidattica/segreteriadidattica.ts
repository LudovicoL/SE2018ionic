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
  pagina:string;
  items1:any;

  constructor(public alertCtrl: AlertController,public navCtrl: NavController,public nav: NavController,private segnalazioneProvider: SegnalazioneProvider) {
    this.segnalazioneProvider.getSegnalazioni().subscribe(segnalazioni =>{
      this.items1=segnalazioni;
    })
    
    this.items = [
      {
        'title': 'Studente',
        'icon': 'person',
        'color': '#E63135'
      },
      {
        'title': 'Docente',
        'icon': 'css3',
        'description': 'The latest version of cascading stylesheets - the styling language of the web!',
        'color': '#0CA9EA'
      },
      {
        'title': 'Corso',
        'icon': 'html5',
        'description': 'The latest version of the web\'s markup language.',
        'color': '#F46529'
      },
      {
        'title': 'Calendario',
        'icon': 'javascript',
        'description': 'One of the most popular programming languages on the Web!',
        'color': '#FFD439'
      },
      {
        'title': 'Insegnamento',
        'icon': 'sass',
        'description': 'Syntactically Awesome Stylesheets - a mature, stable, and powerful professional grade CSS extension.',
        'color': '#CE6296'
      },
      {
        'title': 'Aula',
        'icon': 'nodejs',
        'description': 'An open-source, cross-platform runtime environment for developing server-side Web applications.',
        'color': '#78BD43'
      },
      {
        'title': 'Strumento',
        'icon': 'nodejs',
        'description': 'An open-source, cross-platform runtime environment for developing server-side Web applications.',
        'color': '#78BD43'
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

  modificaSegnalazione(idSegnalazione,abilitazione){
    const confirm = this.alertCtrl.create({
      title: "Segnalazione",
      message: 'Sei sicuro di voler cambiare lo stato ?',
      buttons: [
        {
          text: 'In carico',
          handler: () => {
            abilitazione=1;
            this.segnalazioneProvider.update({idSegnalazione,abilitazione} as Segnalazione).subscribe(segnalazione => {
              this.showAlert('Stato aggiornato con successo');
              this.navCtrl.push(SegreteriadidatticaPage);
            });

          }
        },
        {
          text: 'Risolto',
          handler: () => {
            abilitazione=2;
            this.segnalazioneProvider.update({idSegnalazione,abilitazione} as Segnalazione).subscribe(segnalazione => {
              this.showAlert('Stato aggiornato con successo');
              this.navCtrl.push(SegreteriadidatticaPage);
            });
          }
        }
      ]
    });
    confirm.present();
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

  showAlert(message : string) {
    let alert = this.alertCtrl.create({
      title: 'Eliminato!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}

