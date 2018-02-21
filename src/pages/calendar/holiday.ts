import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import {CalendarService} from '../../services/calendar.service';
import {HolidayDescPage} from '../calendar/holidaydesc';


@Component({

  selector: 'page-calendar',
  templateUrl: 'holiday.html',
  providers:[CalendarService]
})

export class HolidayPage{  

    pesachStartGreg;
    passoverGreg;
    pesachEndGreg;
    shavuotGreg;
    roshHashanahGreg;
    yomKippurGreg;
    sukkotStartGreg;
    sukkotEndGreg;
    purimGreg;

    pesachStart;
    passover;
    pesachEnd;
    shavuot;
    roshHashanah;
    yomKippur;
    sukkotStart;
    sukkotEnd;
    purim;

    selectedYear = new Date().getFullYear();
    d = new Date();

    HebYear: number;

    constructor(public navCtrl: NavController, private calendarService: CalendarService, public loadingCtrl: LoadingController) {    
      
      this.HebYear = this.calendarService.G2HY(this.selectedYear, 1, 1);
      
      this.pesachStart = this.calendarService.H2G(this.HebYear, 8, 14).split('>')[0];
      this.passover = this.calendarService.H2G(this.HebYear, 8, 15).split('>')[0];
      this.pesachEnd = this.calendarService.H2G(this.HebYear, 8, 21).split('>')[0];
      this.shavuot = this.calendarService.H2G(this.HebYear, 10, 6).split('>')[0];
      this.roshHashanah = this.calendarService.H2G(this.HebYear + 1, 1, 1).split('>')[0];
      this.yomKippur = this.calendarService.H2G(this.HebYear + 1, 1, 10).split('>')[0];
      this.sukkotStart = this.calendarService.H2G(this.HebYear + 1, 1, 15).split('>')[0];
      this.sukkotEnd = this.calendarService.H2G(this.HebYear + 1, 1, 22).split('>')[0];
      this.purim = this.calendarService.H2G(this.HebYear, 6, 14).split('>')[0];

      this.pesachStartGreg = this.calendarService.H2G(this.HebYear, 8, 14).split('>')[1];
      this.passoverGreg = this.calendarService.H2G(this.HebYear, 8, 15).split('>')[1];
      this.pesachEndGreg = this.calendarService.H2G(this.HebYear, 8, 21).split('>')[1];
      this.shavuotGreg = this.calendarService.H2G(this.HebYear, 10, 6).split('>')[1];
      this.roshHashanahGreg = this.calendarService.H2G(this.HebYear + 1, 1, 1).split('>')[1];
      this.yomKippurGreg = this.calendarService.H2G(this.HebYear + 1, 1, 10).split('>')[1];
      this.sukkotStartGreg = this.calendarService.H2G(this.HebYear + 1, 1, 15).split('>')[1];
      this.sukkotEndGreg = this.calendarService.H2G(this.HebYear + 1, 1, 22).split('>')[1];
      this.purimGreg = this.calendarService.H2G(this.HebYear, 6, 14).split('>')[1];
    }

  getHolidaysByYear(year){
     
      this.selectedYear += year;
      this.HebYear = this.calendarService.G2HY(this.selectedYear, 1, 1);     

      this.pesachStart = this.calendarService.H2G(this.HebYear, 8, 14).split('>')[0];
      this.passover = this.calendarService.H2G(this.HebYear, 8, 15).split('>')[0];
      this.pesachEnd = this.calendarService.H2G(this.HebYear, 8, 21).split('>')[0];
      this.shavuot = this.calendarService.H2G(this.HebYear, 10, 6).split('>')[0];
      this.roshHashanah = this.calendarService.H2G(this.HebYear + 1, 1, 1).split('>')[0];
      this.yomKippur = this.calendarService.H2G(this.HebYear + 1, 1, 10).split('>')[0];
      this.sukkotStart = this.calendarService.H2G(this.HebYear + 1, 1, 15).split('>')[0];
      this.sukkotEnd = this.calendarService.H2G(this.HebYear + 1, 1, 22).split('>')[0];
      this.purim = this.calendarService.H2G(this.HebYear, 6, 14).split('>')[0];

      this.pesachStartGreg = this.calendarService.H2G(this.HebYear, 8, 14).split('>')[1];
      this.passoverGreg = this.calendarService.H2G(this.HebYear, 8, 15).split('>')[1];
      this.pesachEndGreg = this.calendarService.H2G(this.HebYear, 8, 21).split('>')[1];
      this.shavuotGreg = this.calendarService.H2G(this.HebYear, 10, 6).split('>')[1];
      this.roshHashanahGreg = this.calendarService.H2G(this.HebYear + 1, 1, 1).split('>')[1];
      this.yomKippurGreg = this.calendarService.H2G(this.HebYear + 1, 1, 10).split('>')[1];
      this.sukkotStartGreg = this.calendarService.H2G(this.HebYear + 1, 1, 15).split('>')[1];
      this.sukkotEndGreg = this.calendarService.H2G(this.HebYear + 1, 1, 22).split('>')[1];
      this.purimGreg = this.calendarService.H2G(this.HebYear, 6, 14).split('>')[1];

    
  }

  GetHolidayDesc(holidayType){
    this.navCtrl.push(HolidayDescPage, {id: holidayType});
  }


    
}