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
  page: number = 5;
  index: number = 20;

  ionViewDidLoad(){
    this.requestProvider.getCharacters(this.page).subscribe(data =>{
      console.log(data);
      
      for(let i = 0; i < data.results.length; i++){
        this.results.push(data.results[i]);
      }
      console.log(this.results);
    });
  }

  doInfinite(infiniteScroll){
    console.log("Begin async operation");

    this.requestProvider.getCharacters(this.index).subscribe(data =>{
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

}
