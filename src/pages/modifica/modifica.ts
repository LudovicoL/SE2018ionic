import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { CorsoProvider } from '../../providers/corso/corso';
import { Corso } from '../../app/models/Corso';
import { INVALID } from '../../../node_modules/@angular/forms/src/model';

/**
 * Generated class for the ModificaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modifica',
  templateUrl: 'modifica.html',
})
export class ModificaPage {
  course:string;
  corsi:Corso[];

  Corso: boolean=false;
  Insegnamento: boolean=false;
  Aula: boolean=false;
  strumentazione: boolean=false;
  Studente: boolean=false;
  Docente: boolean=false;
  ModificaCorso: boolean=false;

  parameter: string;
  nomecorso: string;

  @ViewChild('name') name;

  constructor(public modalCtrl: ModalController, private corsoProvider: CorsoProvider,public alertCtrl : AlertController,public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
    this.parameter = navParams.get('paramNome'); 
    this.course = navParams.data

    switch (this.parameter) {
      case "Corso":
        this.Corso= true;
        break;
    
      case "Insegnamento":
        this.Insegnamento=true;
        this.listaCorsi();
        break;

      case "Aula":
        this.Aula=true;
        break;

      case "Strumentazione":
        this.strumentazione=true;
        break;

      case "Studente":
        this.Studente= true;
        this.listaCorsi();
        break;

      case "Docente":
        this.Docente= true;
        break;

      case "ModificaCorso":
        this.ModificaCorso= true;
        break;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AggiungiPage');
  }

  listaCorsi(){
    this.corsoProvider.getCorso().subscribe(corsi => {
      this.corsi = corsi;
    });
  }
  searchQuery: string = '';
  items: Corso[];


  initializeItems() {
    this.corsoProvider.getCorso().subscribe(corsi => {
      this.items = corsi;
    });
  }
  modificaCorso(item,course){
    course=item;
    item='ModificaCorso';
    this.navCtrl.push(ModificaPage,{paramNome:item, course})
    console.log(course)
  }

  aggiornaCorso(){
    console.log(this.course);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else{
      this.initializeItems();
    }
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
