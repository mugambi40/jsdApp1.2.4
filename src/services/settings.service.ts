import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
//import { Storage } from '@ionic/storage';

@Injectable()
export class SettingsService{
//storage: Storage;

    constructor(){
       //this.storage = storage;
        /*this.storage.get('language').then((val) => {             
            if(val == undefined || val == null){
              this.storage.set('language', "eng");
            }                  
          });*/
          
          let lang = localStorage.getItem('language');

          if(lang == undefined || lang == null || lang ==""){
               localStorage.setItem('language', 'eng');
            }          
        
    }

    SaveLanguage(lang){
       /*this.storage.ready().then(() => {       
       this.storage.set('language', lang);   
       this.storage.get('language').then((val) => {

       })
     });*/
     localStorage.setItem('language', lang);
    }
  
    GetLanguage(){
       return new Promise(resolve =>
      { 
         let item: string;
         /*this.storage.ready().then(() => {       
         this.storage.get('language').then((val) => {             
            item = val;
            resolve(item);                   
          })
        });*/
         item = localStorage.getItem('language');
         resolve(item);
      });
      
    }
}