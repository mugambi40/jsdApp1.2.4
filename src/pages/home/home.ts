import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LessonService} from '../../services/lesson.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [LessonService]
})
export class HomePage {  

  constructor(public navCtrl: NavController, lessonService: LessonService) {
    

  }

}
