

class Collision {

    static isCollide(obj1, obj2) {
        return (dist(obj1.pos.x, obj1.pos.y, obj2.pos.x,
            obj2.pos.y) < (obj1.r + obj2.r));
    }
}