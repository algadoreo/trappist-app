//////////////////////////////////////////////////
// subroutines.js

function makeCircle(x, y, r, color) {
	drawContext.fillStyle = color;
	drawContext.beginPath();
	drawContext.arc(x, y, r, 0, 2*Math.PI, true);
	drawContext.closePath();
	drawContext.fill();
}

function updatePlanet(planet) {
	planet.theta += planet.freq;
	if (planet.theta >= 2*Math.PI) {
		planet.theta -= 2*Math.PI;
		if (planet.showTransit) {
			playSound(planet.buffer);
			drawPlanetBlip(planet);
		}
	}
	if (planet.show) drawPlanet(planet);
}

function drawPlanet(planet) {
	var x = planet.distance * Math.cos(planet.theta);
	var y = planet.distance * Math.sin(-planet.theta);

	makeCircle(x, y, planet.size, planet.color);
	drawOrbitTrail(planet.distance, planet.color, planet.theta);
}

function drawPlanetBlip(planet) {
	makeCircle(planet.distance, 0, planet.size + 3, planet.color);
}

function drawOrbitTrail(r, color, theta) {
	drawContext.beginPath();
	drawContext.arc(0, 0, r, -theta, -theta + Math.PI/3);
	drawContext.strokeStyle = color;
	drawContext.stroke();
}

function checkConjunction(planet1, planet2, conj_obj) {
	conj_obj.dtheta -= conj_obj.dfreq;
	if (conj_obj.dtheta <= 0) {
		conj_obj.dtheta += 2*Math.PI;
		if (conj_obj.showConj) {
			playSound(conj_obj.conjBuffer);
			drawConjunction(planet2);
		}
	}
}

function drawConjunction(planet) {
	drawContext.save();
	drawContext.fillStyle = planet.color;
	drawContext.rotate(-planet.theta);
	drawContext.fillRect(0, 0, planet.distance+10, 5);
	drawContext.restore();
}

function toggleTransit(planet, conj_obj1, conj_obj2, button_id) {
	planet.showTransit = !planet.showTransit;
	(!planet.show || conj_obj1.showConj || conj_obj2.showConj) ? planet.show = true : planet.show = false;

	var button = document.getElementById(button_id);
	button.classList.toggle("activated");
	button.classList.toggle("deactivated");
}

function toggleConjunc(planet_num, button_id) {
	var planet_arr = [{show: false}, b, c, d, e, f, g, h, {show:false}];
	var conj_arr = [{showConj: false}, conj_bc, conj_cd, conj_de, conj_ef, conj_fg, conj_gh, {showConj: false}];

	var planet1 = planet_arr[planet_num];
	var planet2 = planet_arr[planet_num+1];
	var conj_objIn = conj_arr[planet_num-1];
	var conj_obj = conj_arr[planet_num];
	var conj_objOut = conj_arr[planet_num+1];

	conj_obj.showConj = !conj_obj.showConj;
	if (!planet1.show || !planet2.show) {
		planet1.show = true;
		planet2.show = true;
	} else {
		if (!planet1.showTransit && !conj_objIn.showConj) planet1.show = false;
		if (!planet2.showTransit && !conj_objOut.showConj) planet2.show = false;
	}

	var button = document.getElementById(button_id);
	button.classList.toggle("activated");
	button.classList.toggle("deactivated");
}

