// The "Vehicle" class
class Vehicle {

  constructor(x, y, dna = null) {

    if(dna){
      this.maxspeed = dna.gene[0];
      this.maxforce = dna.gene[1];
      this.seekgood = dna.gene[2];
      this.seekbad  = dna.gene[3];
      this.generation = dna.gene[4];
    }else{
      this.maxspeed = random(0.01,1); //0.2;
      this.maxforce = random(0.01,1); //0.05;
      this.seekgood = random(-2,2);
      this.seekbad = random(-2,2);
      this.generation = 1;
    }
    this.counter = 0;
    this.velocity = p5.Vector.random2D();
    this.obj_type = 'vehicle';
    this.acceleration = createVector(0, 0);
    this.pos = createVector(x, y);
    this.r = 6;
    this.health = 255;
    this.sensors = this.assingSensors(100);
  }

  assingSensors(dist , ang = 3, freq = 21) {
    let sensors = [];
    // let ang = 3;

    for (let i = -PI / ang; i < PI / ang; i += PI / freq) {
      //Outhest loop
      let v3 = p5.Vector.fromAngle(this.velocity.heading() + i);
      v3.mult(1.5 * dist);
      v3.add(this.pos);
      point(v3.x, v3.y);

      let s3 = new Sensor(createVector(v3.x, v3.y), 0, this, 1.5 * dist);
      s3.angle = i;
      sensors.push(s3);
      //Outher loop
      let v = p5.Vector.fromAngle(this.velocity.heading() + i);
      v.mult(dist);
      v.add(this.pos);
      point(v.x, v.y);

      let s = new Sensor(createVector(v.x, v.y), 0, this, dist);
      s.angle = i;
      sensors.push(s);
      // Inner loop
      let v2 = p5.Vector.fromAngle(this.velocity.heading() + i);
      v2.mult(dist / 2);
      v2.add(this.pos);
      point(v2.x, v2.y);

      let s2 = new Sensor(createVector(v2.x, v2.y), 0, this, dist / 2);
      s2.angle = i;
      sensors.push(s2);
    }

    return sensors;
  }

  // Method to update location
  update() {
    constrain(this.maxforce, 0, 1);
    constrain(this.maxspeed, 0, 1);

    // Counter increase
    this.counter ++;
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.pos.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
    // Slowdown in time
    // this.velocity.mult(0.98);

    // Die slowly
    this.health -= 0.1;
    // constrain(this.health, 0 , 255);
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY

  search(target) {
    let found = false;
    for (let sensor of this.sensors) {
      if (sensor.state == 1) {
        found = true;
        if (target.typ == 'good') {
          let seekforce = this.seek(sensor);
          seekforce.mult(this.seekgood);
          this.applyForce(seekforce);
        }else{
          let seekforce = this.seek(sensor);
          seekforce.mult(this.seekbad);
          this.applyForce(seekforce);
        }
      }
    }
    if (!found) {
      // this.move(PI/3, random(0.1));
    }
  }


  seek(target) {
    // A vector pointing from the location to the target
    var desired = p5.Vector.sub(target.pos, this.pos);

    // Scale to maximum speed
    desired.setMag(this.maxspeed);

    // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.add(target.velocity); // Arrive Motion
    steer.limit(this.maxforce); // Limit to maximum steering force

    return steer;
    // this.applyForce(steer);
  }

  display(target) {

    // Draw a triangle rotated in the direction of velocity
    var theta = this.velocity.heading() + PI / 2;

    let clr = lerpColor(color(255, 0, 0), color(0, 255, 0), this.health / 255);
    fill(clr);
    // stroke(200);
    // strokeWeight(2);

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
    this.showSensors(target);
  }

  showSensors(target) {
    for (let s of this.sensors) {
      s.update(target);
      if (showsensor_switch.checked()) {
        s.display();
      }
    }
  }

  move(direction, force) {
    let dir = p5.Vector.fromAngle(direction);
    dir.mult(force);
    this.applyForce(dir);
  }

  copyVec(dna) {
    return new Vehicle(this.pos.x, this.pos.y, dna);
  }

}