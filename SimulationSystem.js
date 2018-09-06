
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
            if (random() < 0.003) {
                this.vehicles.push(vehicle.copyVec());
            }
        }
    }

    run() {
        this.vehicles = this.vehicles.filter(v => v.health > 0);

        for (let target of this.targets) {
            target.addBorder();
            target.update();
            target.display();

            for (let vehicle of this.vehicles) {
                vehicle.addBorder();
                // Call the appropriate steering behaviors for our agents
                vehicle.search(target);
                vehicle.update();
                vehicle.display(target);

                if (Collision.isCollide(target, vehicle)) {
                    if (target.typ == 'good') {
                        print("Boom!");
                    } else {
                        print("Opps!");
                    }
                }
            }
        }
    }

}