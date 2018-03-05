import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import{AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import 'rxjs/add/operator/map';

@Injectable()
export class SettingsService{

    constructor(private afs: AngularFirestore){     
          
          let lang = localStorage.getItem('language');

          if(lang == undefined || lang == null || lang ==""){
               localStorage.setItem('language', 'eng');
            }          
        
    }

    SaveLanguage(lang){    
     localStorage.setItem('language', lang);
    }
  
    GetLanguage(){
       return new Promise(resolve =>
      { 
         let item: string;
        
         item = localStorage.getItem('language');
         resolve(item);
      });
    }

    PopulateDdl(){
       return this.afs.collection('languages').
              valueChanges();
      
    }
}