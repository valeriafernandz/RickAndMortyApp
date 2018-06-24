import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpRequestProvider } from "../../providers/http-request/http-request";
import { NativeStorage } from "@ionic-native/native-storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private requestProvider: HttpRequestProvider,
    private nativeStorage: NativeStorage
  ) {}

  results = [];
  index: number = 20;

  ionViewDidLoad(){
    this.requestProvider.getCharacters(0).subscribe(data =>{
      console.log(data);
      
      for(let i = 0; i < data.results.length; i++){
        this.results.push(data.results[i].name);
      }
      console.log(this.results);
    });
  }

}
