import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AulaProvider } from '../../providers/aula/aula';
import { StrumentoProvider } from '../../providers/strumento/strumento';
import { InsegnamentoProvider } from '../../providers/insegnamento/insegnamento';
import { DocenteProvider } from '../../providers/docente/docente';
import { StudenteProvider } from '../../providers/studente/studente';
import { CorsoProvider } from '../../providers/corso/corso';
import { Corso } from '../../app/models/Corso';
import { Insegnamento } from '../../app/models/Insegnamento';
import { Studente } from '../../app/models/Studente';
import { Docente } from '../../app/models/Docente';

/**
 * Generated class for the DeletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delete',
  templateUrl: 'delete.html',
})
export class DeletePage {
  Corsoo: boolean=false;
  Insegnamentoo: boolean=false;
  Aulaa: boolean=false;
  Strumentoo: boolean=false;
  Studentee: boolean=false;
  Docentee: boolean=false;
  parameter: string;
  course:string;
  items: any[];
  icon:string;

  constructor(public alertCtrl: AlertController,public modalCtrl: ModalController,private aulaProvider: AulaProvider,private strumentoProvider: StrumentoProvider,private insegnamentoProvider: InsegnamentoProvider,private docenteProvider: DocenteProvider,private studenteProvider: StudenteProvider, private corsoProvider: CorsoProvider,public navCtrl: NavController, public navParams: NavParams) {

    this.parameter = navParams.get('paramNome'); 
    this.course = navParams.data

    switch (this.parameter) {
      case "Corso":
        this.Corsoo= true;
        this.initializeItems();
      break;
    
      case "Insegnamento":
        this.Insegnamentoo=true;
        this.initializeItems();
        break;

      case "Aula":
        this.Aulaa=true;
        this.initializeItems();
      break;

      case "Strumento":
        this.Strumentoo=true;
        this.initializeItems();
        break;

      case "Studente":
        this.Studentee= true;
        this.initializeItems();
        break;

      case "Docente":
        this.Docentee= true;
        this.initializeItems();
        break;
    }
  }


  initializeItems() {
    if(this.Corsoo==true){
      this.corsoProvider.getCorso().subscribe(corsi=>{
        this.items = corsi;
        this.icon="school";
      });
    }
    if(this.Insegnamentoo==true){
      this.insegnamentoProvider.getInsegnamento().subscribe(insegnamenti => {
        this.items = insegnamenti;
        this.icon="book";
      });
    }
    if(this.Aulaa==true){
      this.aulaProvider.getAula().subscribe(aule=>{
        this.items = aule;
        this.icon="home";
      });
    }
    if(this.Strumentoo==true){
      this.strumentoProvider.getStrumento().subscribe(strumentazioni=>{
      this.items = strumentazioni;
        this.icon="build";
      });
    }
    if(this.Studentee==true){
      this.studenteProvider.getStudente().subscribe(studenti=>{
        this.items = studenti;
        this.icon="person";
      });
    }
    if(this.Docentee==true){
      this.docenteProvider.getDocente().subscribe(docenti=>{
        this.items = docenti;
        this.icon="person";
      });
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DeletePage');
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

  cancellaAula(idAula,nome){
    const confirm = this.alertCtrl.create({
      title: nome,
      message: 'Sei sicuro di volerla eliminare ?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.aulaProvider.delete(idAula as Response).subscribe(response =>{
              this.showAlert('Aula eliminata con successo');
              this.navCtrl.push('DeletePage',{paramNome:"Aula"});
            })
          }
        },
        {
          text: 'No',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  cancellaStrumento(idStrumento,nome){
    const confirm = this.alertCtrl.create({
      title: nome,
      message: 'Sei sicuro di volerlo eliminare ?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.strumentoProvider.delete(idStrumento as Response).subscribe(response =>{
              this.showAlert('Strumento eliminata con successo');
              this.navCtrl.push('DeletePage',{paramNome:"Strumento"});
            })
          }
        },
        {
          text: 'No',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  cancellaCorso(nome,idCorso,abilitazione){
    const confirm = this.alertCtrl.create({
      title: nome,
      message: 'Sei sicuro di voler cambiare lo stato ?',
      buttons: [
        {
          text: 'Disattiva',
          handler: () => {
            abilitazione=0;
            this.corsoProvider.updateabilitazione({idCorso,abilitazione} as Corso).subscribe(corso => {
            this.showAlert('Stato aggiornato con successo');
            this.navCtrl.push('DeletePage',{paramNome:"Corso"});
          });

          }
        },
        {
          text: 'Attiva',
          handler: () => {
            abilitazione=1;
            this.corsoProvider.updateabilitazione({idCorso,abilitazione} as Corso).subscribe(corso => {
              this.showAlert('Strumento aggiornato con successo');
              this.navCtrl.push('DeletePage',{paramNome:"Corso"});
            });
          }
        }
      ]
    });
    confirm.present();
  }

  cancellaInsegnamento(nome,idInsegnamento,abilitazione){
    const confirm = this.alertCtrl.create({
      title: nome,
      message: 'Sei sicuro di voler cambiare lo stato ?',
      buttons: [
        {
          text: 'Disattiva',
          handler: () => {
            abilitazione=0;
            this.insegnamentoProvider.updateabilitazione({idInsegnamento,abilitazione} as Insegnamento).subscribe(corso => {
            this.showAlert('Stato aggiornato con successo');
            this.navCtrl.push('DeletePage',{paramNome:"Insegnamento"});
          });

          }
        },
        {
          text: 'Attiva',
          handler: () => {
            abilitazione=1;
            this.insegnamentoProvider.updateabilitazione({idInsegnamento,abilitazione} as Insegnamento).subscribe(corso => {
              this.showAlert('Strumento aggiornato con successo');
              this.navCtrl.push('DeletePage',{paramNome:"Insegnamento"});
            });
          }
        }
      ]
    });
    confirm.present();
  } 

  cancellaStudente(nome,cognome,idUtente,abilitazione){
    const confirm = this.alertCtrl.create({
      title: nome+" "+ cognome,
      message: 'Sei sicuro di voler cambiare lo stato ?',
      buttons: [
        {
          text: 'Disattiva',
          handler: () => {
            abilitazione=0;
            this.studenteProvider.updateAbilitazione({idUtente,abilitazione} as Studente).subscribe(studente => {
              this.showAlert('Studente aggiornato con successo');
              this.navCtrl.push('DeletePage',{paramNome:"Studente"});
            });
          }
        },
        {
          text: 'Attiva',
          handler: () => {
            abilitazione=1;
            this.studenteProvider.updateAbilitazione({idUtente,abilitazione} as Studente).subscribe(studente => {
              this.showAlert('Studente aggiornato con successo');
              this.navCtrl.push('DeletePage',{paramNome:"Studente"});
            });
          }
        }
      ]
    });
    confirm.present();
  } 

  cancellaDocente(nome,cognome,idUtente,abilitazione){
    const confirm = this.alertCtrl.create({
      title: nome+" "+ cognome,
      message: 'Sei sicuro di voler cambiare lo stato ?',
      buttons: [
        {
          text: 'Disattiva',
          handler: () => {
            abilitazione=0;
            this.docenteProvider.updateAbilitazione({idUtente,abilitazione} as Docente).subscribe(docente => {
              this.showAlert('Docente aggiornato con successo');
              this.navCtrl.push('DeletePage',{paramNome:"Docente"});
            });
          }
        },
        {
          text: 'Attiva',
          handler: () => {
            abilitazione=1;
            this.studenteProvider.updateAbilitazione({idUtente,abilitazione} as Studente).subscribe(docente => {
              this.showAlert('Docente aggiornato con successo');
              this.navCtrl.push('DeletePage',{paramNome:"Docente"});
            });
          }
        }
      ]
    });
    confirm.present();
  } 

  showAlert(message : string) {
    let alert = this.alertCtrl.create({
      title: 'Eliminato!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
