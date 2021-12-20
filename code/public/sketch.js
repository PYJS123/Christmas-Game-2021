let players = [];
let playerI;
let startX = 200;

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
  drawBG(players[playerI].actual.x, width, height);

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

function drawBG(off, wi, hi) {
  background(0, 255, 255);
  // Mountain
  fill('#4E9393');
  beginShape();
  vertex(0, hi)
  bezierVertex(wi/3, 0, wi/2-100, 0, wi/3*2, 0, wi, hi);
  endShape();

  // Trees
  rectMode(CORNER);
  let w = 100;
  let df = 170;
  let roff = (off % (w+10));
  let roff2 = (off / 2 % (w+10));
  for (let x = -roff2; x - 50 <= width; x += w + 10) {
    fill('#077B5E');
    triangle(x-w/2, height-140-df, x, height-230-df, x+w/2, height-140-df);
    triangle(x-w/2, height-70-df, x, height-160-df, x+w/2, height-70-df);
    fill('#2E4C35');
    rect(x+w/3-w/2, height-70-df, w/3, 70);
  }
  for (let x = -roff; x - 50 <= width; x += w + 10) {
    fill('#086E4E');
    triangle(x, height-140, x+w/2, height-230, x+w, height-140);
    triangle(x, height-70, x+w/2, height-160, x+w, height-70);
    fill('#333A21');
    rect(x+w/3, height-70, w/3, 70);
  }
}
