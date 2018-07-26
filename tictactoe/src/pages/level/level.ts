import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GamePage } from '../game/game';

/**
 * Generated class for the LevelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-level',
  templateUrl: 'level.html',
})
export class LevelPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LevelPage');
  }

  goPlayEasy(){
    this.navCtrl.push(GamePage,{botLevel:1});
  }

  goPlayMedium(){
    this.navCtrl.push(GamePage,{botLevel:2});
  }

  goPlayHard(){
    this.navCtrl.push(GamePage,{botLevel:3});
  }



}
