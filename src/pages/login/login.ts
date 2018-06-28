import { Component } from '@angular/core';
import { IonicPage,AlertController, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { SignupPage } from '../signup/signup';
import { NativeStorage } from "@ionic-native/native-storage";
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { ProfilePage } from '../profile/profile';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController, 
    public navParams: NavParams,
    public nativeStorage: NativeStorage,
    public formBuilder: FormBuilder,
    public storage:Storage
  ) {
    this.loginForm = this.formBuilder.group({
      username:['',Validators.required],
      password: ['',Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.storage.get("loggedIn").then((loggedIn)=>{
      if(loggedIn){
          this.navCtrl.setRoot(ProfilePage)
      }
    })
    
  }

  goToSignup(){
    this.navCtrl.push(SignupPage);
  }

  loginUser(){
    console.log("Username:" + this.loginForm.value.username);
    console.log("Password:" + this.loginForm.value.password);
    
    this.nativeStorage.getItem(this.loginForm.value.username).then(
      user => {
        console.log("logged in user:  "+JSON.stringify(user));
        
        if(this.loginForm.value.password===user.password){
          console.log("storing in localstorage: "+user.username)
          this.storage.set("username",user.username).then((username)=>{
            console.log("stored in local: "+username);
            this.storage.set("loggedIn",true).then((loggedIn)=>{
              console.log("loggeado "+loggedIn);
            });
            this.navCtrl.setRoot(ProfilePage);
          });
          
        }else{
          let alert =this.alertCtrl.create({
            title:"Incorrect password",
            buttons:['OK']
          });
          alert.present();

          
        }
      }, error => console.error(error)
    );
  }

}
