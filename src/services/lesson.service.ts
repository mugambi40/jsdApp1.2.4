import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';
//import {VersesPage} from '../pages/verses/verses';

@Injectable()
export class LessonService{
   private localDB 	   : any;
   private success : boolean = true;
   private _remoteDB 	: any;
   private _syncOpts 	: any;
   public datum : any;
   loadingPopup: any;
   baseUrl: String;
   items = [];
    constructor (public http: Http, public alertCtrl : AlertController, public loadingCtrl: LoadingController,
    public modalCtrl: ModalController){      
      this.initialiseDB();
    }

    initialiseDB()
   {
      this.localDB 			     = new PouchDB('jsd');
      //this._remoteDB 		 = 'http://localhost:5984/jsd';
      this._remoteDB 		 = 'http://199.231.187.90:5984/jsd';
      this._syncOpts 		 = { live 	         : false,
                                 retry 	         : true };
      ///Syncing is bidirection. this.localDB.sync(this._remoteDB, this._syncOpts)     
      ///However, here we need just a unidirection syncing                            
      this.localDB.replicate.from(this._remoteDB, this._syncOpts)
      .on('change', (info) =>
      {
         console.log('Handling syncing change');
         //console.log(info);
         //alert("Lessons syncing is on progress!");
      })
      .on('paused', (info) =>
      {
         console.log('Handling syncing pause');
         //console.log(info);
      })
      .on('active', (info) =>
      {
         console.log('Handling syncing resumption');
         //console.log(info);
      })
      .on('denied', (err) =>
      {
         console.log('Handling syncing denied');
         //console.log(err);
      })
      .on('complete', (info) =>
      {
         console.log('Handling syncing complete');
         //this.initialiseDB();
         //console.dir(info);
         //alert("Lessons synchronised successfully!");
      })
      .on('error', (err)=>
      {
         console.log('Handling syncing error');
         //console.dir(err);
      });
   }


   handleSyncing()
   { 
      this.localDB.changes({
         since 		     : 'now',
         live 		     : true,
         include_docs 	 : true
      })
      .on('change', (change) =>
      {
         // handle change
         console.log('Handling change');
         console.dir(change);
      })
      .on('complete', (info) =>
      {
         // changes() was canceled
         console.log('Changes complete');
         console.dir(info);
         alert("Lessons synchronised successfully!");
      })
      .on('error',  (err) =>
      {
         console.log('Changes error');
         console.log(err);
      });
   }


 getYears()
   {
      return new Promise(resolve =>
      {
         this.localDB.allDocs({include_docs: true, descending: true}, function(err, doc)
         {
            //console.log(doc);
            let k,
                items 	= [],
                row 	= doc.rows;   

         //console.log(row);

          for(k in row)
            {
              
               items.push(
               {
                id 		     : row[k].doc._id,
                rev		     : row[k].doc._rev,
                year	     : row[k].doc.year
               });              
            }
      
            
            var flags = [], output = [], l = items.length, i;
            for( i=0; i<l; i++) {
                if(flags[items[i].year]) 
                continue;
                flags[items[i].year] = true;
                output.push(items[i]);
            }

            output.sort(function(a, b){return b.year-a.year});         
            resolve(output);
         });
      });
   }

   GetQuarters(year)
   {
      return new Promise(resolve =>
      {
         this.localDB.allDocs({include_docs: true, descending: true}, function(err, doc)
         {
           
            let k,
                items 	= [],
                row 	= doc.rows;   

         
          for(k in row)
            {
              if(row[k].doc.year == year){
                items.push(
                {
                    id 		     : row[k].doc._id,
                    rev		     : row[k].doc._rev,
                    year	     : row[k].doc.year,
                    quarter	     : row[k].doc.quarter

                }); 
              }
                            
            }
            var flags = [], output = [], l = items.length, i;
            for( i=0; i<l; i++) {
                if(flags[items[i].quarter]) 
                continue;
                flags[items[i].quarter] = true;
                output.push(items[i]);
            }
            output.sort(function(a, b){return b.quarter-a.quarter});
            resolve(output);
         })
      });
   }

 GetQuarterDates(year:number, quarter:number)
   {
      return new Promise(resolve =>
      {
         this.localDB.allDocs({include_docs: true, descending: true}, function(err, doc)
         {
           
            let k,
                items 	= [],
                row 	= doc.rows;   

         
          for(k in row)
            {
              if(row[k].doc.year == year && row[k].doc.quarter == quarter){
                items.push(
                {
                    id 		     : row[k].doc._id,
                    rev		     : row[k].doc._rev,
                    year	     : row[k].doc.year,
                    quarter	     : row[k].doc.quarter,
                    date         : row[k].doc.date

                }); 
              }
                            
            }
          
            items.sort(function(a, b)
            {
                a = new Date(a.date);
                b = new Date(b.date);
                return a>b ? -1 : a<b ? 1 : 0;
            });
            resolve(items);
         })
      });
   }

GetLesson(id, lang)
   {
       //console.log("The language selected is: " + lang);
      return new Promise(resolve =>
      {
         this.localDB.get(id)
         .then((doc)=>
         {
            let items = {text: "", lessonUrl: ""};
            let text = "";
            if(lang == "eng" ){
                text = doc.text;
            }
            else if (lang == "sw"){
                text = doc.textSw; 
            }
            else {
                text = doc.text;
            }
           
            let lessonUrl = doc.lessonUrl;  

            if(text == undefined || text =="")  {
                items.text =  "<p>Swahili Lesson are not available at this moment. Please check again later. Thanks</p>";
            }
            else{
                items.text = text;
            }            
            items.lessonUrl = lessonUrl;
            resolve(items);
         })
      });
   }
/*GetVerses(book, chap, verses = []){
    console.log("/////////");
    console.log(book);
     console.log(chap);
      console.log(verses);

     this.presentLoading();
     this.http.get('assets/js/en_kjv.json').map(res => res.json()).subscribe(data => {    
       
        let text = "";
        text =  "<strong>" + data[book].book + " " + (chap + 1) + "</strong><br /><br />";
       
        let verseLength = verses.length;
        
        if(verseLength == 0){
            //Whole chapter        
          
            let chapterVerses = data[book].chapters[chap][chap + 1];
            
            Object.keys(chapterVerses).forEach(function(key) {
               
                text += "<strong>" + key + "&nbsp;</strong>" + chapterVerses[key] + "<br />";
            });
           
        }
        else if(verseLength == 3 && verses[1] == 0){
            ///If verses are in range 1 - 14            
            for(let i=verses[0]; i<verses[2] + 1; i++){               
                text += "<strong>" + i + "&nbsp;</strong>" + data[book].chapters[chap][chap + 1][i] + "<br />";
            }
        }
        else{
             for(let i=0; i<verseLength; i++){
                //Single verse or verses
                console.log( );
                text += "<strong>" + verses[i] + "&nbsp;</strong>" + data[book].chapters[chap][chap + 1][verses[i]] + "<br />";
              }
        }   

         this.loadingPopup.dismiss();
         let modal = this.modalCtrl.create(VersesPage, { verses: text });
         modal.present();
         //return data;
      });
}*/

 presentLoading(){
    this.loadingPopup = this.loadingCtrl.create({
      content: 'Please wait...'
    });
 }
  
}  