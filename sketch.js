
let simulation;
let showsensor_switch;


function setup() {
  createCanvas(windowWidth, windowHeight-30);
  showsensor_switch = createCheckbox('ShowSensor');
  simulation = new Simulation();
  simulation.addTargets(10);
  simulation.addTargets(10, 'bad');
  simulation.addVehicles(3);
}

function draw() {
  background(51);
  simulation.reproduceVehicle();
  simulation.reproduceTarget();
  simulation.run();
 }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}