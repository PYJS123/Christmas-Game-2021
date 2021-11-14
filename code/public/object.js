class Thing {
  constructor(x, y, good, img) {
    this.good = good;
    this.img = img;
    this.actual = createVector(x, y);
    this.shown = createVector(null, y);
    this.size = 50;
    this.sinLVL = 0;
  }

  show() {
    // Use this.img
    if (this.good) {
      fill(255);
    } else {
      fill(0);
    }
    rect(this.shown.x, this.shown.y, this.size, this.size);
  }

  update() {
    this.sinLVL += 0.1;
    this.size = (sin(this.sinLVL) * 20) + 50;
  }
}
