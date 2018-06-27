import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { HttpRequestProvider } from "../../providers/http-request/http-request";
import { NativeStorage } from "@ionic-native/native-storage";
import {Storage} from '@ionic/storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private requestProvider: HttpRequestProvider,
    private nativeStorage: NativeStorage,
    private storage:Storage,
    private toastCtrl:ToastController
  ) {}

  results = [];
  page: number = 1;
  user:any;
  ionViewDidLoad(){
    this.storage.get("loggedIn").then((loggedIn)=>{
  
        if(loggedIn==true){
          

        }

      
    });
    
    this.requestProvider.getCharacters(this.page).subscribe(data =>{
      console.log(data);
      
      for(let i = 0; i < data.results.length; i++){
        this.results.push(data.results[i]);
      }
      console.log(this.results);
      this.page+=1;
    });
    
  }


  doInfinite(infiniteScroll){
    console.log("Begin async operation");

    this.requestProvider.getCharacters(this.page).subscribe(data =>{
      console.log(data);
      for(let i = 0; i < data.results.length; i++){
        this.results.push(data.results[i]);
      }
      console.log(this.results);
      console.log("Async operation has ended");
      this.page += 1;
      infiniteScroll.complete();
    });
  }

  favorite(id){
    this.storage.get("username").then((username)=>{
      console.log("username from local storage: "+username)
      this.nativeStorage.getItem(username).then((user)=>{
        console.log("user from native storage: "+JSON.stringify(user));
        let char =this.results.find((result)=>result.id===id);
        console.log("post to push: "+char.name)
        this.user=user;
        let length =this.user.favorites.push(char);
        console.log("length of favorite array: "+length)
        
        console.log("this.user= "+JSON.stringify(this.user))


        this.nativeStorage.setItem(this.user.username,this.user).then(
          ()=> {
            console.log("stored user"+JSON.stringify(this.user));
            let toast= this.toastCtrl.create({
              message:"Added to Favorites!",
            duration:1000,
            position:"top",
            cssClass:"toast"
            });
            toast.present();
          },
          error => console.error("Error registering user",error)
        );
      });
    });
        
      
  }

  logout() {
    
  }

}
