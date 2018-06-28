import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import {Storage} from '@ionic/storage'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  loggedIn:boolean=false;
  pages: Array<{title: string, component: any}>;
  // homePage:HomePage;
  // loginPage:LoginPage;
  // signupPage:SignupPage;
  // profilePage:ProfilePage;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private storage:Storage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Login', component: LoginPage },
      { title: 'Register', component: SignupPage },
      { title: 'Profile ', component: ProfilePage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();


    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  
  // checkLogged(){
  //   this.storage.get("loggedIn").then((loggedIn)=>{
  //     if(!loggedIn || loggedIn == null){
  //       console.log("user is not loggedin ")
  //       return false;
  //     }else{
  //       console.log("user is logged")
  //       return true;
  //     }
  //   })
  // }


}




//  //logged in logic
//  this.storage.get("loggedIn").then((loggedIn)=>{
//   console.log("checking logged user for menu component :"+this.loggedIn);
//   this.loggedIn=loggedIn;
//   if(loggedIn || !loggedIn==null){
//       this.pages.map((page,index)=>{
//         if(page.title=="Register" || page.title=="Login"){
//           console.log("removed logged out buttons")
//           this.pages.splice(index,1);
//         }
//       })
//   }else if(loggedIn==false || loggedIn==null){
//     this.pages.map((page,index)=>{
//       if(page.title=="Profile"){
//         console.log("removed Profile button")
//         this.pages.splice(index,1);
//       }
//     })
    

//   }
// })///logged in logic-----