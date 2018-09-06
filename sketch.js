// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Seeking "vehicle" follows the mouse position

// Implements Craig Reynold's autonomous steering behaviors
// One vehicle "seeks"
// See: http://www.red3d.com/cwr/

// let v, target;
let simulation;


function setup() {
  createCanvas(windowWidth, windowHeight);
  simulation = new Simulation();
  simulation.addTargets(1);
  simulation.addVehicles(1);
}

function draw() {
  background(51);
  simulation.run();
 }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}