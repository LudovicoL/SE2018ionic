import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SegreteriadidatticaPage } from '../segreteriadidattica/segreteriadidattica';
import {DocentePage} from "../docente/docente";
import {StudentePage} from "../studente/studente";
import {CiaoPage} from "../ciao/ciao";
import {CorsoPage} from "../corso/corso";
import {AngularFireAuth} from "angularfire2/auth";
import {StudenteProvider} from "../../providers/studente/studente";
import {DocenteProvider} from "../../providers/docente/docente";
import {Corso} from "../../app/models/Corso";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(private studenteProvider:StudenteProvider, private docenteProvider:DocenteProvider, public fireAuth: AngularFireAuth,public alertCtrl : AlertController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  segreteriadidattica(){
    this.navCtrl.push(SegreteriadidatticaPage);
  }


  prova(){
    this.navCtrl.push(CorsoPage);

  }

  signInUser(email,password){
    console.log(email, password);
    this.fireAuth.auth.signInWithEmailAndPassword(email, password).then(data =>{
      console.log(data);

      this.studenteProvider.getStudente().subscribe(studenti=>{
        for (var i=0; i<studenti.length;i++){
          if(studenti[i].email==email){
            this.showAlert('Successfull logged in');
            this.navCtrl.push(StudentePage,{paramutente:studenti[i]});
          }
        }
      })

      this.docenteProvider.getDocente().subscribe(docenti=>{
        for (var i=0; i<docenti.length;i++){
          if(docenti[i].email==email){
            this.showAlert('Successfull logged in');
            this.navCtrl.push(DocentePage,{paramutente:docenti[i]});
          }
        }
      })

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
