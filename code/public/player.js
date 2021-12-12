class Player {
  constructor(x, y) {
    this.actual = createVector(x, y);
    this.shown = createVector(x, y);
    this.speed = {
      x: 0,
      y: 0
    };
    this.acc = {
      x: 0,
      y: 0
    };
    // this.kpr = false;
    this.kpr = {
      h: false,
      v: 0       // v can be -1, 0, or 1
    }
    this.colour = color(168, 94, 50);
    this.width = 300;
    this.height = 100;
    this.alive = true;

    this.name = 'Sorntoz is a noice parsiwn';
  }

  overlaps(plr) {
    if ((abs(plr.shown.x - this.shown.x) < ((this.width/2) + (plr.width/2))) && ((abs(plr.shown.y - this.shown.y) < ((this.height/2) + (plr.height/2))))) {
      return true;
    } else {
      return false;
    }
  }

  show() {
    fill(this.colour);
    rectMode(CENTER);
    strokeWeight(0);
    rect(this.shown.x, this.shown.y, this.width, this.height);
  }

  update(height) {
    // Dealing with x
    this.acc.x = Math.min(this.acc.x, 0.5);
    this.speed.x += this.acc.x;
    this.speed.x -= 0.07;
    this.speed.x = constrain(this.speed.x, 0, 14);
    this.actual.x += this.speed.x;

    // Dealing with y
    if (this.kpr.v == -1) {
      this.speed.x -= 0.07;
    } else if (this.kpr.v == 1) {
      this.speed.x += 0.07;
    }
    // this.acc.y = Math.min(this.acc.y, 0.5);
    // this.acc.y = Math.max(this.acc.y, -0.5);
    this.acc.y = constrain(this.acc.y, -0.5, 0.5);
    this.speed.y += this.acc.y;
    this.speed.y = constrain(this.speed.y, -8, 8);
    this.speed.y /= 1.7;
    this.actual.y += this.speed.y;
    this.actual.y = constrain(this.actual.y, this.height/2, height-(this.height/2));
    this.shown.y = this.actual.y;
  }
}
