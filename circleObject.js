class CircleObject {
    constructor(x, y, diameter) {
        this.location = createVector(x, y);
        this.diameter = diameter;
        this.radius = this.diameter/2;
    }

    isIntersecting(otherCircleObject) {
        var d = dist(this.location.x, this.location.y, otherCircleObject.location.x, otherCircleObject.location.y);
        if (d < ((this.diameter + otherCircleObject.diameter)/2)) {
          return true;
        } else {
          return false;
        }
      }
}