let players = [];

function setup() {
  createCanvas(windowWidth, windowHeight-5);
  for (let i = 0; i < 5; i++) {
    players.push(new Player(200, ((height/5)*i)+(height/10)));
  }
}

function draw() {
  background(0, 255, 255);
  for (let i = 0; i < players.length; i++) {
    players[i].update();
    players[i].show();
  }

  if (keyIsPressed) {
    players[0].kpr = true;
  } else {
    players[0].kpr = false;
  }

  for (let i = 0; i < players.length; i++) {
    if (players[i].kpr) {
      players[i].acc += 0.04;
    } else {
      players[i].acc = 0;
    }
  }
}
