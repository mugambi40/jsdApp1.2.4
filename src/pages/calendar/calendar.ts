import { Component } from '@angular/core';
import {DatePicker} from '@ionic-native/date-picker';
import { NavController, LoadingController,AlertController  } from 'ionic-angular';
import {CalendarService} from '../../services/calendar.service';
import {HolidayPage} from '../calendar/holiday';


@Component({

  selector: 'page-calendar',
  templateUrl: 'calendar.html',
  providers:[CalendarService,DatePicker]
})
export class CalendarPage {

  years = new Date();
  hebDate;
  d = new Date();

  constructor(public navCtrl: NavController, private calendarService: CalendarService, public loadingCtrl: LoadingController, public alertCtrl: AlertController, private datePicker: DatePicker) {
 
    this.hebDate = this.calendarService.G2H(this.d.getFullYear(), this.d.getMonth() + 1,  this.d.getDate());
   
  }    

    convertToHebDateWeekly(day){
          
          this.d.setDate(this.d.getDate() + day);

          this.hebDate = this.calendarService.G2H(this.d.getFullYear(), this.d.getMonth() + 1,  this.d.getDate());

    }

    convertToHebDate(day){      

         this.d.setDate(this.d.getDate() + day);

         this.hebDate = this.calendarService.G2H(this.d.getFullYear(), this.d.getMonth() + 1,  this.d.getDate());
        
   
    }

    ShowHolidays(){
        this.navCtrl.push(HolidayPage);
    }

    showDatePicker(){
     this.datePicker.show({
        date: new Date(),
        mode: 'date'
        }).then(
        date => {             
                
                this.d = date;
                      
                this.hebDate = this.calendarService.G2H(this.d.getFullYear(), this.d.getMonth()+1,  this.d.getDate());
                
            },
        err => console.log('Error occurred while getting date: ', err)
     );
      
    }

    showAlert(Date) {
    let alert = this.alertCtrl.create({
      title: 'Date Selected!',
      subTitle: Date,
      buttons: ['OK']
    });
    alert.present();
  }
}