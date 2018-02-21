import { Component } from '@angular/core';
import { NavController, NavParams  } from 'ionic-angular';


@Component({
  selector: 'page-holidaydesc',
  templateUrl: 'holidaydesc.html'
})
export class HolidayDescPage {
id: any;
title: string;
 constructor(
    public navCtrl: NavController, public params: NavParams
    ) 
    {  
     
    this.id = params.get("id");

    if(this.id == 1){
        this.title = "Passover Start";
    }
    else if(this.id == 2){
        this.title = "Feast Of Unleavened Bread";
    }
    else if(this.id == 3){
        this.title = "Passover End";
    }

     else if(this.id == 4){
        this.title = "Pentecost";
    }

     else if(this.id == 5){
        this.title = "Feast Of Trumpet";
    }
     else if(this.id == 6){
        this.title = "Atonement";
    }
     else if(this.id == 7){
        this.title = "Tabernacle start";
    }
     else if(this.id == 8){
        this.title = "Tabernacle end";
    }
     else if(this.id == 9){
        this.title = "Purim";
    }
}

}