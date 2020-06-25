const NUMBER_OF_VEHICLES = 10;
let simulation;
let showsensor_switch;
let maxgen_text, maxfitness_text;


function setup() {
  createCanvas(windowWidth, windowHeight - 30);
  showsensor_switch = createCheckbox('ShowSensor');
  simulation = new Simulation();
  simulation.addTargets(10);
  simulation.addTargets(7, 'bad');
  simulation.addVehicles(NUMBER_OF_VEHICLES);
}

function draw() {
  if (simulation.vehicles.length === 0) {
    simulation.addVehicles(NUMBER_OF_VEHICLES);
    maxgen = 0;
    maxfitness = 0;
  }

  background(51);
  fill('white');
  simulation.reproduceVehicle();
  simulation.reproduceTarget();
  simulation.run();
  fill(255);
  num_of_vehicles_text = text('# of Vehicles: ' + simulation.vehicles.length, 10, 15);
  maxgen_text = text('Max Genration: ' + maxgen, 10, 30);
  maxfitness_text = text('Max Fitness: ' + maxfitness, 10, 45);
  text('FrameRate: ' + floor(frameRate()), 10, 60);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}