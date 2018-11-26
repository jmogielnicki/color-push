class Wall {
    constructor(color, x, y, width, height) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        // this.y = height;

        this.active = true;
        this.hasCollided = false;
    }

    update(speed) {
        this.y = this.y + speed;
        this.y > height ? this.active = false : null;
        this.queueTimer -= 1;
    }

    display() {
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
    }

    isCollidingWith(entity, currentColor) {
        if (currentColor != this.color &&
            this.x < entity.location.x + entity.radius &&
            this.x + this.width > entity.location.x &&
            this.y < entity.location.y + entity.radius &&
            this.y + this.height > entity.location.y) {
                return true;
            }

    }
}
