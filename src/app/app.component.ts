import { Component, ViewChild,  } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AboutPage  } from '../pages/about/about';
import { LessonPage } from '../pages/lesson/lesson';
import { CalendarPage } from '../pages/calendar/calendar';
import { SettingsPage  } from '../pages/settings/settings';
import { FaqPage  } from '../pages/faq/faq';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //@ViewChild(Nav) nav: Nav;
  @ViewChild(Nav) navCtrl: Nav;
  rootPage: any = HomePage;

  //pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp(); 

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

        // Enable to debug issues.
        // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
        
       /* var notificationOpenedCallback = function(jsonData) {
          //console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        };

        window["plugins"].OneSignal
          .startInit("385d1363-06f9-47af-a990-b9540dd1d65a")
          .handleNotificationOpened(notificationOpenedCallback)
          .endInit();*/
          
        // Call syncHashedEmail anywhere in your app if you have the user's email.
        // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
         //window.plugins.OneSignal.syncHashedEmail(userEmail);
    });
  }

  /*openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }*/
   


  goToHome(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HomePage);
  }goToLesson(params){
    if (!params) params = {};
    this.navCtrl.setRoot(LessonPage);
  }goToCalendar(params){
    if (!params) params = {};
    this.navCtrl.setRoot(CalendarPage);
  }goToSettings(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SettingsPage);
  }goToAbout(params){
    if (!params) params = {};
    this.navCtrl.setRoot(AboutPage);
  }goToFaq(params){
    if (!params) params = {};
    this.navCtrl.setRoot(FaqPage);
  }
  exitApp(){
     this.platform.exitApp();
  }
}
