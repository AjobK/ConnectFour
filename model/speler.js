"use strict";

class Speler {
	// Hier valt niet veel te commenten, spreekt vrijwel voor zich.
	constructor(kleur, beurt) {
		this.naam = "";
		this.beurt = beurt;
		this.kleur = kleur;
	}
	
	getNaam() {
		return this.naam;
	}
	
	getBeurt() {
		return this.beurt;
	}
	
	getKleur() {
		return this.kleur;
	}
	
	setNaam(naam) {
		this.naam = naam;
	}
	
	setBeurt(content) {
		this.beurt = content;
	}
}