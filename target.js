class Target extends Vehicle {

    constructor(x, y, r, typ = 'good') {
        super(x, y);
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0, 0);
        this.obj_type = 'target';
        this.typ = typ
        this.r = r;
        this.clr = (this.typ == 'good') ? color('green') : color('red');
        this.maxspeed = 3;
        this.noiseseed = random(10000);
    }

    display() {
        // this.noisyMove();
        fill(this.clr);
        // stroke(255);
        // strokeWeight(2);
        noStroke();
        push()
        translate(this.pos.x, this.pos.y);
        ellipse(0, 0, 2 * this.r);
        pop()
    }

    update(x, y) {
        // this.pos = createVector(x, y);
        super.update();
        this.velocity.limit(this.maxspeed);

    }

    noisyMove() {
        let k = frameCount / 100;
        let magn = 2;

        let force = [createVector(map(noise(k), 0, 1, -magn, magn),
            map(noise(k + this.noiseseed), 0, 1, -magn, magn))];

        this.applyForce(force[0], force[1]);
    }


}