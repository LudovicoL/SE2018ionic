import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';
import { StudenteProvider } from '../providers/studente/studente';
import { LoginPage } from '../pages/login/login';
import { AngularFireModule } from 'angularfire2';
import { CiaoPage } from '../pages/ciao/ciao';
import { SegreteriadidatticaPage } from '../pages/segreteriadidattica/segreteriadidattica';
import { CorsoProvider } from '../providers/corso/corso';
import { CorsoPage } from '../pages/corso/corso';
import { DocenteProvider } from '../providers/docente/docente';
import { InsegnamentoProvider } from '../providers/insegnamento/insegnamento';
import { AulaProvider } from '../providers/aula/aula';
import { StrumentoProvider } from '../providers/strumento/strumento';
import { SegnalazioneProvider } from '../providers/segnalazione/segnalazione';
import { NgCalendarModule  } from 'ionic2-calendar';
import { CalendarModule } from 'ionic3-calendar-en';
import { FormsModule } from '@angular/forms';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { CalendarioPage } from '../pages/calendario/calendario';
import { LezioneProvider } from '../providers/lezione/lezione';


var config = {
  apiKey: "AIzaSyC1KuYsDGX-yOKlYes7z07VldAdiTVrBZ0",
  authDomain: "se2018ionic.firebaseapp.com",
  databaseURL: "https://se2018ionic.firebaseio.com",
  projectId: "se2018ionic",
  storageBucket: "",
  messagingSenderId: "773025381426"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CiaoPage,
    LoginPage,
    SegreteriadidatticaPage,
    CorsoPage,
    CalendarioPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    NgCalendarModule,
    CalendarModule,
    FormsModule,
    MyDateRangePickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CiaoPage,
    SegreteriadidatticaPage,
    CorsoPage,
    CalendarioPage
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
    LezioneProvider
  ]
})
export class AppModule {}
