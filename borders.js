Vehicle.prototype.addBorder = function (border = 'boncyBorders', off = 0) {
    if (border === 'boncyBorders') {
        let offset = this.r + off;
        if (this.pos.x > width - offset) {
            this.pos.x = width - offset;
            this.velocity.x *= -1;
        }
        if (this.pos.x < offset) {
            this.pos.x = offset;
            this.velocity.x *= -1;
        }
        if (this.pos.y > height - offset) {
            this.pos.y = height - offset;
            this.velocity.y *= -1;
        }
        if (this.pos.y < offset) {
            this.pos.y = offset;
            this.velocity.y *= -1;
        }
    };
    if (border === 'fixedBorders') {
        if (this.pos.x > width) {
            this.pos.x = width;
        }
        if (this.pos.x < 0) {
            this.pos.x = 0;
        }
        if (this.pos.y > height) {
            this.pos.y = height;
        }
        if (this.pos.y < 0) {
            this.pos.y = 0;
        }
    };
    if (border === 'continousBorder') {
        if (this.pos.x > width) {
            this.pos.x = this.r;
        }
        if (this.pos.x < this.r) {
            this.pos.x = width-this.r;
        }
        if (this.pos.y > height) {
            this.pos.y = this.r;
        }
        if (this.pos.y < this.r) {
            this.pos.y = height-this.r;
        }
    }

}