import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SegreteriadidatticaPage } from '../segreteriadidattica/segreteriadidattica';
import { MenuPage } from '../menu/menu';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  login(){
    this.navCtrl.push(LoginPage);
  }
  
}
