import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LessonPage } from '../pages/lesson/lesson';
import { AboutPage } from '../pages/about/about';
import { CalendarPage } from '../pages/calendar/calendar';
import { HolidayPage } from '../pages/calendar/holiday';
import { SettingsPage } from '../pages/settings/settings';
import { FaqPage } from '../pages/faq/faq';
import { HolidayDescPage } from '../pages/calendar/holidaydesc';
import { LessonService } from '../services/lesson.service';
import { SettingsService} from '../services/settings.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing} from '@ionic-native/social-sharing';
import { HttpModule} from '@angular/http';
import { SafePipe } from '../pipes/sanitizeHtml';

// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';

import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';


export const firebaseConfig = {
    apiKey: "AIzaSyDt_liwm2pso0V93pS7t7joJ5rsn06h_YM",
    authDomain: "jsdfs-a5dd7.firebaseapp.com",
    databaseURL: "https://jsdfs-a5dd7.firebaseio.com",
    projectId: "jsdfs-a5dd7",
    storageBucket: "",
    messagingSenderId: "54362526400"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LessonPage,
    AboutPage,
    CalendarPage,
    SettingsPage,
    FaqPage,
    HolidayPage,
    HolidayDescPage,
    SafePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LessonPage,
    AboutPage,
    CalendarPage,
    SettingsPage,
    FaqPage,
    HolidayPage,
    HolidayDescPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LessonService,SettingsService,SocialSharing,SafePipe
  ]
})
export class AppModule {}
