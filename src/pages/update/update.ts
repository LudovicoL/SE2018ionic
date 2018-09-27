import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { StrumentoProvider } from '../../providers/strumento/strumento';
import { Aula } from '../../app/models/Aula';
import { AulaProvider } from '../../providers/aula/aula';
import { CorsoProvider } from '../../providers/corso/corso';
import { Corso } from '../../app/models/Corso';
import { Strumento } from '../../app/models/Strumento';
import { Studente } from '../../app/models/Studente';
import { StudenteProvider } from '../../providers/studente/studente';
import { SegreteriadidatticaPage } from '../segreteriadidattica/segreteriadidattica';
import { DocenteProvider } from '../../providers/docente/docente';
import { Docente } from '../../app/models/Docente';
import { InsegnamentoProvider } from '../../providers/insegnamento/insegnamento';
import { Insegnamento } from '../../app/models/Insegnamento';

/**
 * Generated class for the UpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {
  parameter: string;
  param1:any;
  param2:any;
  param3:any;
  param4:any;
  param5:any;
  param6:any;
  param7:any;

  grandezza:string;
  nomeaula:any;
  course:string;
  aule:Aula[];
  items:any[];
  
  ModificaCorso: boolean=false;
  ModificaInsegnamento: boolean=false;
  ModificaAula: boolean=false;
  ModificaStrumento: boolean=false;
  ModificaStudente: boolean=false;
  ModificaDocente: boolean=false;

  attivo:boolean=false;
  cfu:number;
  anno:number;
  semestre:string;
  nomecorso:string;
  nomedocente:string;


  constructor(public alertCtrl : AlertController,private insegnamentoProvider:InsegnamentoProvider,private docenteProvider:DocenteProvider, private corsoProvider:CorsoProvider,private aulaProvider:AulaProvider,public navCtrl: NavController,private strumentoProvider: StrumentoProvider, public navParams: NavParams, private studenteProvider: StudenteProvider) {

    this.parameter = navParams.get('paramNome');
    this.param1 = navParams.get('param1'); 
    this.param2 = navParams.get('param2'); 
    this.param3 = navParams.get('param3'); 
    this.param4= navParams.get('param4'); 
    this.param5= navParams.get('param5'); 
    this.param6= navParams.get('param6'); 
    this.param7= navParams.get('param7'); 

    this.course = navParams.data
    switch (this.parameter) {
      case "ModificaCorso":
        this.ModificaCorso= true;
        console.log(this.parameter)
        break;
      case "ModificaInsegnamento":
        this.ModificaInsegnamento= true;
        this.cfu=this.param3;
        this.anno=this.param7;
        this.semestre=this.param4;
        this.nomedocente=this.param5;
        this.nomecorso=this.param6;
        console.log(this.parameter)
        break;
      case "ModificaAula":
        this.ModificaAula= true;
        this.grandezza=this.param2;
        console.log(this.parameter)
        break;
      case "ModificaStrumento":
        this.ModificaStrumento= true;
        console.log(this.param2);
        if(this.param2==1)
          this.attivo=true;
        console.log(this.parameter)
        break;
      case "ModificaStudente":
        this.ModificaStudente= true;
        console.log(this.parameter)
        break;
        case "ModificaDocente":
        this.ModificaDocente= true;
        console.log(this.parameter)
        break;


    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePage');
  }

  aggiornaCorso(nome,facolta,durata,livello,idCorso){
    console.log(idCorso);
    this.corsoProvider.update({nome,facolta,durata,livello,idCorso} as Corso).subscribe(corso => {
      this.showAlert('Corso aggiornato con successo');
      this.navCtrl.push(SegreteriadidatticaPage);
    });
  }

  aggiornaStudente(email,indirizzo,idUtente){
    idUtente=this.param6;
    console.log(idUtente,indirizzo,email);
    this.studenteProvider.update({indirizzo,email,idUtente} as Studente).subscribe(studente => {
      this.showAlert('Studente aggiornato con successo');
      this.navCtrl.push(SegreteriadidatticaPage);
    });
  }
  aggiornaInsegnamento(cfu,anno,semestre,idInsegnamento){
    idInsegnamento=this.param1;
    this.insegnamentoProvider.update({cfu,anno,semestre,idInsegnamento} as Insegnamento).subscribe(insegnamento => {
      this.showAlert('Insegnamento aggiornato con successo');
      this.navCtrl.push(SegreteriadidatticaPage);
    });
  }
  aggiornaDocente(email,indirizzo,stipendio,idUtente,idDocente){
    idUtente=this.param6;
    idDocente=this.param7;
    this.docenteProvider.update({indirizzo,email,stipendio,idDocente,idUtente} as Docente).subscribe(docente => {
      this.showAlert('Docente aggiornato con successo');
      this.navCtrl.push(SegreteriadidatticaPage);
    });
  }

  aggiornaAula(grandezza,idAula){
    idAula=this.param5;
    this.aulaProvider.update({grandezza,idAula} as Aula).subscribe(aula => {
      this.showAlert('Aula aggiornata con successo');
      this.navCtrl.push(SegreteriadidatticaPage);
    });
  }

  aggiornaStrumento(nome,funziona,idStrumento,funzionante,abilitazione){
    idStrumento=this.param3;
    abilitazione=1;
    if(funziona==true){
      funzionante=1;
    }
    else{
      funzionante=0;
    }
    console.log(nome,funziona);
    console.log(nome,funzionante);
    this.strumentoProvider.update({nome,abilitazione,idStrumento,funzionante} as Strumento).subscribe(strumento => {
      this.showAlert('Strumento aggiornato con successo');
      this.navCtrl.push(SegreteriadidatticaPage);

    });
  }
  


  showAlert(message : string) {
    let alert = this.alertCtrl.create({
      title: 'Update!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
