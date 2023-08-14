class Person {
	constructor() {
		this.health = av_hel;
		this.happiness = av_hap;
		this.isWorking = true;
		this.alive = true;
	}

	tick() {
		if (!this.alive) return;
		if (this.isWorking) {
			// The happier a person, the more income they generate
			money += (.0075 * this.happiness + .25 + (.1 * Math.random() - .05)) / 10;
			this.health -= 1;
			if (this.health >= 70 && this.happiness < 100 && this.happiness > 20) {
				this.happiness += 1;
			} else if ((this.health <= 60 || this.happiness < 20) && this.happiness > 0) {
				this.happiness -= 1;
			}
			if (this.health < working_threshold) {
				this.isWorking = false;
			}
		} else {
			if (this.health < 100 && this.health > 30 && this.happiness > 20) {
				this.health += 1;
			} else {
				this.health -= 1;
			}
			if (this.happiness > 0 && (this.health < 80 || this.health == 100)) {
				// People are generally not very happy when they're sick
				this.happiness -= 1;
			}
			if (this.health >= working_threshold + back_to_work_threshold) {
				this.isWorking = true;
			}
		}
		if (this.health <= 0) {
			this.alive = false;
			ded += 1;
			return
		}
		av_hap += this.happiness / (100 - ded);
		av_hel += this.health / (100 - ded);
		if (this.health < min_hel) {
			min_hel = this.health;
		}
		if (this.happiness < min_hap) {
			min_hap = this.happiness
		}
	}
}

var money = 5;
var av_hap = 70;
var min_hap = av_hap;
var av_hel = 80;
var min_hel = av_hel;
var working_threshold = 70;
var back_to_work_threshold = 10;
let wealth = (money + av_hap + av_hel) / 3;
let people = [];
for (let i = 0; i < 100; i++) {
	people.push(new Person());
}
var ded = 0;
let time = 0;
let high = money;
let high_time = time;
let hap_hist = [];
let hel_hist = [];
let mon_hist = [];
let wth_hist = [];
for (let i = 0; i < 500; i++) {
	hap_hist.push(av_hap);
	hel_hist.push(av_hel);
	mon_hist.push(money);
	wth_hist.push(wealth);
}
let mood = 0;

function giveSupport() {
	mood += 40;
	if (mood > 100) {
		mood = 100;
	}
	money -= 2;
}

// This seems to not work
function healPeople() {
	for (person of people) {
		if (person.health < 30) {
			console.log(`before heal: ${person.health}`);
			money -= (40 - person.health) / 10;
			person.health = 40;
			console.log(`after heal: ${person.health}`);
		}
	}
}

function healthMaintenance() {
	for (person of people) {
		person.health = Math.min(person.health + 10, 100);
		person.happiness = Math.min(Math.max(person.happiness + Math.round(Math.random()), 0), 100);
		money -= .1;
	}
}

// This seems to not work
function cureDepression() {
	for (person of people) {
		if (person.happiness < 20) {
			console.log(`before therapy: ${person.happiness}`);
			money -= (50 - person.happiness) / 10;
			person.happiness = 50;
			console.log(`after therapy: ${person.happiness}`);
		}
	}
}

function tick() {
	money -= 2;
	av_hap = 0;
	av_hel = 0;
	min_hap = 100;
	min_hel = 100;
	mood -= 1;
	if (mood < -100) {
		mood = -100;
	}
	for (person of people) {
		person.tick();
	}
	if (mood != 0) {
		change = mood / Math.abs(mood);
		// Increase or decrease the happiness of some random people.
		for (person of people.sort(() => .5 - Math.random()).slice(0, Math.abs(mood))) {
			person.happiness = Math.min(Math.max(person.happiness + change, 0), 100);
		}
	}
	// Your company has some cases of people becoming especially unhappy or landing in an accident
	// Made ridiculously extreme for gameplay purposes
	people[Math.round(99 * Math.random())].happiness -= 2;
	people[Math.round(99 * Math.random())].health -= 2;
	wealth = (money + av_hap + av_hel) / 3;
	time += 1;
	if (money > high) {
		high = money;
		high_time = time;
		console.log("New high score!");
	}
	console.log(`money: ${Math.round(money)}`);
	console.log(`average happiness: ${Math.round(av_hap)}`);
	console.log(`average health: ${Math.round(av_hel)}`);
	console.log(`wealth: ${Math.round(wealth)}`);
	hap_hist = hap_hist.slice(1, 499).concat(av_hap);
	hel_hist = hel_hist.slice(1, 499).concat(av_hel);
	mon_hist = mon_hist.slice(1, 499).concat(money);
	wth_hist = wth_hist.slice(1, 499).concat(wealth);
	updateVisuals();
	if (av_hel == 0 || av_hap < 20 || av_hap > 80 || av_hel > 90 || money < 0) {
		clearInterval(ticker);
		if (av_hel == 0) {
			console.log("Everyone died! You overworked them too much.");
			endGame("Everyone died! You overworked them too much.");
		} else if (av_hap < 20) {
			console.log("Enough people are depressed to overthrow you! You overworked them too much.");
			endGame("Enough people are depressed to overthrow you! You overworked them too much.");
		} else if (av_hap > 80) {
			console.log("People are too happy! They have enough free time on their hands to do other things such as apply to a different job, create a union, or other such unsatisfactory actions.");
			endGame("People are too happy! They have enough free time on their hands to do other things such as apply to a different job, create a union, or other such unsatisfactory actions.");
		} else if (av_hel > 90) {
			console.log("People are too healthy! They have developed such excellent healthy habits that other aspects of their life improve rapidly, such as happiness, which leads to unsatisfactory actions.");
			endGame("People are too healthy! They have developed such excellent healthy habits that other aspects of their life improve rapidly, such as happiness, which leads to unsatisfactory actions.");
		}else {
			console.log("You are too poor to continue!");
			endGame("You are too poor to continue!");
		}
		console.log(`time lasted: ${time}`);
		console.log(`high score: ${Math.round(high)} at time: ${high_time}`);
	}
	if (time % 10 == 0) {
		clearInterval(ticker)
		delay *= .99;
		ticker = setInterval(tick, delay);
	}
}

let delay = 200
ticker = setInterval(tick, delay);
