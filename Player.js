class Player {
  constructor(color, diameter) {
    this.color = color
    this.diameter = diameter;
    this.radius = this.diameter/2;
    this.location = createVector(width/2,height - 100);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.strokeWeight = 0;
    this.mass = 10;
    this.c = 0.2;
    this.isDead = false;
  }


  display() {
    noStroke;
    strokeWeight(0);
    fill(this.color);
    ellipse(this.location.x, this.location.y, this.diameter, this.diameter);
  }

  update() {
    this.applyForce(this.calculateDrag())
    this.location.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);

    if (this.location.x + this.radius > width) {
      this.bounceLeft()
    } else if (this.location.x - this.radius < 1) {
      this.bounceRight()
    } else if (this.location.y + this.radius > height) {
      this.bounceUp()
    } else if (this.location.y - this.radius < 1) {
      this.bounceDown()
    }
    console.log(player.isDead);
    player.isDead && (this.diameter *= 1.1)
  }

  // Calculate drag force
  calculateDrag() {
  // Magnitude is coefficient * speed squared
  const speed = this.velocity.mag();
  console.log(this.velocity.mag())
  var dragMagnitude = this.c * speed;

  // Direction is inverse of velocity
  var dragForce = this.velocity.copy();
  dragForce.mult(-1);
  
  // Scale according to magnitude
  // dragForce.setMag(dragMagnitude);
  dragForce.normalize();
  dragForce.mult(dragMagnitude);
  return dragForce;
  };

  bounceLeft() {
    this.velocity.x = Math.abs(this.velocity.x) * -1;
  }

  bounceRight() {
    this.velocity.x = Math.abs(this.velocity.x)
  }

  bounceUp() {
    this.velocity.y = Math.abs(this.velocity.y) * -1;
  }

  bounceDown() {
    this.velocity.y = Math.abs(this.velocity.y);
  }
  

  // Newton's 2nd law
  applyForce(force) {
    const f = force.copy()
    f.div(this.mass)
    this.acceleration.add(f)
  }


}