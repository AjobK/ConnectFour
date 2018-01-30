"use strict";

class Controller {
	constructor() {
		this.view = new View();
		this.speelveld = new SpeelVeld();
		this.spelers = [];
		
		// Veld data (Hier geplaatst omdat de data zo makkelijker te beinvloeden is)
		this.veldData = {
				X: 7,
				Y: 6,
				blokMaat: 75,
				puntX: (window.innerWidth - this.blokMaat * this.X) / 2,
				puntY: 300
		};
		
		// Maakt veld data aan
		this.speelveld.maakVeld(this.veldData.X, this.veldData.Y);
		
		// Voegt twee spelers toe aan het spel
		this.spelers.push(new Speler("red", true));
		this.spelers.push(new Speler("yellow", false));
		
		// Fiche
		this.tempfiche = new Fiche(this.spelers[0].getKleur(), window.innerWidth / 2, this.veldData.puntY - 180);
		
		// Maakt veld aan (Resize)
		window.addEventListener("resize", function(e){
			let kleur = controller.spelers[0].getBeurt() ? controller.spelers[0].getKleur() : controller.spelers[1].getKleur();
			controller.veldData.puntX = (window.innerWidth - controller.veldData.blokMaat * controller.veldData.X) / 2;
			controller.reageerOpVeld(controller.veldData.X, controller.veldData.Y, controller.veldData.blokMaat, controller.veldData.puntX, controller.veldData.puntY, window.innerWidth / 2, controller.veldData.puntY - 180, kleur);
			
			// Welkomst scherm
			document.querySelectorAll("main > section")[0].querySelectorAll("div")[1].querySelectorAll("h1")[0].style.paddingTop = window.innerHeight / 2 + "px";
			document.querySelectorAll("main > section")[0].querySelectorAll("div")[1].style.height = window.innerHeight + "px";
			controller.tempfiche.setX(window.innerWidth / 2);
			controller.tempfiche.setY(controller.veldData.puntY - 180);
			
			// Winnaars scherm resize
			document.querySelectorAll("main > section")[2].style.height = window.innerHeight + "px";
			document.querySelectorAll("main > section")[2].style.width = window.innerWidth + "px";
		});
		
		
		// Muis beweging
		window.addEventListener("mousemove", function(e){
			if (!controller.tempfiche.getLocked()) {
				let xClient = e.clientX;
				let yClient = e.clientY;
				
				controller.tempfiche.setX(xClient);
				controller.tempfiche.setY(yClient);
				
				if (document.querySelectorAll("main section")[0].classList[1] == "hideblock") {
					for (let i = 0; i < controller.speelveld.getSnapPoints().length; i++) {
						if(xClient >= controller.speelveld.getSnapPoints()[i][0][0] && xClient <= controller.speelveld.getSnapPoints()[i][1][0] && yClient >= controller.speelveld.getSnapPoints()[i][0][1] && yClient <= controller.speelveld.getSnapPoints()[i][1][1]) {
							xClient = controller.speelveld.getSnapPoints()[i][0][0] + controller.veldData.blokMaat / 2;
							yClient = controller.speelveld.getSnapPoints()[i][0][1] + controller.veldData.blokMaat / 2;
							
							controller.tempfiche.setX(xClient);
							controller.tempfiche.setX(yClient);
						}
					}
				}
				
				controller.reageerOpVeld(controller.veldData.X, controller.veldData.Y, controller.veldData.blokMaat, controller.veldData.puntX, controller.veldData.puntY, xClient, yClient, controller.tempfiche.getKleur());
			}
		});
		
		// Muis ingedrukt
		window.addEventListener("mousedown", function(e) {
			if (document.querySelectorAll("main > section")[2].style.display != "block") {
				let x = e.clientX;
				let y = e.clientY;
				
				if (controller.tempfiche.getLocked()) {
					if (x >= controller.tempfiche.getX() - controller.veldData.blokMaat / 2 && x <= controller.tempfiche.getX() + controller.veldData.blokMaat / 2 && y >= controller.tempfiche.getY() - controller.veldData.blokMaat / 2 && y <= controller.tempfiche.getY() + controller.veldData.blokMaat / 2) {
						document.body.style.cursor = "none";
						controller.tempfiche.setLocked(false);
					}
				}
				
				for (let i = 0; i < controller.speelveld.getSnapPoints().length; i++) {
					if (x >= controller.speelveld.getSnapPoints()[i][0][0] && x <= controller.speelveld.getSnapPoints()[i][1][0] && y >= controller.speelveld.getSnapPoints()[i][0][1] && y <= controller.speelveld.getSnapPoints()[i][1][1]) {
						document.body.style.cursor = "none";
						controller.tempfiche.setLocked(false);
					}
				}
			}
		});
		
		// Muis los
		window.addEventListener("mouseup", function(e) {
			document.body.style.cursor = "default";
			if (document.querySelectorAll("main > section")[0].classList[1] == "hideblock") {
				let x = e.clientX;
				let y = e.clientY;
				
				if (!controller.tempfiche.getLocked()) {
					
					controller.tempfiche.setLocked(true);
					
					for (let i = 0; i < controller.speelveld.getSnapPoints().length; i++) {
						if(x >= controller.speelveld.getSnapPoints()[i][0][0] && x <= controller.speelveld.getSnapPoints()[i][1][0] && y >= controller.speelveld.getSnapPoints()[i][0][1] && y <= controller.speelveld.getSnapPoints()[i][1][1]) {
							if (controller.speelveld.getSpeelVeld()[0][i] == 0) {
								x = controller.speelveld.getSnapPoints()[i][0][0] + controller.veldData.blokMaat / 2;
								y = controller.speelveld.getSnapPoints()[i][0][1] + controller.veldData.blokMaat / 2;
								
								let tempspeler = controller.spelers[0].getBeurt() ? 1 : 2;
								
								controller.speelveld.plaatsDataVeld(i, tempspeler);
								
								controller.tempfiche.setX(x);
								controller.tempfiche.setY(y);
								
								// Winnaar word bepaald, hier geplaatst vanwege directe interactie met gebruiker
								if (controller.speelveld.bepaalWinnaar(controller.spelers[0].getNaam(), controller.spelers[1].getNaam()) == "speler1") {
									document.querySelectorAll("main > section")[2].style.display = "block";
									document.querySelectorAll("main > section")[2].querySelectorAll("h1")[0].innerHTML = controller.spelers[0].getNaam() + " heeft gewonnen! <br /> <u> Klik hier om nog een keer te spelen. </u>";
								} else if (controller.speelveld.bepaalWinnaar(controller.spelers[0].getNaam(), controller.spelers[1].getNaam()) == "speler2") {
									document.querySelectorAll("main > section")[2].style.display = "block";
									document.querySelectorAll("main > section")[2].querySelectorAll("h1")[0].innerHTML = controller.spelers[0].getNaam() + " heeft gewonnen! <br /> <u> Klik hier om nog een keer te spelen. </u>";
								}
					
								if (controller.spelers[0].getBeurt() == true) {
									controller.spelers[0].setBeurt(false);
									controller.spelers[1].setBeurt(true);
								} else {
									controller.spelers[0].setBeurt(true);
									controller.spelers[1].setBeurt(false);
								}
								
								// Kleur bepaling van fiches
								let kleur = controller.spelers[0].getBeurt() ? controller.spelers[0].getKleur() : controller.spelers[1].getKleur();
								controller.tempfiche = new Fiche(kleur, window.innerWidth / 2, controller.veldData.puntY - 180);
								
								controller.reageerOpVeld(controller.veldData.X, controller.veldData.Y, controller.veldData.blokMaat, controller.veldData.puntX, controller.veldData.puntY, window.innerWidth / 2, controller.veldData.puntY - 180, kleur);
							}
						}
					}
				}
			}
		});
		
		// Welkomst pagina (Aankomst)
		document.querySelectorAll("main > section")[0].querySelectorAll("div")[1].style.height = window.innerHeight + "px";
		document.querySelectorAll("main > section")[0].querySelectorAll("div")[1].style.height = window.innerHeight + "px";
		document.querySelectorAll("main > section")[0].querySelectorAll("div")[1].querySelector("h1").style.paddingTop = window.innerHeight / 2 + "px";
		
		// Winnaars pagina
		document.querySelectorAll("main > section")[2].classList.add("hideblock");
		
		// Welkomst pagina (Succesvol ingevuld)
		document.querySelectorAll("main > section div")[1].addEventListener("click", function(e){
			if (document.querySelectorAll("main > section")[0].querySelectorAll("input[type='text']")[0].value != "" && document.querySelectorAll("main > section")[0].querySelectorAll("input[type='text']")[1].value != "") {
				
				// Reset schermen
				document.querySelectorAll("main > section")[0].classList.add("hideopacity");
				setTimeout(function(e){document.querySelectorAll("main section")[0].classList.add("hideblock")}, 500);
				document.getElementsByTagName("canvas")[0].classList.add("static");
				
				// Vang data (namen) van spelers
				controller.spelers[0].setNaam(document.querySelectorAll("main > section")[0].querySelectorAll("input[type='text']")[0].value);
				controller.spelers[1].setNaam(document.querySelectorAll("main > section")[0].querySelectorAll("input[type='text']")[1].value);
				
				let kleur = controller.spelers[0].getBeurt() ? controller.spelers[0].getKleur() : controller.spelers[1].getKleur();
				controller.veldData.puntX = (window.innerWidth - controller.veldData.blokMaat * controller.veldData.X) / 2;
				controller.reageerOpVeld(controller.veldData.X, controller.veldData.Y, controller.veldData.blokMaat, controller.veldData.puntX, controller.veldData.puntY, window.innerWidth / 2, controller.veldData.puntY - 180, kleur);
			
			} else {
				if (document.querySelectorAll("main > section")[0].querySelectorAll("div")[1].querySelectorAll("h1")[0].innerHTML == " Klik om te starten ") {
					document.querySelectorAll("main > section")[0].querySelectorAll("div")[1].querySelectorAll("h1")[0].innerHTML = "<u> Voer namen in </u>";
					setTimeout(function(){document.querySelectorAll("main section")[0].querySelectorAll("div")[1].querySelectorAll("h1")[0].innerHTML = " Klik om te starten "}, 2000);
				}
			}
		});
		
		// Winnaars schermen
		document.querySelectorAll("main > section")[2].style.height = window.innerHeight + "px";
		document.querySelectorAll("main > section")[2].style.width = window.innerWidth + "px";
		document.querySelectorAll("main > section")[2].addEventListener("click", function(e) {
			location.reload();
		});
		
		// Instructie scherm
		document.querySelectorAll("main > section")[1].addEventListener("click", function(e) {
			this.style.transition = "0.2s";
			this.style.opacity = "0";
			setTimeout(function(){document.querySelectorAll("main > section")[1].style.display = "none"}, 200);
		});
	}
	
