import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user : any= {name:'', email:'', username:'', password:'', status: '', species:'', gender:'', origin:'',location:''}
  keys:string[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public nativeStorage:NativeStorage,public storage:Storage) {
    
  }

  
  tapped(){
    console.log("user tapped image twice")
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
      this.storage.get("username").then((username)=>{
        console.log("fetched username from localstorage: "+username)
          this.nativeStorage.getItem(username).then((user)=>{
            this.user={...user};
          })
        
           this.keys=Object.keys(this.user);
          console.log("keys"+this.keys);
      console.log("user: "+this.user);
      })
      
      
    

    
  }

}
