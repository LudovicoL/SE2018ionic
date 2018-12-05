import {Component, EventEmitter} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import * as moment from 'moment';
import {AulaProvider} from "../../providers/aula/aula";
import {Aula} from "../../app/models/Aula";
import {SegnalazioneProvider} from "../../providers/segnalazione/segnalazione";
import {Segnalazione} from "../../app/models/Segnalazione";
import {GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, Marker} from "@ionic-native/google-maps";
import {HomePage} from "../home/home";
import {MaterialePage} from "../materiale/materiale";
import {GradimentoProvider} from "../../providers/gradimento/gradimento";
import {Gradimento} from "../../app/models/Gradimento";
 
@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
  Segnalazione:boolean=false;
  Mappa:boolean=false;
  Info:boolean=false;
  Info2:boolean=false;
  Voto:boolean=false;
  Voto2:boolean=false

  map: GoogleMap;
  marker: Marker;


  rating:number;
  ratingChange: EventEmitter<number>=new EventEmitter();
  isenabled:boolean=true;

  aula:any;
  descrizione:any;
  aule:Aula[];
  segnalazioni:Segnalazione[];
  param: any;
  param2: any;
  param3: any;
  param4: any;
  param5: any;
  param1: any;
  param6: any;
  param8: any;
  param7: any;
  param9: any;
  private param10: any;
  private param11: any;
  private param12: any;
  private infoaula: any;
  private param13: any;
  private param14: any;

  constructor(private gradimentoProvider:GradimentoProvider,public alertCtrl : AlertController,private aulaProvider: AulaProvider,private segnalazioneProvider: SegnalazioneProvider, public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController) {
    this.param = navParams.get('param');
    this.param1 = navParams.get('id');
    this.param2 = navParams.get('nomeaula');
    this.param3 = navParams.get('docente');
    this.param4 = navParams.get('lat');
    this.param5 = navParams.get('lng');
    this.param6 = navParams.get('tipo');
    this.param7 = navParams.get('insegnamento');
    this.param8 = navParams.get('data');
    this.param9 = navParams.get('datastart');
    this.param10 = navParams.get('dataend');
    this.param11 = navParams.get('nomeaula');
    this.param12 = navParams.get('idaula');
    this.param13 = navParams.get('materiale');
    this.param14 = navParams.get('idstudente');


    console.log(this.param.nome)
    switch (this.param) {
      case "Segnalazione":
        this.Segnalazione=true;
          aulaProvider.getAula().subscribe(aule => {
            this.aule=aule;
         });
          break;
      case "Info":
        this.Info=true;
        this.Mappa=true;
        this.loadMap();
        console.log(this.param2);
      case "Info2":
        this.Info2=true;
        this.Mappa=true;
        this.aulaProvider.getAulaById(this.param12).subscribe(aula=>{
          this.param4=aula.lat;
          this.param5=aula.lng;
          this.param2=aula.nome;
          this.loadMap();
        })

      case "Voto":
        this.Voto=true;
        gradimentoProvider.getgiavotato(this.param13.idMateriale,this.param14).subscribe(num=>{
          if(num == null){
          }
          else {
            this.rate(num,2);
            this.isenabled=false
            this.Voto2=true
          }
        })
  }

  }
 
  cancel() {
    this.segnalazioneProvider.getSegnalazioni().subscribe(segnalazioni => {
      this.segnalazioni= segnalazioni;
      this.viewCtrl.dismiss(this.segnalazioni);
    });
  }
 
  save(idAula,descrizione,idDocente) {
    console.log(this.aula,this.descrizione)
    idAula=this.aula;
    descrizione=this.descrizione;
    idDocente=2;
    this.segnalazioneProvider.save({idAula,descrizione,idDocente} as Segnalazione).subscribe(segnalazione => {
    this.showAlert('Segnalazione!','Segnalazione inviata con successo');
      this.segnalazioneProvider.getSegnalazioni().subscribe(segnalazioni => {
        this.segnalazioni= segnalazioni;
        this.viewCtrl.dismiss(this.segnalazioni);
      });
    });

  }
  showAlert(title:string,message : string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.param4,
          lng: this.param5
        },
        zoom: 18,
        tilt: 30,
      }
    };
    this.map = GoogleMaps.create('map_canvas', mapOptions);
    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(
      (data) => {
        this.map.clear();
        this.marker = this.map.addMarkerSync({
          title: this.param2,
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: this.param4,
            lng: this.param5
          }
        });
        this.marker.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        });
      }
    );
  }




  rate(index:number,option:number){
    this.rating=index
    this.ratingChange.emit(this.rating)
    if(option==1) {
      this.presentConfirm(index)
    }
  }
  isAboveRating(index:number):boolean{
    return index > this.rating
  }
  getColor(index:number){


    var GREY = "#E0E0E0"
    var GREEN = "#76FF03"
    var YELLOW = "#FFCA28"
    var RED = "#DD2C00"


    if(this.isAboveRating(index)){
      return GREY;
    }
    switch(this.rating){
      case 1:
      case 2:
        return RED
      case 3:
        return YELLOW
      case 4:
      case 5:
        return GREEN
      default:
      //return GREY
    }
  }

  presentConfirm(num) {
    var voto,idStudente,idMateriale
    let alert = this.alertCtrl.create({
      title: 'Feedback',
      message: 'Vuoi confermare?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {
            console.log(num);
            console.log(this.param13.idMateriale,this.param14)
            voto=num
            idStudente=this.param14
            idMateriale=this.param13.idMateriale
            this.gradimentoProvider.saveGradimento({voto,idStudente,idMateriale} as Gradimento).subscribe(gradimento=>{
              this.showAlert("Feedback", "Feedback rilasciato correttamente")
              this.viewCtrl.dismiss();
            })
          }
        }
      ]
    });
    alert.present();
  }
}
