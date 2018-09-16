import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StrumentoProvider } from '../../providers/strumento/strumento';
import { Aula } from '../../app/models/Aula';
import { AulaProvider } from '../../providers/aula/aula';
import { CorsoProvider } from '../../providers/corso/corso';
import { Corso } from '../../app/models/Corso';
import { Strumento } from '../../app/models/Strumento';

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
  course:string;
  aule:Aula[];
  items:any[];
  scelta1:boolean=false;
  scelta2:boolean=false;
  ciao:boolean=true;
  ModificaCorso: boolean=false;
  ModificaInsegnamento: boolean=false;
  ModificaAula: boolean=false;
  ModificaStrumento: boolean=false;
  ModificaStudente: boolean=false;
  ModificaDocente: boolean=false;
  attivo:boolean=false;
  i:number;

  constructor(private corsoProvider:CorsoProvider,private aulaProvider:AulaProvider,public navCtrl: NavController,private strumentoProvider: StrumentoProvider, public navParams: NavParams) {

    this.parameter = navParams.get('paramNome');
    this.param1 = navParams.get('param1'); 
    this.param2 = navParams.get('param2'); 
    this.param3 = navParams.get('param3'); 
    this.param4= navParams.get('param4'); 
    this.param5= navParams.get('param5'); 
    this.param6= navParams.get('param6'); 

    this.course = navParams.data
    switch (this.parameter) {
      case "ModificaCorso":
        this.ModificaCorso= true;
        console.log(this.parameter)
        break;
      case "ModificaInsegnamento":
        this.ModificaInsegnamento= true;
        console.log(this.parameter)
        break;
      case "ModificaAula":
        this.ModificaAula= true;
        console.log(this.parameter)
        break;
      case "ModificaStrumento":
        this.ModificaStrumento= true;
        this.listaAule();
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




  listaAule(){
    this.aulaProvider.getAula().subscribe(aule => {
      this.aule = aule;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePage');
  }

  aggiornaCorso(nome,facolta,durata,livello,idCorso){
    console.log(idCorso);
    this.corsoProvider.update({nome,facolta,durata,livello,idCorso} as Corso).subscribe(corso => {
    });
  }

  aggiornaStrumento(nome,aula,abilitazione,idStrumento,idAula,agibile){
    idStrumento=this.param3;
    agibile=1;
    for(var i=0; i<this.aule.length; i++){
      if(aula==this.aule[i].nome)
        idAula=this.aule[i].idAula;
    }
    this.strumentoProvider.update({nome,idAula,abilitazione,idStrumento,agibile} as Strumento).subscribe(strumento => {
    });
  }
  
}
