
let simulation;
let showsensor_switch;
let maxgen_text, maxfitness_text;


function setup() {
  createCanvas(windowWidth, windowHeight-30);
  showsensor_switch = createCheckbox('ShowSensor');
  simulation = new Simulation();
  simulation.addTargets(10);
  simulation.addTargets(7, 'bad');
  simulation.addVehicles(10);
}

function draw() {
  background(51);
  fill('white');
  maxgen_text = text('Max Genration: '+ maxgen, 10, 15);
  maxgen_text = text('Max Fitness: '+ maxfitness, 10, 30);
  simulation.reproduceVehicle();
  simulation.reproduceTarget();
  simulation.run();
 }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}