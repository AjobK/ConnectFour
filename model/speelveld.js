"use strict";

class SpeelVeld {
	constructor() {
		this.veld = [];
		this.snappoints = [];
		this.fiches = [];
		// Tijdelijke locatie van fiche
		this.temploc = [];
	}
	
	maakVeld(xCoord, yCoord) {
		this.veld = [];
		for(var y = 0; y < yCoord; y++) {
			this.veld[y] = [];
			for(var x = 0; x < xCoord; x++) {
				this.veld[y][x] = 0;
			}
		}
	}
	
	getSpeelVeld() {
		return this.veld;
	}
	
	resetSnapPoints() {
		this.snappoints = [];
	}
	
	setSnapPoint(bX, bY, eX, eY) {
		// Vulling van snappoints
		this.snappoints.push([[bX, bY],[eX, eY]]);
	}
	
	getSnapPoints() {
		return this.snappoints;
	}
	
	plaatsDataVeld(rij, speler) {
		let temp = [];
		
		for (let i = this.veld.length - 1; i >= 0; i--) {
			if (this.veld[i][rij] == 1 || this.veld[i][rij] == 2) {
				continue;
			} else {
				this.veld[i][rij] = speler;
				this.temploc = [[rij],[i]];
				break;
			}
		}
		
		for (let x = 0; x < this.veld.length; x++) {
			console.log(this.veld[x]);
		}
	}
	
	getTempLoc() {
		return this.temploc;
	}
	
	bepaalWinnaar(speler1, speler2) {
		
		// X wincheck
		var counter1 = 0;
		var counter2 = 0;
		
		for (let y = 0; y < this.veld.length; y++) {
			for (let x = 0; x < this.veld[y].length; x++) {
				if (this.veld[y][x] == 1) {
					counter1++;
					
					//Winnaar
					if (counter1 >= 4) {
						return "speler1";
					}
				} else {
					counter1 = 0;
				}
				
				if (this.veld[y][x] == 2) {
					counter2++;
						
					//Winnaar
					if (counter2 >= 4) {
						return "speler2";
					}
				} else {
					counter2 = 0;
				}
			}
			counter1 = 0;
			counter2 = 0;
		}
		
		counter1 = 0;
		counter2 = 0;
		
		// Y wincheck
		for (let y = 0; y < this.veld[0].length; y++) {
			for (let x = 0; x < this.veld.length; x++) {
				if (this.veld[x][y] == 1) {
					counter1++;
					
					//Winnaar
					if (counter1 >= 4) {
						return "speler1";
					}
					
				} else {
					counter1 = 0;
				}
				
				if (this.veld[x][y] == 2) {
					counter2++;
						
					//Winnaar
					if (counter2 >= 4) {
						return "speler2";
					}
					
				} else {
					counter2 = 0;
				}
			}
			counter1 = 0;
			counter2 = 0;
		}
		

		// Diagonale wincheck (Links naar rechts)
		counter1 = 0;
		counter2 = 0;
		
		for (let y = this.veld.length - 1; y >= 3; y--) {
			for (let x = 0; x < this.veld[0].length - 3; x++) {
				
				// Speler 1
				if (this.veld[y][x] == 1) {
					for (let i = 0; i < 4; i++) {
						if (this.veld[y - i][x + i] == 1) {
							counter1++;
							if (counter1 >= 4) {
								return "speler1";
							}
						}
					}
					counter1 = 0;
				}
				
				// Speler 2
				if (this.veld[y][x] == 2) {
					for (let i = 0; i < 4; i++) {
						if (this.veld[y - i][x + i] == 2) {
							counter2++;
							if (counter2 >= 4) {
								return "speler2";
							}
						}
					}
					counter2 = 0;
				}
				
			}
		}
		
		// Diagonale wincheck (Rechts naar links)
		counter1 = 0;
		counter2 = 0;
		
		for (let y = this.veld.length - 1; y >= 3; y--) {
			for (let x = 3 - 1; x < this.veld[0].length; x++) {
				
				// Speler 1
				if (this.veld[y][x] == 1) {
					for (let i = 0; i < 4; i++) {
						if (this.veld[y - i][x - i] == 1) {
							counter1++;
							if (counter1 >= 4) {
								return "speler1";
							}
						}
					}
					counter1 = 0;
				}
				
				// Speler 2
				if (this.veld[y][x] == 2) {
					for (let i = 0; i < 4; i++) {
						if (this.veld[y - i][x - i] == 2) {
							counter2++;
							if (counter2 >= 4) {
								return "speler2";
							}
						}
					}
					counter2 = 0;
				}
				
			}
		}
	}
}