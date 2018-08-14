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

	setScoreStorage(name: string, win: number, lost: number): void {
		this.nativeStorage.setItem(name, {
				win: win,
				lost: lost
			})
			.then(
				() => console.log('Stored item!'),
				error => console.error('Error storing item', error)
			);
	}

	getScoreStorage(name: string): void {
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

	changePlayerPlaying(): void {
		if (this.playerPlaying == 1) {
			this.playerPlaying = 2;
			this.printPlayer = 1;
		} else {
			this.playerPlaying = 1;
			this.printPlayer = 2;
		}
	}

	changeFirstPlayer(): void {
		if (this.firstPlayer == 1) {
			this.firstPlayer = 2;
		} else {
			this.firstPlayer = 1;
		}
	}

	//TODO metre un verrou pour le prochain click
	clickMorpion(i): void {
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

	isWinDeepMorpion(mp : any[]): boolean{
		let res: boolean = false;

		for (let i: number = 0; i < 3; i++) {
			let one: boolean = mp[0 + i * 3].printed == mp[1 + i * 3].printed;
			let two: boolean = mp[0 + i * 3].printed == mp[2 + i * 3].printed;
			let three: boolean = mp[0 + i * 3].printed != 0;
			if (one && two && three) {
				res = true;
				break;
			}
		}

		if (!res) {
			for (let i: number = 0; i < 3; i++) {
				let one: boolean = mp[0 + i].printed == mp[3 + i].printed;
				let two: boolean = mp[0 + i].printed == mp[6 + i].printed;
				let three: boolean = mp[0 + i].printed != 0;
				if (one && two && three) {
					res = true;
					break;
				}
			}

			if (!res) {
				let one: boolean = mp[0].printed == mp[4].printed;
				let two: boolean = mp[0].printed == mp[8].printed;
				let three: boolean = mp[0].printed != 0;
				if (one && two && three) {
					res = true;
				}

				if (!res) {
					one = mp[2].printed == mp[4].printed;
					two = mp[2].printed == mp[6].printed;
					three = mp[2].printed != 0;
					if (one && two && three) {
						res = true;
					}
				}
			}
		}
		return res;
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

	addScorePlayer(): void {
		if (this.playerPlaying == 1) {
			this.scorePlayer1++;
			switch (this.botLevel) {
				case 0:
					break;
				case 1:
					this.getScoreStorage("easy");
					this.setScoreStorage("easy", this.scoreWin + 1, this.scoreLost);
					break;
				case 2:
					this.getScoreStorage("medium");
					this.setScoreStorage("medium", this.scoreWin + 1, this.scoreLost);
					break;
				case 3:
					this.getScoreStorage("hard");
					this.setScoreStorage("hard", this.scoreWin + 1, this.scoreLost);
					break;
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
					this.setScoreStorage("easy", this.scoreWin, this.scoreLost + 1);
					break;
				case 2:
					this.getScoreStorage("medium");
					this.setScoreStorage("medium", this.scoreWin, this.scoreLost + 1);
					break;
				case 3:
					this.getScoreStorage("hard");
					this.setScoreStorage("hard", this.scoreWin, this.scoreLost + 1);
					break;
				default:
					console.log("case not supported!!!");
			}
		}
	}

	gameWin(): void {
		let res: boolean = this.isWin();
		if (res) {
			this.addScorePlayer();
			//this.changePlayerPlaying();
		}
		this.end = res;
		this.win = res;
	}

	gameEnd(): void {

		let temp: boolean = true;
		for (let piece of this.morpion) {
			if (piece.printed == 0) {
				temp = false;
				break;
			}
		}
		this.end = temp;
	}

	newGame(): void {
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

	IAend() : void{
		this.gameWin();
		if (!this.end) {
			this.gameEnd();
		}
		this.changePlayerPlaying();
	}

	IAEasy(): void {
		let temp: any[];
		temp = new Array();
		for (let piece of this.morpion) {
			if (piece.printed == 0) {
				temp.push(piece);
			}
		}
		let res: number = Math.floor(Math.random() * temp.length);
		this.morpion[temp[res].i].printed = this.playerPlaying;
		this.IAend();
	}

	IAMedium(): void {

		this.IAEasy();

		// //creation d'un nouveau tableau de morpion et insertion de chaque piece
		// let secondaryMorpion: any[];
		// secondaryMorpion = new Array();
		// for (let piece of this.morpion) {
		// 	let secondaryPiece: any = Object.assign({}, piece);
		// 	secondaryPiece.level = 0;
		// 	secondaryMorpion.push(secondaryPiece);
		// }

		// //recherche de chaque solution de niveau 0
		// let results: any[];
		// results = new Array();
		// for (let piece of secondaryMorpion) {
		// 	if(piece.printed == 0){
		// 		let secondaryPiece: any = Object.assign({}, piece);
		// 		results.push(this.checkResults(secondaryMorpion, secondaryPiece));
		// 	}
		// }

		// for(let i of results){
		// 	if(i == {}){
		// 		console.log("LOL");
		// 	}
		// 	console.log(i);
		// }
		// //TODO modification
		// //this.IAend();

	}

	isDeepEnd(mp:any) : boolean{
		let res:boolean = true;
		for(let piece of mp){
			if(piece.printed == 0){
				res = false;
				break;
			}
		}
		return res;
	}

	checkResults(inMorpion: any, inPiece: any): any {
		 let secondaryMorpion: any[];
		secondaryMorpion = new Array();
		for (let piece of inMorpion) {
			let secondaryPiece: any = Object.assign({}, piece);
			if(piece.i == inPiece.i){
				if(inPiece.level%2 == 0){
					secondaryPiece.printed = 2;
				}else{
					secondaryPiece.printed = 1;
				}
			}
			secondaryPiece.level = piece.level + 1;
			secondaryMorpion.push(secondaryPiece);
		}

		if(this.isWinDeepMorpion(secondaryMorpion )){
			if(inPiece.level%2 == 0){
				return {
					level : inPiece.level,
					isWin : false,
					isEnd : false
				};
			}else{
				return {
					level : inPiece.level,
					isWin : true,
					isEnd : false
				};
			}
		}else if(this.isDeepEnd(secondaryMorpion)){
			return {
				level : inPiece.level,
				isWin : false,
				isEnd : true
			};
		}else{
			let results : any[];
			// let wins : any[];
			// let losts : any[];
			results = new Array();
			// wins = new Array();
			// losts = new Array();
			for (let piece of secondaryMorpion) {
				if(piece.printed == 0){
					let secondaryPiece: any = Object.assign({}, piece);
					results.push(this.checkResults(secondaryMorpion, secondaryPiece));
				}
			}
			for(let ress of results){
				if(ress.isWin){
					return {
						level : inPiece.level,
						isWin : true,
						isEnd : false
					};
				}
			}
			return {
				level : inPiece.level,
				isWin : false,
				isEnd : false
			};

		}

		console.log("inPiece");
		console.log(inPiece);
		console.log("secondaryMorpion");
		console.log(secondaryMorpion);

		return {};
	}





	IAHard(): void {
		//LOL
		this.IAMedium();
	}

}
