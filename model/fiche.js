"use strict";

class Fiche {
	constructor(kleur, x, y) {
		this.kleur = kleur;
		this.x = x;
		this.y = y;
		this.locked = true;
	}
	
	getX() {
		return this.x;
	}
	
	getY() {
		return this.y;
	}
	
	getLocked() {
		return this.locked;
	}
	
	getKleur() {
		return this.kleur;
	}
	
	setX(content) {
		this.x = content;
	}
	
	setY(content) {
		this.y = content;
	}
	
	setLocked(condition) {
		this.locked = condition;
	}
}