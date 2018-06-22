import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { NativeStorage } from "@ionic-native/native-storage";
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  private username: string;
  private password: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public nativeStorage: NativeStorage,
    public formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username:['',Validators.required],
      password: ['',Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToSignup(){
    this.navCtrl.push(SignupPage);
  }

  loginUser(){
    console.log("Username:" + this.loginForm.value.username);
    console.log("Password:" + this.loginForm.value.password);
    
    this.nativeStorage.getItem(this.username).then(
      data => {
        
        console.log(data);
        alert(JSON.stringify(data))
      }, error => console.error(error)
    );
  }

}
