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

function updateHealthVisuals() {
	// Health meter
	resetctx(health_meter, meter_width, meter_height);
	drawDanger(health_meter, 0, 10 * unit_vertical, meter_width);
	drawDanger(health_meter, 70 * unit_vertical, meter_height, meter_width);
	let level = unit_vertical * (100 - av_hel);
	line(health_meter, 0, level, meter_width, level);
	
	// Health graph
	resetctx(health_graph, graph_width, graph_height);
	drawDanger(health_graph, 0, 10 * unit_vertical, graph_width);
	drawDanger(health_graph, 70 * unit_vertical, meter_height, graph_width);
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
	line(happiness_meter, 0, level, meter_width, level);
	
	// Happiness graph
	resetctx(happiness_graph, graph_width, graph_height);
	drawDanger(happiness_graph, 0, 20 * unit_vertical, graph_width);
	drawDanger(happiness_graph, 80 * unit_vertical, meter_height, graph_width);
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
}
updateVisuals();

function endGame(message) {
	alert(message);
}
