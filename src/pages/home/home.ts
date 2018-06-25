import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpRequestProvider } from "../../providers/http-request/http-request";
import { NativeStorage } from "@ionic-native/native-storage";
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private requestProvider: HttpRequestProvider,
    private nativeStorage: NativeStorage,
    private storage:Storage
  ) {}

  results = [];
  page: number = 1;

  ionViewDidLoad(){
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
        console.log("user from native storage: "+user.username);
        console.log("post to push: "+this.results.find((result)=>result.id===id).name)
        //no esta entrando a esta parte porque no agarra el user de el get i guess, user.favorites is undefined
          this.nativeStorage.setItem(user.username,{favorites:user.favorites.push(this.results.find((result)=>result.id===id))}).then((user)=>{
            console.log("user already modified: "+user.username)
            user.favorites.map(favorite=>console.log(favorite))
          })
      })
    })
  }

}
