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
}

function draw() {
  background(0, 255, 255);

  if (frameCount % 100 == 0 && frameCount > 50) {
    let maxX = -Infinity;
    for (let i = 0; i < players.length; i++) {
      maxX = max(maxX, players[i].actual.x);
    }
    objects.push(new Thing(maxX - 50, random(50, height-50), Boolean(Math.round(Math.random())), null));
  }

  for (let i = 0; i < objects.length; i++) {
    objects[i].update();
    objects[i].shown.x = objects[i].actual.x - players[playerI].actual.x + width;
    objects[i].show();
  }

  for (let i = 0; i < players.length; i++) {
    if (players[i].alive) {
      players[i].update(height);
      players[i].show();
    }
  }

  for (let i = 0; i < players.length; i++) {
    let elt = players[i];
    for (let j = i+1; j < players.length; j++) {
      if (elt.overlaps(players[j]) == true) {
        elt.alive = false;
        players[j].alive = false;
      }
    }
    for (let j = objects.length-1; j >= 0; j--) {
      if (elt.overlaps(objects[j]) == true) {
        if (objects[j].good == true) {
          players[i].points += 50;
          objects.splice(j, 1);
        } else {
          players[i].lives -= 1;
          objects.splice(j, 1);
        }
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
