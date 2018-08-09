import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { CiaoPage } from '../ciao/ciao';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild('email') email;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl : AlertController, public fireAuth: AngularFireAuth)  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  signInUser(){
    console.log(this.email.value, this.password.value);
    this.fireAuth.auth.signInWithEmailAndPassword(this.email.value, this.password.value).then(data =>{
      console.log(data);
      this.navCtrl.push(CiaoPage);
      this.showAlert('Successfull logged in');
    }).catch(err =>{
      console.log(err.message);
      this.showAlert(err.message);
    })
  }
  showAlert(message : string) {
    let alert = this.alertCtrl.create({
      title: 'login!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
