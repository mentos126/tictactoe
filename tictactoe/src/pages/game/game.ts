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
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({

	selector: 'page-game',
	templateUrl: 'game.html',
})
export class GamePage {

	verrou: boolean = false;
	botLevel: any;
	morpion: any[];
	playerPlaying: number = 1;
	printPlayer: number = 1;
	firstPlayer: number = 1;
	scorePlayer1: number = 0;
	scorePlayer2: number = 0;
	history: any[];
	end: boolean = false;
	win: boolean = false;
	scoreWin: number = 0;
	scoreLost: number = 0;

	constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage) {
		this.botLevel = navParams.get('botLevel');
		this.newGame();
	}

	setScoreStorage(name: string, win: number, lost: number) {
		this.nativeStorage.setItem(name, {
				win: win,
				lost: lost
			})
			.then(
				() => console.log('Stored item!'),
				error => console.error('Error storing item', error)
			);
	}

	getScoreStorage(name: string) {
		this.nativeStorage.getItem(name)
			.then(
				data => {
					this.scoreWin = data.win;
					this.scoreLost = data.lost
				},
				error => console.error(error)
			);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad GamePage');
	}

	changePlayerPlaying() {
		if (this.playerPlaying == 1) {
			this.playerPlaying = 2;
			this.printPlayer = 1;
		} else {
			this.playerPlaying = 1;
			this.printPlayer = 2;
		}
	}

	changeFirstPlayer() {
		if (this.firstPlayer == 1) {
			this.firstPlayer = 2;
		} else {
			this.firstPlayer = 1;
		}
	}

	//TODO metre un verrou pour le prochain click
	clickMorpion(i) {
		if (!this.verrou) {
			if (!this.end) {
				if (this.morpion[i].printed == 0) {
					this.verrou = true;

					this.morpion[i].printed = this.playerPlaying;

					this.gameWin();
					if (!this.end) {
						this.gameEnd();
					}
					this.changePlayerPlaying()

					if (this.end) {
						this.changeFirstPlayer()
					}

					if (!this.end) {
						switch (this.botLevel) {
							case 0:
								break;
							case 1:
								this.IAEasy();
								break;
							case 2:
								this.IAMedium();
								break;
							case 3:
								this.IAHard();
								break;
							default:
								console.log("case not supported!!!");
						}
					}
					this.verrou = false;
				}
			}
		}
	}

	isWin(): boolean {
		let res: boolean = false;

		for (let i: number = 0; i < 3; i++) {
			let one: boolean = this.morpion[0 + i * 3].printed == this.morpion[1 + i * 3].printed;
			let two: boolean = this.morpion[0 + i * 3].printed == this.morpion[2 + i * 3].printed;
			let three: boolean = this.morpion[0 + i * 3].printed != 0;
			if (one && two && three) {
				res = true;
				break;
			}
		}

		if (!res) {
			for (let i: number = 0; i < 3; i++) {
				let one: boolean = this.morpion[0 + i].printed == this.morpion[3 + i].printed;
				let two: boolean = this.morpion[0 + i].printed == this.morpion[6 + i].printed;
				let three: boolean = this.morpion[0 + i].printed != 0;
				if (one && two && three) {
					res = true;
					break;
				}
			}

			if (!res) {
				let one: boolean = this.morpion[0].printed == this.morpion[4].printed;
				let two: boolean = this.morpion[0].printed == this.morpion[8].printed;
				let three: boolean = this.morpion[0].printed != 0;
				if (one && two && three) {
					res = true;
				}

				if (!res) {
					one = this.morpion[2].printed == this.morpion[4].printed;
					two = this.morpion[2].printed == this.morpion[6].printed;
					three = this.morpion[2].printed != 0;
					if (one && two && three) {
						res = true;
					}
				}
			}
		}
		return res;
	}

	addScorePlayer() {
		if (this.playerPlaying == 1) {
			this.scorePlayer1++;
			switch (this.botLevel) {
				case 0:
					break;
				case 1:
					this.getScoreStorage("easy");
					this.setScoreStorage("easy",this.scoreWin+1,this.scoreLost);
					break;
				case 2:
					this.getScoreStorage("medium");
					this.setScoreStorage("medium",this.scoreWin+1,this.scoreLost);
					break;
				case 3:
					this.getScoreStorage("hard");
					this.setScoreStorage("hard",this.scoreWin+1,this.scoreLost);					break;
				default:
					console.log("case not supported!!!");
			}
		} else {
			this.scorePlayer2++;
			switch (this.botLevel) {
				case 0:
					break;
					case 1:
					this.getScoreStorage("easy");
					this.setScoreStorage("easy",this.scoreWin,this.scoreLost+1);
					break;
				case 2:
					this.getScoreStorage("medium");
					this.setScoreStorage("medium",this.scoreWin,this.scoreLost+1);
					break;
				case 3:
					this.getScoreStorage("hard");
					this.setScoreStorage("hard",this.scoreWin,this.scoreLost+1);					break;
				default:
					console.log("case not supported!!!");
			}
		}
	}

	gameWin() {
		let res: boolean = this.isWin();
		if (res) {
			this.addScorePlayer();
			//this.changePlayerPlaying();
		}
		this.end = res;
		this.win = res;
	}

	gameEnd() {

		let temp: boolean = true;
		for (let piece of this.morpion) {
			if (piece.printed == 0) {
				temp = false;
				break;
			}
		}
		this.end = temp;
	}

	newGame() {
		this.playerPlaying = this.firstPlayer;
		this.end = false;
		this.win = false;
		this.morpion = new Array();
		for (let i: number = 0; i < 9; i++) {
			this.morpion.push({
				"i": i,
				"printed": 0
			});
		}

		if (this.firstPlayer == 2) {
			switch (this.botLevel) {
				case 0:
					break;
				case 1:
					this.IAEasy();
					break;
				case 2:
					this.IAMedium();
					break;
				case 3:
					this.IAHard();
					break;
				default:

			}
		}

	}

	IAEasy() {
		let temp: any[];
		temp = new Array();
		for (let piece of this.morpion) {
			if (piece.printed == 0) {
				temp.push(piece);
			}
		}
		let res: number = Math.floor(Math.random() * temp.length);
		this.morpion[temp[res].i].printed = this.playerPlaying;

		this.gameWin();
		if (!this.end) {
			this.gameEnd();
		}
		this.changePlayerPlaying();
	}

	IAMedium() {}
	IAHard() {}


}
