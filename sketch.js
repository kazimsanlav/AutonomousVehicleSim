
let simulation;


function setup() {
  createCanvas(windowWidth, windowHeight);
  simulation = new Simulation();
  simulation.addTargets(1);
  simulation.addVehicles(3);
}

function draw() {
  background(51);
  simulation.run();
 }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}