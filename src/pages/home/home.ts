import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LessonService} from '../../services/lesson.service';

import{AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Lesson{
  year: number;
  quarter: number;
  date: string;
  eng: string;
  sw: string;
}

interface LessonId{
  id: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [LessonService]
})
export class HomePage { 
  lessonsCol: AngularFirestoreCollection<Lesson>;
  lessons: any;

  constructor(public navCtrl: NavController, lessonService: LessonService, private afs: AngularFirestore) {
    this.lessonsCol =  this.afs.collection('lessons');
    
    this.lessons = this.lessonsCol.snapshotChanges()
    .map(actions => {
      return actions.map(a => {
        const  data = a.payload.doc.data() as Lesson;
        const id = a.payload.doc.id;
        return {id, data};
      });      

    });

  }

}
