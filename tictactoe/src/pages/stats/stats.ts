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

	public pieChartLabels:string[] = ['win', 'lose'];
	public pieChartData:number[] = [350, 450];
	public pieChartType:string = 'pie';
	public pieChartColorsBackGround: string[]  = ["#ff0000", "#8ee000"];


	// events
	public chartClicked(e:any):void {
	  console.log(e);
	}

	public chartHovered(e:any):void {
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
						this.pieChartData = [this.easyWin, this.easyLost];
					} else if (name == "medium") {
						this.mediumWin = data.win;
						this.mediumLost = data.lost
					} else {
						this.hardWin = data.win;
						this.hardLost = data.lost
					}
				},
				error => console.error(error)
			);
	}

}
