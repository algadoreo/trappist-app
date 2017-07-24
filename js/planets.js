//////////////////////////////////////////////////
// planets.js - Planet stuff

const BASE_BPM = 30;						// Use 30 bpm as the basic unit
const BPM_FACTOR = 0.983;					// Conversion of onscreen units to units of 30 bpm

class Planet {
	constructor(show, theta, period, size, distance, color, buffer) {
		this.show = show;					// display planet or not (boolean)
		this.theta = theta;					// initial angle (radians)
		this.period = period;				// period of orbit (cycles/radian)
		this.freq = BPM_FACTOR/period;		// frequency of orbit (radians/cycle)
		this.size = size;					// size of planet (pixels)
		this.distance = distance;			// size of orbit (pixels)
		this.color = color;					// colour of the planet
		this.showTransit = false;			// show the transit or not (boolean)
		this.buffer = buffer;				// sound of the planet (audio buffer)
	}
}

// Create planets
var b = new Planet(false, -2.006, 1.51, 2, 56, 'Red', b_BUFFER);
var c = new Planet(false, 2.582, 2.42, 2, 77, 'Gold', c_BUFFER);
var d = new Planet(false, -0.224, 4.05, 2, 108, 'ForestGreen', d_BUFFER);
var e = new Planet(false, 0.003, 6.10, 2, 142, 'LightSkyBlue', e_BUFFER);
var f = new Planet(false, -0.866, 9.21, 2, 187, 'CornflowerBlue', f_BUFFER);
var g = new Planet(false, 1.290, 12.35, 2, 227, 'Pink', g_BUFFER);
var h = new Planet(false, 0.176, 18.76, 2, 300, 'RebeccaPurple', h_BUFFER);

// Create objects to handle conjunctions
var conj_bc = {dtheta: 2*Math.PI - (b.theta - c.theta), dfreq: b.freq - c.freq, showConj: false, conjBuffer: bcConj_BUFFER};
var conj_cd = {dtheta: 2*Math.PI - (c.theta - d.theta), dfreq: c.freq - d.freq, showConj: false, conjBuffer: cdConj_BUFFER};
var conj_de = {dtheta: 2*Math.PI - (d.theta - e.theta), dfreq: d.freq - e.freq, showConj: false, conjBuffer: deConj_BUFFER};
var conj_ef = {dtheta: 2*Math.PI - (e.theta - f.theta), dfreq: e.freq - f.freq, showConj: false, conjBuffer: efConj_BUFFER};
var conj_fg = {dtheta: 2*Math.PI - (f.theta - g.theta), dfreq: f.freq - g.freq, showConj: false, conjBuffer: fgConj_BUFFER};
var conj_gh = {dtheta: 2*Math.PI - (g.theta - h.theta), dfreq: g.freq - h.freq, showConj: false, conjBuffer: ghConj_BUFFER};

// Create the star
var star = {theta: 0, period: 3.3, freq: BPM_FACTOR/3.3};

// Update the orbital speeds
function updateSpeed(planet_arr, bpm) {
	planet_arr.forEach(function(planet) {
		planet.freq = (bpm/BASE_BPM*BPM_FACTOR)/planet.period;
	});

	conj_bc.dfreq = b.freq - c.freq;
	conj_cd.dfreq = c.freq - d.freq;
	conj_de.dfreq = d.freq - e.freq;
	conj_ef.dfreq = e.freq - f.freq;
	conj_fg.dfreq = f.freq - g.freq;
	conj_gh.dfreq = g.freq - h.freq;
}
