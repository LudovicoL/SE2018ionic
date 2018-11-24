import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from "rxjs";


@IonicPage()
@Component({
  selector: 'page-corso',
  templateUrl: 'corso.html',
})

export class CorsoPage {


  stringa1:string="dilaz";
  stringa2:string="dilan";


  username:string='';
  message:string='';
  s;
  messages:object[]=[];
  _chatSubscription;

  constructor(public db:AngularFireDatabase,public navCtrl:NavController,public navParams:NavParams) {
    this.username=this.navParams.get('username');
    console.log(this.stringa1)
    console.log(this.stringa2)

    if(this.stringa1>this.stringa2){
      console.log(this.stringa1+this.stringa2)
    }
    else{
      console.log(this.stringa2+this.stringa1)
    }

  }


}
