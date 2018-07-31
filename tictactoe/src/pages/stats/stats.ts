import {
	Component
} from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams
} from 'ionic-angular';
import {
	NativeStorage
} from '@ionic-native/native-storage';




/**
 * Generated class for the StatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-stats',
	templateUrl: 'stats.html',
})
export class StatsPage {

	easyWin: number = 0;
	easyLost: number = 0;
	mediumWin: number = 0;
	mediumLost: number = 0;
	hardWin: number = 0;
	hardLost: number = 0;
	levels: string[] = ["easy", "medium", "hard"]

	pieChartLabels:string[] = ['win', 'lose'];
	pieChartDataEasy:number[] = [0, 0];
	pieChartDataMedium:number[] = [0, 0];
	pieChartDataHard:number[] = [0, 0];
	pieChartType:string = 'pie';
	pieChartColorsBackGround: string[]  = ["#ff0000", "#8ee000"];
	isDataChecked: boolean = false;


	// events
	chartClicked(e:any):void {
	  console.log(e);
	}

	chartHovered(e:any):void {
	  console.log(e);
	}



	constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage) {
		for (let level of this.levels) {
			this.getScoreStorage(level);
		}
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad StatsPage');
	}

	getScoreStorage(name: string) {
		this.nativeStorage.getItem(name)
			.then(
				data => {
					if (name == "easy") {
						this.easyWin = data.win;
						this.easyLost = data.lost
						this.pieChartDataEasy = [this.easyWin, this.easyLost];
					} else if (name == "medium") {
						this.mediumWin = data.win;
						this.mediumLost = data.lost
						this.pieChartDataMedium = [this.mediumWin, this.mediumLost];
					} else {
						this.hardWin = data.win;
						this.hardLost = data.lost
						this.pieChartDataHard = [this.hardWin, this.hardLost];
						this.pieChartDataHard = [10, 50];
					}
				},
				error => console.error(error)
			);
	}

}
