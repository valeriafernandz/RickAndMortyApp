import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  favorites:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private nativeStorage:NativeStorage,private storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
      this.storage.get("username").then((username)=>{

        this.nativeStorage.getItem(username).then((user)=>{
          this.favorites=user.favorites;
          })
        });

  }


  delete(id){
    this.storage.get("username").then((username)=>{
      let index= this.favorites.findIndex((favorite)=>favorite.id==id);
      this.favorites.splice(index,1);
      this.nativeStorage.getItem(username).then((user)=>{
        user.favorites=this.favorites;
        this.nativeStorage.setItem(user.username,user).then(()=>{
                  console.log("deleted favorite")
        },error=>{console.error("error en set item")})
      })
    })
   
  }

  

}
