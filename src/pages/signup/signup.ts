import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from "@ionic-native/native-storage";
import { FormBuilder , FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  myForm: FormGroup;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public nativeStorage: NativeStorage,
    public formBuilder: FormBuilder
  ) {
    this.myForm = this.formBuilder.group({
      name:['', Validators.required],
      lastname:['', Validators.required],
      email:['', Validators.required],
      username:['',Validators.required],
      password: ['',Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    
  }

  signup(){
    console.log("Name:" + this.myForm.value.name);
    console.log("LastName:" + this.myForm.value.lastname);
    console.log("Email:" + this.myForm.value.email);
    console.log("Username:" + this.myForm.value.username);
    console.log("Password:" + this.myForm.value.password);
    this.nativeStorage.setItem("myitem",{
      name: this.myForm.value.name,
      lastname: this.myForm.value.lastname,
      email: this.myForm.value.email,
      username: this.myForm.value.username,
      password: this.myForm.value.password
    })
    .then(
      ()=> {
        console.log("stored user");
        
        this.navCtrl.push(HomePage);
      },
      error => console.error("Error registering user",error)
    );
  }

}
