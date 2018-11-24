import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SegreteriadidatticaPage } from '../segreteriadidattica/segreteriadidattica';
import {DocentePage} from "../docente/docente";
import {StudentePage} from "../studente/studente";
import {CiaoPage} from "../ciao/ciao";
import {CorsoPage} from "../corso/corso";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  segreteriadidattica(){
    this.navCtrl.push(SegreteriadidatticaPage);
  }
  docente(){
    this.navCtrl.push(DocentePage);
  }

  studente(){
    this.navCtrl.push(StudentePage);

  }

  prova(){
    this.navCtrl.push(CiaoPage);

  }

  login(){
    this.navCtrl.push(LoginPage);
  }



  prova2(){
    this.navCtrl.push(CorsoPage);

  }

}
