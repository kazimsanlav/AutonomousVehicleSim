class Target {

    constructor(x, y, r) {
        this.pos = createVector(x, y);
        this.r = r;
    }

    display() {
        fill(100);
        stroke(255);
        strokeWeight(2);
        push()
        translate(this.pos.x, this.pos.y);
        ellipse(0, 0, 2 * this.r);
        pop()
    }

    update(x, y) {
        this.pos = createVector(x, y);
    }


}