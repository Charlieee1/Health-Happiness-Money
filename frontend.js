adjectives = ["Spicy", "Itchy", "Deep", "Orange", "Shy", "Enough", "Eager", "Tinkling", "Nervous", "Beautiful", "Purring", "Loose", "Purple", "Wet", "Red", "Dazzling", "Savory", "Powerful", "Fast", "Shaggy", "Lazy", "Cold", "Miniature", "Modern", "Unsightly", "Unimportant", "High", "Quick", "Panicky", "Cuddly", "Puny", "Prehistoric", "Dirty", "Gentle", "Attractive", "Wonderful", "Big", "Careful", "Mushy", "Echoing", "Steep", "Flabby", "Hallowed", "Lively", "Tiny", "Future", "Scary", "Bald", "Stale", "Some", "Clever", "Straight", "Acidic", "Abundant", "Round", "Small", "Hissing", "Fat", "Scrawny", "Aggressive", "Wide", "Early", "Fierce", "Victorious", "Raspy", "Tart", "Odd", "Limited", "Most", "Wooden", "Flat", "Happy", "Prickly", "Sharp", "Plump", "Tasteless", "Shrilling", "Sparse", "Large", "Tight", "Full", "White", "Rapid", "Bumpy", "Poor", "Colossal", "Yummy", "Angry", "Ambitious", "Nice", "Rotten", "Agreeable", "Hot", "Spoiled", "Shapely", "Deafening", "Noisy", "Gigantic", "Gray", "Defeated", "Famous", "Melodic", "Scruffy", "Salmon", "Teeny", "Dry", "Great", "Witty", "Few", "Mealy", "Rhythmic", "Fancy", "Magnificent", "Inexpensive", "Freezing", "Sticky", "Juicy", "Many", "Plain", "Quiet", "Clean", "Calm", "Ashy", "Polite", "Millions", "Mammoth", "Fit", "Rich", "Vast", "Disgusting", "Sweet", "Breezy", "Immense", "Green", "Thundering", "Easy", "Crashing", "Nutty", "Short", "Faint", "Obnoxious", "Numerous", "Uninterested", "Slow", "Blue", "Kind", "Square", "Chilly", "Muscular", "Silly", "Hollow", "Bewildered", "Skinny", "Wrong", "Massive", "Tall", "Microscopic", "Loud", "Stocky", "Tasty", "Elegant", "Helpless", "Damaged", "Slimy", "Glamorous", "Shallow", "Whining", "Old", "Putrid", "Wailing", "Salty", "Melted", "Handsome", "Squeaking", "Brave", "Black", "Obedient", "Flaky", "Uneven", "Screeching", "Little", "Weak", "Thoughtless", "Late", "Clumsy", "Fresh", "Alive", "Ancient", "Greasy", "Rough", "Better", "Zealous", "Delightful", "Embarrassed", "Ugly", "Gifted", "Thankful", "Strong", "Faithful", "Young", "Delicious", "Unkempt", "Rapping", "Brief", "Mango", "Gorgeous", "Harsh", "Cool", "Whispering", "Grumpy", "Broad", "Creamy", "Scarce", "Proud", "Moldy", "Crooked", "Old-fashioned", "Helpful", "Narrow", "Warm", "Substantial", "Howling", "Nutritious", "Important", "Bitter", "Low", "Drab", "Dead", "Curved", "Mysterious", "Lemon", "Refined", "Tender", "Pitiful", "Damp", "Petite", "Icy", "Huge", "Tangy", "Sour", "Ripe", "Jealous", "Incalculable", "Long", "Fluffy", "Repulsive", "Chubby", "Rancid", "Quaint", "Worried", "Swift", "Jolly", "Uptight", "Yellow", "Thousands"];
nouns = ["ants", "bats", "bears", "bees", "birds", "buffaloes", "cats", "chickens", "cattle", "dogs", "dolphins", "ducks", "elephants", "fish", "foxes", "frogs", "geese", "goats", "horses", "kangaroos", "lions", "monkeys", "owls", "oxen", "penguins", "people", "pigs", "rabbits", "sheep", "tigers", "whales", "wolves", "zebras"];
document.getElementById("company-name").innerHTML = adjectives[Math.round(Math.random() * (adjectives.length - 1))] + " " + nouns[Math.round(Math.random() * (nouns.length - 1))];

let meter_height = 100;
let unit_vertical = meter_height / 100;
let meter_width = 1;
let graph_height = 100;
let graph_width = 500;
let unit_horizontal = graph_width / 500;

