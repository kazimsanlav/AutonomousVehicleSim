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
            if (r < 0.001) {
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
        if (r < 0.05) {
            this.targets.push(new Target(random(width), random(height), 5, 'good'));
        } else if (r < 0.1) {
            this.targets.push(new Target(random(width), random(height), 5, 'bad'));
        }
    }


    run() {
        for (let i = this.targets.length - 1; i >= 0; i--) {
            let target = this.targets[i];
            target.addBorder();
            target.update();
            target.display();

            for (let j = this.vehicles.length - 1; j >= 0; j--) {
                let vehicle = this.vehicles[j];
                if(vehicle.generation > maxgen){
                    maxgen = vehicle.generation;
                }
                if(vehicle.counter > maxfitness){
                    maxfitness = vehicle.counter;
                }
                

                // Kill vechile and put target instead
                if (vehicle.health < 0) {
                    this.vehicles.splice(j, 1);
                    if (random() < 0.7) {
                        this.targets.push(new Target(vehicle.pos.x, vehicle.pos.y, 5, 'good'));
                    }
                }
                vehicle.addBorder();
                // Call the appropriate steering behaviors for our agents
                vehicle.search(target);
                vehicle.update();
                vehicle.display(target);

                if (Collision.isCollide(target, vehicle)) {
                    if (target.typ == 'good') {
                        vehicle.health += 35;
                        // print("Boom!");
                    } else {
                        vehicle.health -= 20;
                        // print("Opps!");
                    }
                    this.targets.splice(i, 1);
                }
            }
        }
    }

}