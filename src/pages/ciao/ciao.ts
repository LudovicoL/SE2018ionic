import { Component } from '@angular/core';

@Component({
  selector: 'page-ciao',
  templateUrl: 'ciao.html'
})
export class CiaoPage {
  data:string;
 
  onDaySelect(event: any) {
    console.log(event);
    this.data=(event.year+"-"+event.month+"-"+event.date)
    
  }

  addlezione(inizio:any,fine){
    console.log(this.data)
    this.data=(this.data+" "+inizio)
    console.log(this.data)
  }
}