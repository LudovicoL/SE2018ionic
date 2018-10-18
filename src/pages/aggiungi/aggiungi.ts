import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
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
import { SegreteriadidatticaPage } from '../segreteriadidattica/segreteriadidattica';
import * as moment from 'moment';
import { CalendarioPage } from '../calendario/calendario';


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
  Strumento: boolean=false;
  Studente: boolean=false;
  Docente: boolean=false;
  Calendario:boolean=false;
  parameter: string;
  nomecorso: string;
  nomedocente:string;

  studente:  Studente;
  studenti: Studente[];
  docente: Docente;
  docenti:Docente[];


  aula:Aula;
  corso: Corso;
  corsi:Corso[];
  aule:Aula[];
  strumento:Strumento;
  insegnamenti:Insegnamento[];
  
  constructor(private modalCtrl: ModalController,private strumentoProvider: StrumentoProvider,private aulaProvider: AulaProvider,private insegnamentoProvider: InsegnamentoProvider,private docenteProvider: DocenteProvider,private corsoProvider: CorsoProvider, public alertCtrl : AlertController,private studenteProvider: StudenteProvider,public navCtrl: NavController, public navParams: NavParams,public fireAuth: AngularFireAuth) {
  
    this.parameter = navParams.get('paramNome'); 
    switch (this.parameter) {
      case "Corso":
        this.Corso= true;
        break;
    
      case "Insegnamento":
        this.Insegnamento=true;
        this.listaCorsi();
        this.listaDocenti();
        break;

      case "Aula":
        this.Aula=true;
        break;

      case "Strumento":
        this.Strumento=true;
        this.listaAule();
        break;

      case "Studente":
        this.Studente= true;
        this.listaCorsi();
        break;

      case "Docente":
        this.Docente= true;
        break;

      case "Calendario":
        this.Calendario= true;
        this.listaInsegnamenti();
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

  addInsegnamento(nomecorso,nome,cfu,anno,semestre,idCorso,idDocente){
    this.listaCorsi();
    this.listaDocenti();
    for(var i=0; i<this.corsi.length; i++){
      if(nomecorso==this.corsi[i].nome)
        idCorso=this.corsi[i].idCorso
    }
    for(var i=0; i<this.docenti.length; i++){
      if(this.nomedocente==this.docenti[i].nome)
        idDocente=this.docenti[i].idDocente
    }
    this.insegnamentoProvider.saveInsegnamento({nome,cfu,anno,semestre,idCorso,idDocente} as Insegnamento).subscribe(insegnamento => {
      this.showAlert('Insegnamento aggiunto con successo');
      this.navCtrl.push(SegreteriadidatticaPage);
      })
    };

  listaCorsi(){
    this.corsoProvider.getCorso().subscribe(corsi => {
      this.corsi = corsi;
    });
  }
  listaAule(){
    this.aulaProvider.getAula().subscribe(aule => {
      this.aule = aule;
    });
  }
  listaDocenti(){
    this.docenteProvider.getDocente().subscribe(docenti =>{
      this.docenti = docenti;
    })
  }
  listaInsegnamenti(){
    this.insegnamentoProvider.getInsegnamento().subscribe(insegnamenti =>{
      this.insegnamenti = insegnamenti;
    })
  }
  addStudente(nomecorso,nome,cognome,email,password,data,indirizzo, matricola, idcorso) {
    this.listaCorsi();
    for(var i=0; i<this.corsi.length; i++){
      if(this.nomecorso==this.corsi[i].nome)
        idcorso=this.corsi[i].idCorso
    }
/*     this.fireAuth.auth.createUserWithEmailAndPassword(email,password).then(data =>{ 
      this.showAlert('Registrazione eseguita con successo');
      this.navCtrl.push(HomePage);
    }).catch(err =>{
      this.showAlert(err.message);
    }) */
    this.studenteProvider.saveStudente({nome,cognome,email,password,data,indirizzo,matricola,idcorso} as Studente).subscribe(studente => {
      this.showAlert('Studente aggiunto con successo');
      this.navCtrl.push("SegreteriadidatticaPage");

    });
  }

  addDocente(nome,cognome,email,password,data,indirizzo, stipendio) {
    /* this.fireAuth.auth.createUserWithEmailAndPassword(email,password).then(data =>{ 
      this.showAlert('Registrazione eseguita con successo');
    }).catch(err =>{
      console.log(err.message)
      this.showAlert(err.message);
    }) */
    this.docenteProvider.saveDocente({nome,cognome,email,password,data,indirizzo,stipendio} as Docente).subscribe(docente => {
      this.showAlert('Docente aggiunto con successo');
      this.navCtrl.push("SegreteriadidatticaPage");
    });
  }

  addAula(nome,grandezza){
    this.aulaProvider.saveAula({nome,grandezza} as Aula).subscribe(aula => {
      this.showAlert('Aula aggiunta con successo');
      this.navCtrl.push("SegreteriadidatticaPage");
    })
  }

  addStrumento(nome,aula,funzionante,idAula){
    for(var i=0; i<this.aule.length; i++){
      funzionante=1;
      if(aula==this.aule[i].nome)
        idAula=this.aule[i].idAula;
        console.log(idAula);
        this.strumentoProvider.saveStrumento({nome,idAula,funzionante} as Strumento).subscribe(strumento => {
          this.showAlert('Strumento aggiunta con successo');
          this.navCtrl.push("SegreteriadidatticaPage");
        });
      }

  }

  addCalendario(item){
    this.navCtrl.push(CalendarioPage,{param:item,paramNome:"Segreteriadidattica"})
  }

  getItems(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() != '') {
      console.log(val);
        this.insegnamenti = this.insegnamenti.filter((item) => {
          console.log(item);
          return (item.nome.toString().toLowerCase().indexOf(val.toString().toLowerCase()) > -1);
        })
    }
    else{
      this.listaInsegnamenti();
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
