import { Component } from '@angular/core';
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
import { CalendarioPage } from '../calendario/calendario';
import {GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker, Environment, LatLng} from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-aggiungi',
  templateUrl: 'aggiungi.html',
})


export class AggiungiPage {

  grandezza: String;
  nome: String;
  marker: Marker;

  Button:boolean=false;
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
  map: GoogleMap;

  studente:  Studente;
  docente: Docente;
  docenti:Docente[];

  aula:Aula;
  corso: Corso;
  corsi:Corso[];
  aule:Aula[];
  strumento:Strumento;
  insegnamenti:Insegnamento[];
  Mappa: boolean=false;
  
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
        this.Mappa=true;
        this.Button=true;
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
    this.loadMap();
  }

  saveNome(nome){
    this.nome = nome.value;
  }
  saveGrandezza(grandezza){
    this.grandezza=grandezza.value;
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
      this.navCtrl.push('SegreteriadidatticaPage');
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
      this.navCtrl.push('SegreteriadidatticaPage');

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
      this.navCtrl.push('SegreteriadidatticaPage');
    });
  }

  addAula(nome,grandezza,lat,lng) {
    try {
      lat = this.marker.getPosition().lat;
    }
    catch (e) {
    }
    try {
      lng = this.marker.getPosition().lng;
    }
    catch (e) {
    }
    console.log(lat, lng);
    nome = this.nome;
    grandezza = this.grandezza
    if (nome==null || grandezza==null || lat==null || lng==null) {
      this.showAlert('inserisci tutti i campi');
    }
    else {
      this.aulaProvider.saveAula({nome, grandezza, lat, lng} as Aula).subscribe(aula => {
        this.showAlert('Aula aggiunta con successo');
        this.navCtrl.push('SegreteriadidatticaPage');
      })
    }
  }

  addStrumento(nome,aula,funzionante,idAula){
    for(var i=0; i<this.aule.length; i++){
      funzionante=1;
      if(aula==this.aule[i].nome)
        idAula=this.aule[i].idAula;
        console.log(idAula);
        this.strumentoProvider.saveStrumento({nome,idAula,funzionante} as Strumento).subscribe(strumento => {
          this.showAlert('Strumento aggiunta con successo');
          this.navCtrl.push('SegreteriadidatticaPage');
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

  loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 40.181930,
          lng: 18.335404
        },
        zoom: 18,
        tilt: 30,
      }
    };
    this.map = GoogleMaps.create('map_canvas', mapOptions);
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
      (data) => {
        this.map.clear();
        this.marker = this.map.addMarkerSync({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: data[0].lat,
            lng: data[0].lng
          }
        });
        this.marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          alert('clicked');
        });
      }
    );
  }
}
