class Pusher extends CircleObject{
  constructor(x, y, diameter, colorIndex, colorOptions, isColorChanger) {
    super(x, y, diameter);
    this.acceleration = createVector(0, 0);
    this.mass = diameter;
    this.colorIndex = colorIndex;
    this.colorOptions = colorOptions;
    this.G = 10;
    this.isColorChanger = isColorChanger;
    this.numRings = 10;
  }

  display() {
    noStroke();

    for (var i = 0; i < this.numRings; i ++) {
      // start with outer circle, draw inner circles
      fill(this.colorOptions[this.colorIndex].map((color) => { return color + (i * this.numRings) }))
      // stroke(0)
      // strokeWeight(1)
      ellipse(this.location.x, this.location.y, this.diameter - (i * (this.diameter/this.numRings)), this.diameter - (i * (this.diameter/this.numRings))); 
    }
  }
  
  // update() {

  // }


  repulse(opponent) {
    // Direction of the force
    const force = p5.Vector.sub(opponent.location, this.location)
    const d = force.mag();
    if (d > this.diameter/1.5) {
      force.mult(0);
      return force;
    } else {
      // d = constrain(d, 80, 100)
      force.normalize()
      
      // Magnitude of force
      const strength = (this.G * this.mass * opponent.mass) / (800)
      
      // Putting direction and magnitude together
      force.mult(strength)

      return force
    }
  }
}
