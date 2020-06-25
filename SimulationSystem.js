const HEALTH_PLUS = 30;
const HEALTH_MINUS = 40;
const NEW_TARGET_PROB = 0.5;
const NEW_VEHICLE_CONST = 0.1;
const AGING_CONST = 0.07;
const TARGET_THRESHOLD = 50;

let maxgen = 0;
let maxfitness = 0;
class Simulation {


    constructor() {
        this.vehicles = [];
        this.targets = [];
    }

    addVehicles(count) {
        for (let i = 0; i < count; i++) {
            this.vehicles.push(new Vehicle(random(100, width - 100), random(100, height - 100)));
        }
    }

    addTargets(count, typ) {
        for (let i = 0; i < count; i++) {
            this.targets.push(new Target(random(width), random(height), 5, typ));
        }
    }

    reproduceVehicle() {


        for (const vehicle of this.vehicles) {
            let r = random();
            if (r < 1 / this.vehicles.length * NEW_VEHICLE_CONST) {
                let dna = new DNA([
                    vehicle.maxspeed,
                    vehicle.maxforce,
                    vehicle.seekgood,
                    vehicle.seekbad,
                    vehicle.generation + 1,
                ])
                dna.mutation();
                this.vehicles.push(vehicle.copyVec(dna));
            }
        }
    }

    reproduceTarget() {
        let r = random();
        if (r < 0.05 * (10 / this.targets.length)) {
            this.targets.push(new Target(random(width), random(height), 5, 'good'));
        } else if (r < 0.07 * (10 / this.targets.length)) {
            this.targets.push(new Target(random(width), random(height), 5, 'bad'));
        }
    }


    run() {
        for (let i = this.targets.length - 1; i >= 0; i--) {
            let target = this.targets[i];
            target.addBorder();
            target.update();
            target.display();

            let v = null;
            for (let j = this.vehicles.length - 1; j >= 0; j--) {
                let maxf = 0;

                let vehicle = this.vehicles[j];
                if (vehicle.generation > maxgen) {
                    maxgen = vehicle.generation;
                }
                if (vehicle.counter > maxfitness) {
                    maxfitness = vehicle.counter;
                }
                if (vehicle.counter > maxf) {
                    maxf = vehicle.counter;
                    v = vehicle;
                }


                // Kill vechile and put target instead
                if (vehicle.health < 0) {
                    this.vehicles.splice(j, 1);
                    if (random() < 1 / this.targets.length * NEW_TARGET_PROB) {
                        this.targets.push(new Target(vehicle.pos.x, vehicle.pos.y, 5, 'good'));
                    }
                    if (this.targets.length > TARGET_THRESHOLD) {
                        if (random() < this.targets.length * NEW_TARGET_PROB / 10) {
                            this.targets.shift();
                        }
                    }

                }
                vehicle.addBorder();
                // Call the appropriate steering behaviors for our agents
                vehicle.search(target);
                vehicle.update(log(this.vehicles.length) * AGING_CONST);
                vehicle.display(target);

                if (Collision.isCollide(target, vehicle)) {
                    if (target.typ == 'good') {
                        vehicle.health += HEALTH_PLUS;
                        // print("Boom!");
                    } else {
                        vehicle.health -= HEALTH_MINUS;
                        // print("Opps!");
                    }
                    this.targets.splice(i, 1);
                }
            }
            if (v) {
                push()
                noFill();
                stroke('white');
                ellipse(v.pos.x, v.pos.y, 30);
                pop();
                v.displayDNA();
            }


        }
    }

}