let health_meter = document.getElementById("average-health").getContext("2d");
let health_graph = document.getElementById("health-graph").getContext("2d");
let happiness_meter = document.getElementById("average-happiness").getContext("2d");
let happiness_graph = document.getElementById("happiness-graph").getContext("2d");
let money_meter_raw = document.getElementById("money-meter");
let money_meter = money_meter_raw.getContext("2d");
let money_graph_raw = document.getElementById("money-graph");
let money_graph = money_graph_raw.getContext("2d");

let high_score = document.getElementById("high-score");
let time_elapsed = document.getElementById("time");
let dead_count = document.getElementById("dead");

function resetctx(ctx, w, h) {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
}

function drawDanger(ctx, y1, y2, w) {
	ctx.fillStyle = "rgba(255, 0, 0, .5)";
	ctx.fillRect(0, y1, w, y2);
}

function line(ctx, x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function colouredLine(ctx, x1, y1, x2, y2, c) {
	ctx.strokeStyle = c;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function updateHealthVisuals() {
	// Health meter
	resetctx(health_meter, meter_width, meter_height);
	drawDanger(health_meter, 0, 10 * unit_vertical, meter_width);
	drawDanger(health_meter, 70 * unit_vertical, meter_height, meter_width);
	let level = unit_vertical * (100 - av_hel);
	colouredLine(health_meter, 0, level, meter_width, level, "black");
	level = unit_vertical * (100 - min_hel);
	colouredLine(health_meter, 0, level, meter_width, level, "orange");
	
	// Health graph
	resetctx(health_graph, graph_width, graph_height);
	drawDanger(health_graph, 0, 10 * unit_vertical, graph_width);
	drawDanger(health_graph, 70 * unit_vertical, meter_height, graph_width);
	colouredLine(health_graph, 0, level, graph_width, level, "orange");
	health_graph.strokeStyle = "black";
	for (let i = 0; i < 499; i++) {
		line(health_graph, i, 100 - hel_hist[i], i + 1, 100 - hel_hist[i + 1]);
	}
}

let working_threshold_slider = document.getElementById("working-threshold");
working_threshold_slider.value = working_threshold;
working_threshold_slider.oninput = function() {
	working_threshold = this.value;
}

function updateHappinessVisuals() {
	// Happiness meter
	resetctx(happiness_meter, meter_width, meter_height);
	drawDanger(happiness_meter, 0, 20 * unit_vertical, meter_width);
	drawDanger(happiness_meter, 80 * unit_vertical, meter_height, meter_width);
	let level = unit_vertical * (100 - av_hap);
	colouredLine(happiness_meter, 0, level, meter_width, level, "black");
	level = unit_vertical * (100 - min_hap);
	colouredLine(happiness_meter, 0, level, meter_width, level, "orange");
	
	// Happiness graph
	resetctx(happiness_graph, graph_width, graph_height);
	drawDanger(happiness_graph, 0, 20 * unit_vertical, graph_width);
	drawDanger(happiness_graph, 80 * unit_vertical, meter_height, graph_width);
	colouredLine(happiness_graph, 0, level, graph_width, level, "orange");
	happiness_graph.strokeStyle = "black";
	for (let i = 0; i < 499; i++) {
		line(happiness_graph, i, 100 - hap_hist[i], i + 1, 100 - hap_hist[i + 1]);
	}
}

function updateMoneyVisuals() {
	let max = Math.max(...[100].concat(mon_hist));
	let unit_vertical = max / 100;
	money_meter_raw.height = max;
	money_graph_raw.height = max;
	
	// Money meter
	resetctx(money_meter, meter_width, max);
	let level = unit_vertical * (max - money);
	line(money_meter, 0, level, meter_width, level);
	
	// Money graph
	resetctx(money_graph, graph_width, max);
	for (let i = 0; i < 499; i++) {
		line(money_graph, i, unit_vertical * (max - mon_hist[i]), i + 1, unit_vertical * (max - mon_hist[i + 1]));
	}
}

function updateVisuals() {
	updateHealthVisuals();
	updateHappinessVisuals();
	updateMoneyVisuals();
	high_score.innerHTML = "High Score: " + Math.round(high);
	time_elapsed.innerHTML = "Time elapsed: " + time;
	dead_count.innerHTML = "Dead: " + ded;
}
updateVisuals();

function endGame(message) {
	alert(message);
}
