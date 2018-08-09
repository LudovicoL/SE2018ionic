import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item, AlertController, Alert, App, MenuController } from 'ionic-angular';
import { RegistraStudentePage } from '../registra-studente/registra-studente';
import { AggiungiPage } from '../aggiungi/aggiungi';
import { ModificaPage } from '../modifica/modifica';

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

  constructor(public navCtrl: NavController,public nav: NavController) {
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
    ]
  }
  registrastudente(){
    this.navCtrl.push(RegistraStudentePage);
  }

  aggiungi(item){
    alert(" " +item);
    this.navCtrl.push('AggiungiPage',{paramNome:item})
  }
  
  modifica(item){
    alert(" " +item);
    this.navCtrl.push('ModificaPage',{paramNome:item})
  }

  prova(){
    alert("ciao");
  }
}

