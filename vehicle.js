// The "Vehicle" class

class Vehicle {
  constructor(x, y) {
    this.obj_type = 'vehicle';
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -0.001);
    this.pos = createVector(x, y);
    this.r = 6;
    this.maxspeed = 5;
    this.maxforce = 0.1;
    this.sensors = this.assingSensors(100);
  }

  assingSensors(dist) {
    let sensors = [];
    let ang = 1;

    for (let i = -PI / ang; i < PI / ang; i += PI / 8) {
      let v = p5.Vector.fromAngle(this.velocity.heading() + i);
      v.mult(dist);
      v.add(this.pos);
      point(v.x, v.y);

      let s = new Sensor(createVector(v.x, v.y), 0, this, dist);
      s.angle = i;
      sensors.push(s);
    }

    return sensors;
  }

  // Method to update location
  update() {

    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.pos.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
    // Slowdown in time
    this.velocity.mult(0.98);
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY

  search(target) {
    for (let sensor of this.sensors) {
      if (sensor.state == 1){
        this.seek(sensor);
        // this.seek(target);

      }
    }
  }

  seek(target) {
    // A vector pointing from the location to the target
    var desired = p5.Vector.sub(target.pos, this.pos);

    // Scale to maximum speed
    desired.setMag(this.maxspeed);

    // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    this.applyForce(steer);
  }

  display() {

    // Draw a triangle rotated in the direction of velocity
    var theta = this.velocity.heading() + PI / 2;
    fill(127);
    stroke(200);
    strokeWeight(2);

    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();

    //Also show attached sensors 
    this.showSensors();
  }

  showSensors() {
    for (let s of this.sensors) {
      s.update();
      s.display();
    }
  }
}

