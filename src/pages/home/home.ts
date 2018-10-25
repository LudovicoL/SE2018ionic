import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SegreteriadidatticaPage } from '../segreteriadidattica/segreteriadidattica';
import {DocentePage} from "../docente/docente";


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
  login(){
    this.navCtrl.push(LoginPage);
  }
  
}
