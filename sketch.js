let font;
let vehicles = [];

function preload() {
  font = loadFont('PARCHM.TTF');
}



/**
 * noise values (noise 3d) are used to animate a bunch of agents.
 *
 * KEYS
 * 1-2                 : switch noise mode
 * space               : new noise seed
 * backspace           : clear screen
 * s                   : save png
 */
'use strict';

var sketch = function(p) {

  var agents = [];
  var agentCount = 4000;
  var noiseScale = 100;
  var noiseStrength = 10;
  var noiseZRange = 0.4;
  var noiseZVelocity = 0.01;
  var overlayAlpha = 10;
  var agentAlpha = 90;
  var strokeWidth = 0.3;
  var drawMode = 1;
  let canvas

  p.setup = function() {
    canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.position(0,0);
    canvas.style('z-index','-1');
    

    
    for (var i = 0; i < agentCount; i++) {
      agents[i] = new Agent(noiseZRange);
    }
  };

  p.draw = function() {
    p.fill(0, overlayAlpha);2
    p.noStroke();
    p.rect(0, 0, p.width, p.height);

    // Draw agents
    p.stroke(255, agentAlpha);
    for (var i = 0; i < agentCount; i++) {
      if (drawMode == 1) {
        agents[i].update1(strokeWidth, noiseScale, noiseStrength, noiseZVelocity);
      } else {
        agents[i].update2(strokeWidth, noiseScale, noiseStrength, noiseZVelocity);
      }
    }
  };

  p.keyReleased = function() {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');
    if (p.key == '1') drawMode = 1;
    if (p.key == '2') drawMode = 2;
    if (p.key == ' ') {
      var newNoiseSeed = p.floor(p.random(10000));
      console.log('newNoiseSeed', newNoiseSeed);
      p.noiseSeed(newNoiseSeed);
    }
    if (p.keyCode == p.DELETE || p.keyCode == p.BACKSPACE) p.background(255);
  };

};

var myp5 = new p5(sketch);



 function setup() {
  createCanvas(windowWidth, windowHeight);



  var points = font.textToPoints('Past', 360, 250, 200, {
    sampleFactor: 0.8
  });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
   
     var points = font.textToPoints('Present', 200, 520, 300, {
    sampleFactor: 0.8
  });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
   
     var points = font.textToPoints('Future', 350, 750, 200, {
    sampleFactor: 0.8
  });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}

function draw() {
  background(0);
  clear();
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}
  
