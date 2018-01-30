"use strict";

class View {
	constructor() {
		this.canvas = document.getElementsByTagName("canvas")[0];
		this.ctx = this.canvas.getContext("2d");
	}
	
	tekenSpeelVeld(veld, blokgrootte, xCoord, yCoord, puntX, puntY) {
		// xCoord = Blokken horizontaal
		// yCoord = Blokken verticaal
		// puntX = Bewegend punt naar rechts
		// puntY = Bewegend punt naar beneden
		
		if(puntX <= 0)
			puntX = 10;
		
		//Canvas hoogte
		yCoord * blokgrootte + puntY <= window.innerHeight
			? this.canvas.height = window.innerHeight
			: this.canvas.height = blokgrootte * yCoord + puntY + 10;
		
		//Canvas breedte
		xCoord * blokgrootte <= window.innerWidth
			? this.canvas.width = window.innerWidth
			: this.canvas.width = blokgrootte * xCoord + puntX + 10;
		
		
		for(var y = 0; y < yCoord; y++) {
			for(var x = 0; x < xCoord; x++) {
				this.ctx.strokeRect(puntX, puntY, blokgrootte, blokgrootte);
				
				//Patroon, kan 2x zelfde code in if en else bevatten omdat dit verschillende patronen toont op verandering van conditions.
				if(y % 2 == 0) {
					if (x % 2 !== 0) {
						this.ctx.fillStyle="rgba(200,200,200,0.85)";
					} else {
						this.ctx.fillStyle="rgba(150,150,150,0.85)";
					}
				} else {
					if (x % 2 !== 0) {
						this.ctx.fillStyle="rgba(200,200,200,0.85)";
					} else {
						this.ctx.fillStyle="rgba(150,150,150,0.85)";
					}
				}
				this.ctx.fillRect(puntX, puntY, blokgrootte, blokgrootte);
				
				//X positie vergroot
				puntX += blokgrootte;
			}
			
			puntX = (window.innerWidth - blokgrootte * xCoord) / 2;
			
			if(puntX <= 0)
				puntX = 10;
			
			puntY += blokgrootte;
		}
		// console.log("Map built [x" + this.mapcount + "]");
	}
	
	toonBeurt(speler) {
		this.ctx.font = "30px arial";
		this.ctx.fillStyle = "white";
		this.ctx.textAlign = "center";
		this.ctx.fillText("Beurt: " + speler, this.canvas.width / 2, 50);
	}
	
	toonFiche(ficheX, ficheY, color, blokgrootte) {
		this.ctx.fillStyle = color;
		this.ctx.lineWidth = blokgrootte / 20;
		this.ctx.strokeStyle = "rgba(0,0,0,0.07)";
		this.ctx.beginPath();
		this.ctx.arc(ficheX, ficheY, (blokgrootte - (blokgrootte / 20)) / 2, 2 * Math.PI, false)
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.closePath();
	}
	
	toonSnapPoints(snappoints, blokgrootte) {
		for (let i = 0; i < snappoints.length; i++) {
			this.ctx.fillStyle = "rgba(150,0,0,0.1)";
			this.ctx.fillRect(snappoints[i][0][0], snappoints[i][0][1], blokgrootte, blokgrootte);
			this.ctx.stroke();
		}
	}
	
	tekenFichesVanLijst(ficheslijst, blokgrootte, xStart, yStart) {
		
		xStart += blokgrootte / 2;
		yStart += blokgrootte / 2;

		var xReset = xStart;
		
		for (let y = 0; y < ficheslijst.length; y++) {
			for (let x = 0; x < ficheslijst[y].length; x++) {
				// Fiche
				if (ficheslijst[y][x] == 1 || ficheslijst[y][x] == 2) {
					this.ctx.lineWidth = blokgrootte / 20;
					this.ctx.strokeStyle = "rgba(0,0,0,0.4)";
					this.ctx.beginPath();
					this.ctx.arc(xStart, yStart, (blokgrootte - (blokgrootte / 20)) / 2, 2 * Math.PI, false)
					
					if (ficheslijst[y][x] == 1) {
						this.ctx.fillStyle = "red";
					} else if (ficheslijst[y][x] == 2) {
						this.ctx.fillStyle = "yellow";
					}
					
					this.ctx.fill();
					this.ctx.stroke();
					this.ctx.closePath();
					
				}
				xStart += blokgrootte;
			}
			xStart = xReset;
			yStart += blokgrootte;
		}
	}
}