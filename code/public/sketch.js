let players = [];
let playerI;
let startX = 200;
let objects = [];

function setup() {
  createCanvas(windowWidth, windowHeight-5);

  // Players
  for (let i = 0; i < 5; i++) {
    players.push(new Player(startX, ((height/5)*i)+(height/10)));
  }
  playerI = floor(random(players.length));
  players[playerI].colour = color(50, 168, 82);

  // Objects
  for (let i = 0; i < objects.length; i++) {
    objects.push
  }
}

function draw() {
  background(0, 255, 255);
  for (let i = 0; i < players.length; i++) {
    if (players[i].alive) {
      players[i].update(height);
      players[i].show();
    }
  }

  for (let i = 0; i < players.length; i++) {
    let elt = players[i]
    for (let j = i+1; j < players.length; j++) {
      if (elt.overlaps(players[j]) == true) {
        elt.alive = false;
        players[j].alive = false;
      }
    }
  }

  if (keyIsPressed) {
    if (key.toUpperCase() === 'D' || keyCode === RIGHT_ARROW) {
      players[playerI].kpr.h = true;
    } else {
      players[playerI].kpr.h = false;
    }
    if (key.toUpperCase() === 'W' || keyCode === UP_ARROW) {
      players[playerI].kpr.v = -1;
    }
    if (key.toUpperCase() === 'S' || keyCode === DOWN_ARROW) {
      players[playerI].kpr.v = 1;
    }
    if (key.toUpperCase() !== 'W' && key.toUpperCase() !== 'S' && keyCode !== DOWN_ARROW && keyCode !== UP_ARROW) {
      players[playerI].kpr.v = 0;
    }
  } else {
    players[playerI].kpr.h = false;
    players[playerI].kpr.v = 0;
  }
  for (let i = 0; i < players.length; i++) {
    if (i == playerI) {
      continue;
    }
    players[i].kpr.h = Boolean(round(random(1)+0.25));
    // players[i].kpr.v = round(random(-0.8, 0.8));
  }

  for (let i = 0; i < players.length; i++) {
    if (players[i].kpr.h) {
      players[i].acc.x += 0.04;
    } else {
      players[i].acc.x = 0;
    }
    players[i].acc.y += 0.04*players[i].kpr.v;
  }
  for (let i = 0; i < players.length; i++) {
    let curr = players[i];
    curr.shown.x = curr.actual.x - players[playerI].actual.x + startX;
  }
}
