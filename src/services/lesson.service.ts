import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';
import {Lesson, LessonMeta} from '../models/lesson.model';

import{AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//import {VersesPage} from '../pages/verses/verses';

@Injectable()
export class LessonService{
   private localDB 	   : any;
   private _remoteDB 	: any;
   private _syncOpts 	: any;
   public datum : any;
   loadingPopup: any;
   baseUrl: String;
   items = [];

   lessonsCol: AngularFirestoreCollection<Lesson>;
   lessonsMetaCol: AngularFirestoreCollection<LessonMeta>;

   lessonsData: AngularFirestoreDocument<Lesson>;

   lessons: any;
   years: any;
   quarters: any;
   dates: any;   

    constructor (public http: Http, public alertCtrl : AlertController, public loadingCtrl: LoadingController,
    public modalCtrl: ModalController, private afs: AngularFirestore){   
        
    } 

    getYears(){
        this.lessonsMetaCol = this.afs.collection('years', ref =>{
            return ref.orderBy('year', 'desc');
        });

        return this.lessonsMetaCol.valueChanges();
    }
       
    GetQuarters(year:number){       
        this.lessonsMetaCol = this.afs.collection('lessonsMeta', ref =>{          
            return ref.where('year', '==', year).orderBy('quarter', 'desc'); 
        });


        return this.lessonsMetaCol.valueChanges();
    }

    GetQuarterDates(year:number, quarter:number){
        this.lessonsCol = this.afs.collection('lessons', ref =>{
            return ref.orderBy('date', 'desc').where('year', '==', year).where('quarter', '==', quarter);
        });

        return this.lessonsCol.snapshotChanges().map(actions => {
            return actions.map(a => {
              const  data = a.payload.doc.data() as Lesson;
              const id = a.payload.doc.id;
              return {id, data};
            });      
    
          });
    }


    GetLesson(id) : any{     
       

        this.lessonsData = this.afs.doc('lessons/' + id);

        return this.lessonsData.valueChanges(); 
        
    }
   
    presentLoading(){
        this.loadingPopup = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        
    }
  
}  