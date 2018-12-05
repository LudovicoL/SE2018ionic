import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StudenteProvider } from '../providers/studente/studente';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { CorsoProvider } from '../providers/corso/corso';
import { DocenteProvider } from '../providers/docente/docente';
import { InsegnamentoProvider } from '../providers/insegnamento/insegnamento';
import { AulaProvider } from '../providers/aula/aula';
import { StrumentoProvider } from '../providers/strumento/strumento';
import { SegnalazioneProvider } from '../providers/segnalazione/segnalazione';
import { NgCalendarModule  } from 'ionic2-calendar';
import { FormsModule } from '@angular/forms';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { LezioneProvider } from '../providers/lezione/lezione';
import {SegreteriadidatticaPageModule} from "../pages/segreteriadidattica/segreteriadidattica.module";
import {HomePageModule} from "../pages/home/home.module";
import {LoginPageModule} from "../pages/login/login.module";
import {AggiungiPageModule} from "../pages/aggiungi/aggiungi.module";
import {ModificaPageModule} from "../pages/modifica/modifica.module";
import {DeletePageModule} from "../pages/delete/delete.module";
import {DocentePageModule} from "../pages/docente/docente.module";
import {StudentePageModule} from "../pages/studente/studente.module";
import {CalendarioPageModule} from "../pages/calendario/calendario.module";
import {EventModalPageModule} from "../pages/event-modal/event-modal.module";
import {CiaoPageModule} from "../pages/ciao/ciao.module";
import {CorsoPageModule} from "../pages/corso/corso.module";
import {UpdatePageModule} from "../pages/update/update.module";
import { EsameProvider } from '../providers/esame/esame';
import {FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import {File} from "@ionic-native/file";
import {FileChooser} from "@ionic-native/file-chooser"
import { Camera } from '@ionic-native/camera';
import {FileUploadModule} from "ng2-file-upload";
import {Transfer} from "@ionic-native/transfer";
import { IonicStorageModule } from '@ionic/storage';
import firebase from 'firebase'
import { HttpModule } from '@angular/http'; //NEW
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import {MaterialePageModule} from "../pages/materiale/materiale.module";
import { MaterialeProvider } from '../providers/materiale/materiale';
import {ChatPageModule} from "../pages/chat/chat.module";
import { GradimentoProvider } from '../providers/gradimento/gradimento';

var config = {
  apiKey: "AIzaSyC1KuYsDGX-yOKlYes7z07VldAdiTVrBZ0",
  authDomain: "se2018ionic.firebaseapp.com",
  databaseURL: "https://se2018ionic.firebaseio.com",
  projectId: "se2018ionic",
  storageBucket: "se2018ionic.appspot.com",
  messagingSenderId: "773025381426"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,


  ],
  imports: [
    FileUploadModule,
    HttpClientModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    IonicStorageModule.forRoot(),
    AngularFireAuthModule,
    FormsModule,
    MyDateRangePickerModule,
    NgCalendarModule,
    HomePageModule,
    SegreteriadidatticaPageModule,
    LoginPageModule,
    AggiungiPageModule,
    ModificaPageModule,
    DeletePageModule,
    DocentePageModule,
    StudentePageModule,
    CalendarioPageModule,
    EventModalPageModule,
    CiaoPageModule,
    CorsoPageModule,
    UpdatePageModule,
    HttpModule,
    RoundProgressModule,
    MaterialePageModule,
    AngularFireDatabaseModule,
    ChatPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StudenteProvider,
    CorsoProvider,
    DocenteProvider,
    InsegnamentoProvider,
    AulaProvider,
    StrumentoProvider,
    SegnalazioneProvider,
    LezioneProvider,
    EsameProvider,
    FileTransferObject,
    FileTransfer,
    File,
    Camera,
    Transfer,
    FileChooser,
    MaterialeProvider,
    GradimentoProvider
  ]
})
export class AppModule {}
