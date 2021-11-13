class Thing {
  constructor(x, y, good, img) {
    this.good = good;
    this.img = img;
    this.x = x;
    this.y = y;
  }

  show() {
    // Use this.img
    if (this.good) {
      fill(255);
      rect(this.x, this.y, 50, 50);
    } else {
      fill(0);
      rect(this.x, this.y, 50, 50);
    }
  }

  update() {
    this.x -= 7;
  }
}
