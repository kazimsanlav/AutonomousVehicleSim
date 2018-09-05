// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Seeking "vehicle" follows the mouse position

// Implements Craig Reynold's autonomous steering behaviors
// One vehicle "seeks"
// See: http://www.red3d.com/cwr/

let v, target;


function setup() {
  createCanvas(windowWidth, windowHeight);

  v = new Vehicle(width / 2, height / 2);
  target = new Target(width / 2, height / 2, 30);
}

function draw() {
  background(51);

  // Add Borders
  v.addBorder();
  target.addBorder();

  target.update(mouseX, mouseY);

  if (Collision.isCollide(target, v)) {
    print("Boom!");
  }

  // Draw the target
  target.display();

  // Call the appropriate steering behaviors for our agents
  v.search(target);
  v.update();
  v.display();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}