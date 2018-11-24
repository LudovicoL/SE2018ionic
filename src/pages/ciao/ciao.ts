import {Component} from '@angular/core';
import {AlertController, IonicPage} from 'ionic-angular';
import {NavController} from "ionic-angular";
import {ChatPage} from "../chat/chat";
import {InsegnamentoProvider} from "../../providers/insegnamento/insegnamento";
import {Insegnamento} from "../../app/models/Insegnamento";
import {StudenteProvider} from "../../providers/studente/studente";
import {Studente} from "../../app/models/Studente";



//here injecting  file transfer  and file class to our component part as object
@IonicPage()
@Component({
  selector: 'page-ciao',
  templateUrl: 'ciao.html'
})

export class CiaoPage {
  login:boolean=true;
  listachat:boolean=false;

  insegnamenti:Insegnamento[]
  studenti:Studente[];
  username:string=''
  idstudente=1;
  mio:any;
  constructor(private studenteProvider:StudenteProvider,private insegnamentoProvider:InsegnamentoProvider,private alertCtrl: AlertController, public navCtrl: NavController) {
  }
  
  loginUser(){
    this.studenteProvider.getStudenteById(this.idstudente).subscribe(studente=>{
      this.mio=studente
    })
    if (/^[a-zA-Z0-9]+$/.test(this.username)){
      this.login=false;
      this.insegnamentoProvider.insegnamentoByStudente(this.idstudente).subscribe(insegnamenti=>{
        this.insegnamenti=insegnamenti;

        this.studenteProvider.getStudenteById(this.idstudente).subscribe(studente=>{
          console.log(studente.idcorso)
          this.studenteProvider.getStudentiByIdCorso(studente.idcorso,this.idstudente).subscribe(studenti=>{
            this.studenti=studenti;
            this.listachat=true;
          })
        })
      })
    }
    else {

      this.alert('error', 'invalid username');
    }
  }

  aprichatgruppo(insegnamento){
    this.navCtrl.push(ChatPage,{page:"gruppo",username:this.username,chat:insegnamento})
  }

  aprichat(studente,nome){
    this.navCtrl.push(ChatPage,{page:"unico",username:this.username,chatstudente:studente,mio:this.mio.matricola, nome:nome})
  }

  alert(title:string, message : string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
