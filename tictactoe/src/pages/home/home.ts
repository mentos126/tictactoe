import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LevelPage } from '../level/level';
import { StatsPage } from '../stats/stats';
import { GamePage } from '../game/game';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goPlayPlayer(){
      this.navCtrl.push(GamePage, {
        botLevel: 0
      })
  }

  goToStats(){
    this.navCtrl.push(StatsPage)
  }

  goToLevel(){
    this.navCtrl.push(LevelPage)
  }

  
}
