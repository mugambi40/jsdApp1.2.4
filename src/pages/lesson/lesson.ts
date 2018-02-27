import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import {LessonService} from '../../services/lesson.service';
import {SettingsService} from '../../services/settings.service';
import {SocialSharing} from '@ionic-native/social-sharing';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { LessonMeta } from '../../models/lesson.model';
import { Observable } from '@firebase/util';
 
//@IonicPage()
@Component({
  selector: 'page-lesson',
  templateUrl: 'lesson.html',
  providers: [LessonService]
})
export class LessonPage {
loadingYearPopup: any;
loadingQuarterPopup: any;
loadingDatePopup: any;
loadingLessonPopup: any;
loadingPopup: any;
years: any;
quarters: any;
dates: any;
year: string;
text: any;
id: number;
quarter: string;
date: any;
takeScreenshot: any;
public hasLessons 		: boolean = false;
public lessons  			: any;
public language       : any;
imageUrl: any;
lessonUrl: string;
currentPos: number;
ForwardShow: boolean = true;
BackwardShow: boolean = true;

results: any;
yearsCol: Observable<LessonMeta[]>;

  constructor(
    public navCtrl: NavController, 
    private lessonService: LessonService, 
    public loadingCtrl: LoadingController,
    private settingsService: SettingsService,
    private sharingvar: SocialSharing
    ) 
    {  
      this.lessonUrl = "http://jsd-cog.org";
      this.imageUrl = "assets/images/Menorah.jpg";
      this.GetLanguage();
      this.GetYears();   
    }

GetYears(){ 
    // this.hasLessons = true; 
    this.yearsCol = this.lessonService.getYears();      

}

GetAllLessons(){
    this.results = this.lessonService.getLessonsFromFirestore()
 }


GetQuarters(event){    
     if(event == undefined){
         return false;
     }

    this.quarters = this.lessonService.GetQuarters(event);
    
    console.log(this.quarters);
}

GetQuarterDates (event){ 
     if(event == undefined){
         return false;
     }
    
    this.dates = this.lessonService.GetQuarterDates(event.split(',')[0], event.split(',')[1]);
    
    console.log(this.dates);
    
}

GetLesson(id){ 
     if(id == undefined){
         return false;
     }

     //Set Position
    this.currentPos = this.dates.map(function(e) { return e.id; }).indexOf(id);
    let datesLength = this.dates.length;  
    if(this.currentPos == datesLength - 1){
        this.BackwardShow = false;
        //this.ForwardShow = false;
    }
    else if(this.currentPos < datesLength - 1){
        this.BackwardShow = true;
    }

    if(this.currentPos == 0){
        //this.BackwardShow = false;
        this.ForwardShow = false;
    }
    else if(this.currentPos > 0){
        this.ForwardShow = true;
    }

    // this.presentLoading();
    //  this.lessonService.GetLesson(id, this.language).then((data)=>
    //   {
    //     //console.log(data);
    //      let existingData = Object.keys(data).length;
    //       if(existingData !== 0)
    //         {                             
    //             this.text = data["text"];               
    //             this.lessonUrl =  data["lessonUrl"];
                
    //             if(data["lessonUrl"] == undefined){
    //                 this.lessonUrl =  "http://jsd-cog.org";
    //             }
    //             //this.navCtrl.push(LessonPartialPage, {data: data});

    //             this.loadingPopup.dismiss();
    //         }
    //       else
    //       {
    //           this.loadingPopup.dismiss();
    //           console.log("we get nada!");
    //       }
    //   });
}

/*GetVerses(book, chap, verses = []){
     let data = this.lessonService.GetVerses(book, chap, verses);   
}*/

ShowLesson(d){ 

    let datesLength = this.dates.length;  
    this.currentPos += d;  

       console.log(this.currentPos);
       //console.log(this.dates[this.currentPos]);
       this.GetLesson(this.dates[this.currentPos].id);
}

showDatePicker(){
    //Show lesson on a specific date
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

  handleSyncing(){
     //this.presentLoading();
    //  this.lessonService.initialiseDB();
      //this.hasLessons 	= true;
      this.years 	= null;
      this.GetYears();
0
     /*setInterval(function()
     { 
        console.log("Synced");
        this.loadingPopup.dismiss();
     }, 3000);*/

     
  }

 presentLoading(){
    this.loadingPopup = this.loadingCtrl.create({
      content: 'Please wait...'
    });
 }

 whatsappShare(){
     console.log(this.lessonUrl);
     this.sharingvar.shareViaWhatsApp("Check bible lesson here: " , null, this.lessonUrl)
     .then(()=>{
         //alert("Success");
     },
     ()=>{
         alert("Failed");
     });
 }
 
  twitterShare(){
     this.sharingvar.shareViaTwitter("Check bible lesson here: ", null, this.lessonUrl)
     .then(()=>{
         //alert("Success");
     },
     ()=>{
         alert("Failed");
     });
 }

  facebookShare(){
     this.sharingvar.shareViaFacebook("Check bible lesson here: ", null, this.lessonUrl)
     .then(()=>{
         //alert("Success");
     },
     ()=>{
         console.log(this.text.replace(/<(?:.|\n)*?>/gm, ''));
         alert("Failed");
     });
 }

  otherShare(){
     this.sharingvar.share("Check bible lesson here: ", null, this.lessonUrl)
     .then(()=>{
         //alert("Success");
     },
     ()=>{
         alert("Failed");
     });
 }

 // Take a screenshot and save to file
 saveScreenshot(){
    this.takeScreenshot.save('jpg', 80, 'myscreenshot.jpg').then(this.onSuccess, this.onError);
    // Take a screenshot and get temporary file URI
    this.imageUrl = this.takeScreenshot.URI(80).then(this.onSuccess, this.onError);
 }

onSuccess(){

}
onError(){

}

saveScreenshot1(){
    this.takeScreenshot.save()
    .then(res => { 
        console.log(res.filePath);
    })
    .catch(() => console.error("screenshot error"));
}

}
