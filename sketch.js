
const colorOptionsAll = {
  primary: [
    [200, 50, 40],
    [40, 100, 200],
    [247,182,10],
  ],
  muted: [
    [236,208,120],
    [83,119,122],
    [84,36,55],
  ],
  pastel: [
    [197,224,220],
    [236,229,206],
    [224,142,121],
  ],
  wine: [
    [140,35,24],
    [242,196,90],
    [94,140,106],
  ]
}
const colorOptions = [[200, 200, 200], ...colorOptionsAll.wine]
let currentPusherColorIndex = 0;
let backGroundColor = [0, 0, 0];

const pushers = [];
const walls = [];
let player;
const screenWidth = 380;
const screenHeight = 600;
const playerDiameter = 20;
let lastPath = [];
let gameIsActive = false;

function incrementColors() {
  currentColorIndex = currentColorIndex + 1 >= colorOptions.length ? 0 : currentColorIndex + 1;
  leftColorIndex = leftColorIndex + 1 >= colorOptions.length ? 0 : leftColorIndex + 1;
  rightColorIndex = rightColorIndex + 1 >= colorOptions.length ? 0 : rightColorIndex + 1;
}

function getNextColorIndex(currentIndex) {
  return currentIndex + 1 >= colorOptions.length ? 0 : currentIndex + 1;
}

function playOrPause() {
  gameIsActive = !gameIsActive;
  if (gameIsActive) {
    lastPath = [];
  }
}

function reset() {
  gameIsActive = false;
  player = new Player(255, playerDiameter);
  backGroundColor = [0, 0, 0];
}

function setup() {
  createCanvas(screenWidth, screenHeight);
  player = new Player(255, 20);
  walls.push(new Wall(colorOptions[1], 30, height/2, width/2, 10))
  walls.push(new Wall(colorOptions[2], 30, height/2, 10, height/2))
  walls.push(new Wall(colorOptions[3], 20 + width/2, 0, 10, height/2))
  walls.push(new Wall(colorOptions[0], width/2, height/2, width/2, 10))
  walls.push(new Wall(colorOptions[0], 0, 100, width/2 + 30, 10))
  walls.push(new Wall(colorOptions[2], width/2 + 30, 100, width/2 - 30, 10))

  button = createButton('submit');
  button.position(10, 10);
  button.mousePressed(playOrPause);
}

function draw() {
  background(backGroundColor.map((colorValue) => { return colorValue }))


  pushers.map((pusher) => {
    pusher.display();
    if (pusher.isIntersecting(player)) {
      player.applyForce(pusher.repulse(player))
      pusher.isColorChanger && gameIsActive && (backGroundColor = pusher.colorOptions[pusher.colorIndex]);
    }
  })

  // player.location.x = mouseX;
  // player.location.y = mouseY;

  walls.map((wall) => {
    wall.display()
    wall.isCollidingWith(player, backGroundColor) && (player.isDead = true);
  })

  gameIsActive && player.update();
  player.display();

  if (player.diameter > 10000 || (player.velocity.mag() < 0.01)) {
    // || (player.velocity.mag() < 0.01)
    reset()
  }

  player.velocity.mag() > 0.1 && lastPath.push({x: player.location.x, y: player.location.y});
  !gameIsActive && lastPath.map((location) => {
    fill(100, 100, 100, 20);
    ellipse(location.x, location.y, playerDiameter, playerDiameter)
  })
}

function mousePressed() {
  let changedColor = false;
  pushers.map((pusher, index) => {
    const d = dist(mouseX, mouseY, pusher.location.x, pusher.location.y);
    if (d < pusher.radius) {
      pusher.colorIndex = getNextColorIndex(pusher.colorIndex);
      pusher.isColorChanger = true;
      changedColor = true;
      pusher.colorIndex == 0 && pushers.splice(index, 1)
    }
  })
  !changedColor && pushers.push(new Pusher(mouseX, mouseY, 60, currentPusherColorIndex, colorOptions, false));
}