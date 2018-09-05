class Target extends Vehicle {

    constructor(x, y, r) {
        super(x, y);
        this.obj_type = 'target';
        this.r = r;
    }

    display() {
        this.noisyMove();
        fill(100);
        stroke(255);
        strokeWeight(2);
        push()
        translate(this.pos.x, this.pos.y);
        ellipse(0, 0, 2 * this.r);
        pop()
    }

    update(x, y) {
        // this.pos = createVector(x, y);
        super.update();
        this.velocity.limit(this.maxspeed/2);

    }

    noisyMove() {
        let k = frameCount / 100;
        let magn = 2;

        let force = [createVector(map(noise(k), 0, 1, -magn, magn),
            map(noise(k + 1000), 0, 1, -magn, magn))];

        this.applyForce(force[0], force[1]);
    }


}