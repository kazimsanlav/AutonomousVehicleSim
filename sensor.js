
class Sensor {

    constructor(pos, state = 0, attachOn, dist) {
      this.pos = pos;
      this.state = state;
      this.color;
      this.attachOn = attachOn;
      this.angle;
      this.r = 8;
      this.dist = dist;
    }
    
    light() {
      if (this.state == 0) {
        this.color = 'green';
      } else {
        this.color = 'red';
      }
    }
  
    update() {

      if(Collision.isCollide(this, target)){
        this.state = 1;
      }else{
        this.state = 0;
      }
      this.light();
      let v = p5.Vector.fromAngle(this.attachOn.velocity.heading() + this.angle);
      v.mult(this.dist);
      v.add(this.attachOn.pos);
      this.pos = createVector(v.x, v.y);
      
    }
  
    display() {
      push()
      translate(this.pos.x, this.pos.y);
      stroke(this.color);
      strokeWeight(this.r);
      point(0, 0);
      pop()
    }
  
  }