	// Alles word beheerd in de controller met de reageerOpVeld methode
	reageerOpVeld(x, y, blokgrootte, puntX, puntY, ficheX, ficheY, ficheKleur) {
		// Leegt snappoints array
		this.speelveld.resetSnapPoints();
		
		// Vult snappoints met coordinaten
		let limitedX = puntX;
		
		for(var i = 0; i < x; i++) {
			// beginX (Links), beginY (boven), eindX (Rechts), eindY(Beneden) 
			this.speelveld.setSnapPoint(limitedX, puntY - blokgrootte, limitedX + blokgrootte, puntY);
			limitedX += blokgrootte;
		}
		
		// Drukt veld af op canvas
		this.view.tekenSpeelVeld(this.speelveld.getSpeelVeld, blokgrootte, x, y, (window.innerWidth - blokgrootte * x) / 2, puntY);
	
		// Toon fiches lijst
		this.view.tekenFichesVanLijst(this.speelveld.getSpeelVeld(), blokgrootte, puntX, puntY);
		
		// Toon beurt
		this.view.toonBeurt(this.spelers[0].getBeurt() ? this.spelers[0].getNaam() : this.spelers[1].getNaam());
		
		// Toon fiche
		this.view.toonFiche(ficheX, ficheY, ficheKleur, blokgrootte);
		
		// Drukt snappoints af op canvas
		this.view.toonSnapPoints(this.speelveld.getSnapPoints(), blokgrootte);
	}
}