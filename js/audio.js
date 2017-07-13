//////////////////////////////////////////////////
// audio.js - Web audio stuff

// ----- Deprecated
// window.AudioContext = window.AudioContext || window.webkitAudioContext;
// var audioContext = new AudioContext();

// function loadSound(url, planetBuffer) {
// 	var request = new XMLHttpRequest();
// 	request.open('GET', url, true);
// 	request.responseType = 'arraybuffer';

// 	// Decode asynchronously
// 	request.onload = function() {
// 		audioContext.decodeAudioData(request.response, function(buffer) {
// 			planetBuffer = buffer;
// 		}, onError);
// 	}
// 	request.send();
// }
// ----- End deprecated

// ----- buffer-loader.js
function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}
// ----- end buffer-loader.js

//window.onload = init;
var audioContext;
var masterGain;
var analyser;
var time_arr;
var bufferLoader;

var star_BUFFER = null;
var b_BUFFER = null;
var c_BUFFER = null;
var d_BUFFER = null;
var e_BUFFER = null;
var f_BUFFER = null;
var g_BUFFER = null;
var h_BUFFER = null;
var bcConj_BUFFER = null;
var cdConj_BUFFER = null;
var deConj_BUFFER = null;
var efConj_BUFFER = null;
var fgConj_BUFFER = null;
var ghConj_BUFFER = null;

//function init() {
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	audioContext = new AudioContext();

	analyser = audioContext.createAnalyser();
	analyser.fftSize = 1024;
	time_arr = new Uint8Array(analyser.frequencyBinCount);

	masterGain = audioContext.createGain();
	masterGain.gain.value = 0.2;
	masterGain.connect(audioContext.destination);
	masterGain.connect(analyser);

	bufferLoader = new BufferLoader(
		audioContext,
		[
			'./sounds/TRAPPIST7.mp3',
			'./sounds/TRAPPIST6.mp3',
			'./sounds/TRAPPIST5.mp3',
			'./sounds/TRAPPIST4.mp3',
			'./sounds/TRAPPIST3.mp3',
			'./sounds/TRAPPIST2.mp3',
			'./sounds/TRAPPIST1.mp3',
			'./sounds/TRAPPISTstar.mp3',
			'./sounds/TRAPPISTdrums12.mp3',
			'./sounds/TRAPPISTdrums23.mp3',
			'./sounds/TRAPPISTdrums34.mp3',
			'./sounds/TRAPPISTdrums45.mp3',
			'./sounds/TRAPPISTdrums56.mp3',
			'./sounds/TRAPPISTdrums67.mp3',
		],
		function(bufferList) {
			h_BUFFER = bufferList[0];
			g_BUFFER = bufferList[1];
			f_BUFFER = bufferList[2];
			e_BUFFER = bufferList[3];
			d_BUFFER = bufferList[4];
			c_BUFFER = bufferList[5];
			b_BUFFER = bufferList[6];
			star_BUFFER = bufferList[7];
			bcConj_BUFFER = bufferList[8];
			cdConj_BUFFER = bufferList[9];
			deConj_BUFFER = bufferList[10];
			efConj_BUFFER = bufferList[11];
			fgConj_BUFFER = bufferList[12];
			ghConj_BUFFER = bufferList[13];
		});
	bufferLoader.load();
//}

function playSound(buffer) {
	var source = audioContext.createBufferSource();
	source.buffer = buffer;
	source.connect(masterGain);
	source.start(0);
}

function updateGain(value) {
	masterGain.gain.value = value;
}
