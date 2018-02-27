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
   quartersMetaCol: AngularFirestoreCollection<LessonMeta>;
   lessons: any;
   years: any;
   quarters: any;
   dates: any;

    constructor (public http: Http, public alertCtrl : AlertController, public loadingCtrl: LoadingController,
    public modalCtrl: ModalController, private afs: AngularFirestore){   
      this.lessonsCol =  this.afs.collection('lessons');
      this.lessonsMetaCol =  this.afs.collection('lessonsMeta');
    } 

    getYears(){
        this.lessonsMetaCol = this.afs.collection('years', ref =>{
            return ref.orderBy('year', 'desc');
        });

        this.years = this.lessonsMetaCol.valueChanges();

        return this.years;
    }
       
    GetQuarters(year:number){       
        // this.quartersMetaCol = this.afs.collection('lessonsMeta', ref =>{
        //      ref.where('year', '==', year); //.orderBy('quarter', 'desc'); //;
        // });

        this.quartersMetaCol = this.afs.collection('lessonsMeta', ref => 
        ref.orderBy('quarter', 'desc') );

        this.quarters = this.quartersMetaCol.valueChanges();

        return this.quarters;
    }

    GetQuarterDates(year:number, quarter:number){
        this.lessonsCol = this.afs.collection('lessons', ref =>{
            return ref.orderBy('date', 'desc').where('year', '==', year).where('quarter', '==', quarter);
        });

        this.dates = this.lessonsCol.valueChanges();

        return this.dates;
    }


    getLessonsFromFirestore(){
       return this.lessonsCol.snapshotChanges()
        .map(actions => {
          return actions.map(a => {
            const  data = a.payload.doc.data() as Lesson;
            const id = a.payload.doc.id;
            return {id, data};
          });      
    
        });    
    }
   
    presentLoading(){
        this.loadingPopup = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        
    }
  
}  