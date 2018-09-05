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
  
  v = new Vehicle(width / 2, height - 100);
  target = new Target(width / 2, height / 2, 20);
}

function draw() {
  background(51);
  target.update(mouseX, mouseY);

  if (Collision.isCollide(target, v)) {
    print("Boom!");
  }

  // Draw the target
  target.display();

  // Call the appropriate steering behaviors for our agents
  v.seek(target);
  v.update();
  v.display();

  // //deneme
  // //apply this!!!
  // let vec = p5.Vector.fromAngle(v.velocity.heading());
  // vec.mult(50);
  // line(v.pos.x, v.pos.y, v.pos.x + vec.x, v.pos.y + vec.y);
  // //deneme

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}