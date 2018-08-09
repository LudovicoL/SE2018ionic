import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Studente } from '../../app/models/Studente';
import { HomePage } from '../home/home';
import { StudenteProvider } from '../../providers/studente/studente';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { Corso } from '../../app/models/Corso';
import { CorsoProvider } from '../../providers/corso/corso';
import { Docente } from '../../app/models/Docente';
import { DocenteProvider } from '../../providers/docente/docente';
import { InsegnamentoProvider } from '../../providers/insegnamento/insegnamento';
import { Insegnamento } from '../../app/models/Insegnamento';
import { AulaProvider } from '../../providers/aula/aula';
import { Aula } from '../../app/models/Aula';
import { Strumento } from '../../app/models/Strumento';
import { StrumentoProvider } from '../../providers/strumento/strumento';

/**
 * Generated class for the AggiungiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aggiungi',
  templateUrl: 'aggiungi.html',
})
export class AggiungiPage {



  Corso: boolean=false;
  Insegnamento: boolean=false;
  Aula: boolean=false;
  strumentazione: boolean=false;
  Studente: boolean=false;
  Docente: boolean=false;

  parameter: string;
  nomecorso: string;

  studente:  Studente;
  studenti: Studente[];
  docente: Docente;
  @ViewChild('name') name;
  @ViewChild('surname') surname;
  @ViewChild('email') email;
  @ViewChild('password') password;
  @ViewChild('data') data;
  @ViewChild('indirizzo') indirizzo;
  @ViewChild('matricola') matricola;
  @ViewChild('idcorso') idcorso;
  @ViewChild('id') id;
  @ViewChild('facolta') facolta;
  @ViewChild('durata') durata;
  @ViewChild('livello') livello;
  @ViewChild('nome') nome;
  @ViewChild('stipendio') stipendio;
  @ViewChild('CFU') CFU;
  @ViewChild('semestre') semestre;
  @ViewChild('anno') anno;


  aula:Aula;
  corso: Corso;
  corsi:Corso[];
  strumento:Strumento;
  constructor(private strumentoProvider: StrumentoProvider,private aulaProvider: AulaProvider,private insegnamentoProvider: InsegnamentoProvider,private docenteProvider: DocenteProvider,private corsoProvider: CorsoProvider, public alertCtrl : AlertController,private studenteProvider: StudenteProvider,public navCtrl: NavController, public navParams: NavParams,public fireAuth: AngularFireAuth) {
  
    this.parameter = navParams.get('paramNome'); 
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
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AggiungiPage');
  }
  addCorso(nome,facolta,durata,livello){
    this.corsoProvider.saveCorso({nome,facolta,durata,livello} as Corso).subscribe(corso => {
      this.showAlert('Corso aggiunto con successo');
      this.navCtrl.push(HomePage);
    })
  };

  addInsegnamento(nomecorso,nome,cfu,anno,semestre,corsoIdCorso){
    this.listaCorsi();
    console.log(nomecorso)
    for(var i=0; i<this.corsi.length; i++){
      console.log(this.corsi[i])
      if(this.nomecorso==this.corsi[i].nome)
        corsoIdCorso=this.corsi[i].idCorso
    }
    console.log(corsoIdCorso)
    this.insegnamentoProvider.saveInsegnamento({nome,cfu,anno,semestre,corsoIdCorso} as Insegnamento).subscribe(insegnamento => {
      this.showAlert('Insegnamento aggiunto con successo');
      this.navCtrl.push(HomePage);
      })
    };

  listaCorsi(){
    this.corsoProvider.getCorso().subscribe(corsi => {
      this.corsi = corsi;
    });
  }

  addStudente(nomecorso,name,surname,email,password,data,indirizzo, matricola, idcorso) {
    this.listaCorsi();
    console.log(nomecorso)
    for(var i=0; i<this.corsi.length; i++){
      if(this.nomecorso==this.corsi[i].nome)
        idcorso=this.corsi[i].idCorso
    }
    console.log(idcorso);
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


  addDocente(name,surname,email,password,data,indirizzo, stipendio) {
    this.fireAuth.auth.createUserWithEmailAndPassword(this.email.value,this.password.value).then(data =>{ 
      console.log(data)
      this.showAlert('Registrazione eseguita con successo');
      this.navCtrl.push(HomePage);
    }).catch(err =>{
      console.log(err.message)
      this.showAlert(err.message);
    })
    this.docenteProvider.saveDocente({name,surname,email,password,data,indirizzo,stipendio} as Docente).subscribe(docente => {
      console.log(this.docente);
    });
  }

  addAula(nome,grandezza,proiettore,ariacondizionata,agibile,aulaIdAula){
    this.aulaProvider.saveAula({nome,grandezza} as Aula).subscribe(aula => {
      if(proiettore){
        nome="proiettore";
        agibile=1;
        this.aulaProvider.ultimaAula().subscribe(aulaIdAula => {
          this.strumentoProvider.saveStrumento({nome,agibile,aulaIdAula} as Strumento).subscribe(strumento => {
          });
        });;
      }
      if(ariacondizionata){
        nome="proiettore";
        agibile=1;
        this.aulaProvider.ultimaAula().subscribe(aulaIdAula => {
          this.strumentoProvider.saveStrumento({nome,agibile,aulaIdAula} as Strumento).subscribe(strumento => {
          });
        });;
      }
      this.showAlert('Aula aggiunta con successo');
      this.navCtrl.push(HomePage);
    })
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
