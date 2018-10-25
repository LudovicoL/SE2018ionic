import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { CorsoProvider } from '../../providers/corso/corso';
import { Corso } from '../../app/models/Corso';
import { INVALID } from '../../../node_modules/@angular/forms/src/model';
import { StudenteProvider } from '../../providers/studente/studente';
import { DocenteProvider } from '../../providers/docente/docente';
import { InsegnamentoProvider } from '../../providers/insegnamento/insegnamento';
import { StrumentoProvider } from '../../providers/strumento/strumento';
import { AulaProvider } from '../../providers/aula/aula';
import { Studente } from '../../app/models/Studente';
import { Docente } from '../../app/models/Docente';
import { Insegnamento } from '../../app/models/Insegnamento';
import { Strumento } from '../../app/models/Strumento';
import { Aula } from '../../app/models/Aula';
import { UpdatePage } from '../update/update';

@IonicPage()
@Component({
  selector: 'page-modifica',
  templateUrl: 'modifica.html',
})
export class ModificaPage {
  course:string;
  aule:Aula[];
  nomeaula:string;
  items: any[];
  Corsoo: boolean=false;
  Insegnamentoo: boolean=false;
  Aulaa: boolean=false;
  Strumentoo: boolean=false;
  Studentee: boolean=false;
  Docentee: boolean=false;
  icon:string;
  parameter: string;
  nomecorso: string;
  constructor(private aulaProvider: AulaProvider,private strumentoProvider: StrumentoProvider,private insegnamentoProvider: InsegnamentoProvider,private docenteProvider: DocenteProvider,private studenteProvider: StudenteProvider, private corsoProvider: CorsoProvider,public alertCtrl : AlertController,public navCtrl: NavController, public navParams: NavParams) {
    
    this.parameter = navParams.get('paramNome'); 
    this.course = navParams.data

    switch (this.parameter) {
      case "Corso":
        this.Corsoo= true;
        this.initializeItems();
        this.icon="school";
      break;
    
      case "Insegnamento":
        this.Insegnamentoo=true;
        this.initializeItems();
        this.icon="book";
        break;

      case "Aula":
        this.Aulaa=true;
        this.initializeItems();
        this.icon="home";
      break;

      case "Strumento":
        this.Strumentoo=true;
        this.initializeItems();
        this.icon="build";
        break;

      case "Studente":
        this.Studentee= true;
        this.initializeItems();
        this.icon="person";
        break;

      case "Docente":
        this.Docentee= true;
        this.initializeItems();
        this.icon="person";
        break;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AggiungiPage');
  }

  initializeItems() {
    if(this.Corsoo==true){
      this.corsoProvider.getCorso().subscribe(corsi=>{
        this.items = corsi;

      });
    }
    if(this.Insegnamentoo==true){
      this.insegnamentoProvider.getInsegnamento().subscribe(insegnamenti => {
        this.items = insegnamenti;
      });
    }
    if(this.Aulaa==true){
      this.aulaProvider.getAula().subscribe(aule=>{
        this.items = aule;
      });
    }
    if(this.Strumentoo==true){
      this.strumentoProvider.getStrumento().subscribe(strumentazioni=>{
      this.items = strumentazioni;
        });
    }
    if(this.Studentee==true){
      this.studenteProvider.getStudente().subscribe(studenti=>{
        this.items = studenti;
      });
    }
    if(this.Docentee==true){
      this.docenteProvider.getDocente().subscribe(docenti=>{
        this.items = docenti;
      });
    }
  }
  modificaCorso(page, nome, facolta,durata,livello,id,abilitazione){
    console.log(id);
    this.navCtrl.push('UpdatePage',{paramNome:page, param1:nome, param2:durata,param3:facolta,param4:livello,param5:id,param6:abilitazione})
  }
  modificaInsegnamento(page,idInsegnamento,nome,cfu,semestre,anno,nomedocente,nomecorso){
    this.navCtrl.push('UpdatePage',{paramNome:page, param1:idInsegnamento, param2:nome,param3:cfu,param4:semestre,param5:nomedocente,param6:nomecorso,param7:anno})
    console.log(semestre);
  }

  modificaAula(page, nome, grandezza,latitudine,longitudine,idAula){
    this.navCtrl.push('UpdatePage',{paramNome:page, param1:nome, param2:grandezza,param3:latitudine,param4:longitudine,param5:idAula})
  }

  modificaStrumentazione(page,nome,funzionante,idStrumento,idAula){
    console.log(nome)
    this.aulaProvider.getAulaById(idAula).subscribe(aula => {
      this.navCtrl.push('UpdatePage',{paramNome:page, param1:nome,param2:funzionante,param3:idStrumento,param4:aula.nome})
      console.log(aula.nome);
    });    

  }

  modificaStudente(page,nome,cognome,matricola,email,indirizzo,idUtente){
    this.navCtrl.push('UpdatePage',{paramNome:page, param1:nome,param2:cognome,param3:matricola,param4:email,param5:indirizzo,param6:idUtente})
  }

  modificaDocente(page,nome,cognome,stipendio,email,indirizzo,idUtente,idDocente){
    this.navCtrl.push('UpdatePage',{paramNome:page, param1:nome,param2:cognome,param3:stipendio,param4:email,param5:indirizzo,param6:idUtente,param7:idDocente})
  }


  getItems(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() != '') {
      if (this.Studentee == true) {
        this.items = this.items.filter((item) => {
          return (item.matricola.toString().toLowerCase().indexOf(val.toString().toLowerCase()) > -1 || item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.cognome.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
      else {
        this.items = this.items.filter((item) => {
          return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.cognome.toLowerCase().indexOf(val.toLowerCase()) > -1);

        })
      }
    }
    else{
      this.initializeItems();
    }
  }
  nameaula(idAula){
    this.aulaProvider.getAulaById(idAula).subscribe(aula => {
      return aula.nome;
      });
  }

}
