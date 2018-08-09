import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Studente } from '../../app/models/Studente';
import {StudenteProvider} from '../../providers/studente/studente'
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the RegistraStudentePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-registra-studente',
  templateUrl: 'registra-studente.html',
})
export class RegistraStudentePage {
  studente:  Studente;
  studenti: Studente[];
  @ViewChild('name') name;
  @ViewChild('surname') surname;
  @ViewChild('email') email;
  @ViewChild('password') password;
  @ViewChild('data') data;
  @ViewChild('indirizzo') indirizzo;
  @ViewChild('matricola') matricola;
  @ViewChild('idcorso') idcorso;
  @ViewChild('id') id;
  items: string[];

  constructor(public alertCtrl : AlertController,private studenteProvider: StudenteProvider, public navCtrl: NavController, public navParams: NavParams, public fire: AngularFireModule, public fireAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistraStudentePage');
  }

  cercaStudente() {
    this.studenteProvider.getStudente().subscribe(studenti => {
      this.studenti = studenti;
    });
  }


  addStudente(name,surname,email,password,data,indirizzo, matricola, idcorso) {
    this.fireAuth.auth.createUserWithEmailAndPassword(this.email.value,this.password.value).then(data =>{ 
      console.log(data)
      this.showAlert('Registrazione eseguita con successo');
      this.navCtrl.push(HomePage);
    }).catch(err =>{
      console.log(err.message)
      this.showAlert(err.message);
    })
    this.studenteProvider.saveStudente({name,surname,email,password,data,indirizzo,matricola, idcorso} as Studente).subscribe(studente => {
      console.log(this.studente);
    });
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
