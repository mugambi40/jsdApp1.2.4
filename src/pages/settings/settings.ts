import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AboutPage} from '../about/about';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [SettingsService]
})
export class SettingsPage {
language: any;
languages: any = [{"Name": "English", "Code":"eng"}, {"Name": "Kiswahili", "Code":"sw"}];;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private settingsService: SettingsService) {
   
    this.GetLanguage(); 
    
  }

 saveLanguage()
 {
   this.settingsService.SaveLanguage(this.language);
  }

  GetLanguage(){
    this.settingsService.GetLanguage().then((data)=>
      {       
         let existingData = Object.keys(data).length;        
          if(existingData !== 0)
            {                
                this.language 	= data;
                
            }
          else
          {
               this.language = "eng";
          }
      });
  }

  tabSelected(event){
    this.navCtrl.push(AboutPage);
  }

}
 