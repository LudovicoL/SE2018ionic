import {Component, EventEmitter} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from "rxjs";
import enumerate = Reflect.enumerate;


@IonicPage()
@Component({
  selector: 'page-corso',
  templateUrl: 'corso.html',
})

export class CorsoPage {
  rating: number;
  ratingChange: EventEmitter<number> = new EventEmitter();

  prova: boolean = false;

  constructor(public alertCtrl: AlertController, public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {


  }

  rate(index: number) {
    console.log(index)
    console.log("ciao")
    this.rating = index
    this.ratingChange.emit(this.rating)
  }

  isAboveRating(index: number): boolean {
    return index > this.rating
  }

  getColor(index: number) {


    var GREY = "#E0E0E0"
    var GREEN = "#76FF03"
    var YELLOW = "#FFCA28"
    var RED = "#DD2C00"


    if (this.isAboveRating(index)) {
      return GREY;
    }
    switch (this.rating) {
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

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'vota',
      subTitle:
      '<ion-label>ciao</ion-label>'+
          '<button ion-button icon-only *ngFor="let num of [1,2,3,4,5]" (click)="rate(num)"><ion-icon name="star"></ion-icon></button>',
      buttons:[{
        text:'ok',
        cssClass: 'alertDanger'
      }]

    });
    alert.present()
  }


}
