class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 0;
    this.acc = 0;
    this.kpr = false;
  }

  show() {
    fill(168, 94, 50);
    rectMode(CENTER);
    strokeWeight(0);
    rect(this.x, this.y, 300, 120);
  }

  update() {
    this.acc = Math.min(this.acc, 0.5);
    this.speed += this.acc;
    this.speed -= 0.2*this.acc;
    this.speed = Math.min(this.speed, 17);
    this.speed = Math.max(this.speed, 0);
    this.x += this.speed;
  }
}
