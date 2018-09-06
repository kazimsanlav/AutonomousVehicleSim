
let simulation;


function setup() {
  createCanvas(windowWidth, windowHeight);
  simulation = new Simulation();
  simulation.addTargets(10);
  simulation.addTargets(5, 'bad');
  simulation.addVehicles(5);
}

function draw() {
  background(51);
  simulation.run();
 }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}