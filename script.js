class Person {
	constructor() {
		this.health = 80;
		this.happiness = 70;
		this.isWorking = true;
		this.alive = true;
	}

	tick() {
		if (!this.alive) return;
		if (this.isWorking) {
			// The happier a person, the more income they generate
			money += .0075 * this.happiness + .25 + (.1 * Math.random() - .05)
			this.health -= 1;
			if (this.health >= 70 && this.happiness < 100 && this.happiness > 20) {
				this.happiness += 1;
			} else if ((this.health <= 60 || this.happiness < 20) && this.happiness > 0) {
				this.happiness -= 1;
			}
			if (this.health == 0) {
				this.alive = false;
				return
			}
			if (this.health < working_threshold) {
				this.isWorking = false;
			}
		} else {
			if (this.health < 100 && this.health > 50 && this.happiness > 20) {
				this.health += 1;
			} else {
				this.health -= 1;
			}
			if (this.happiness > 0 && (this.health < 80 || this.health == 100)) {
				// People are generally not very happy when they're sick
				this.happiness -= 1;
			}
			if (this.health == working_threshold + back_to_work_threshold) {
				this.isWorking = true;
			}
		}
		av_hap += this.happiness / 100;
		av_hel += this.health / 100;
	}
}

var money = 50;
var av_hap = 70;
var av_hel = 100;
var working_threshold = 70;
var back_to_work_threshold = 10;
let wealth = money + av_hap + av_hel;
let people = [];
for (let i = 0; i < 100; i++) {
	people.push(new Person());
}
let time = 0;
let high = money;
let high_time = time;
let hap_hist = [av_hap];
let hel_hist = [av_hel];
let mon_hist = [money];
let wth_hist = [wealth];
let mood = 0;

function usePropaganda() {
	mood += 40;
	if (mood > 100) {
		mood = 100;
	}
}

function healPeople() {
	for (person of people) {
		if (person.health < 30) {
			money -= 40 - person.health;
			person.health = 40;
		}
	}
}

function cureDepression() {
	for (person of people) {
		if (person.happiness < 20) {
			money -= 30 - person.happiness;
			person.happiness = 30;
		}
	}
}

function tick() {
	money -= 20;
	av_hap = 0;
	av_hel = 0;
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
			person.happiness += change;
		}
	}
	// Your company is generally horrible to work at
	// Because you feel the need to yell at a random employee everyday
	people[Math.round(99 * Math.random())].happiness -= 5;
	// You also like to beat up a random person, even though it hurts company profits
	people[Math.round(99 * Math.random())].health -= 20;
	wealth = money + av_hap + av_hel;
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
	hap_hist.push(av_hap);
	hel_hist.push(av_hel);
	mon_hist.push(money);
	wth_hist.push(wealth);
	if (av_hel == 0 || av_hap < 20 || av_hap > 80 || money < 0) {
		clearInterval(ticker);
		if (av_hel == 0) {
			console.log("Everyone died! You overworked them too much.");
		} else if (av_hap < 20) {
			console.log("Enough people are depressed to overthrow you! You overworked them too much.");
		} else if (av_hap > 80) {
			console.log("People are too happy! They have enough free time on their hands to do other things such as apply to a different job, create a union, or other such unsatisfactory actions.");
		} else {
			console.log("You are too poor to continue!");
		}
		console.log(`time lasted: ${time}`);
		console.log(`high score: ${Math.round(high)} at time: ${high_time}`);
	}
}

ticker = setInterval(tick, 10);
