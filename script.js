const canvas = document.getElementById("pacman");
const ctx = canvas.getContext("2d");
const score = document.getElementById("score");
const introAudio = document.getElementById("intro");
introAudio.loop = false;
introAudio.volume = 0.1;

let gameRunning = false;
let gameStarted = false;
let youLose = false;

//Audio

function playIntro() {
  try { introAudio.currentTime = 0; } catch(e){}
  const p = introAudio.play();
  if (p !== undefined) p.catch(()=>{/* ignore */});
}
function stopIntro() {
  try { introAudio.pause(); introAudio.currentTime = 0; } catch(e){}
}
document.addEventListener("keydown", (event) => {
  if (!gameStarted && (event.code === "Space" || event.code === "Enter")) {
    playIntro();
    gameStarted = true;
    gameRunning = true;
  }
});

//Inicio del Juego

document.addEventListener("keydown", (event) => {
  if (!gameStarted && (event.code === "Space" || event.code === "Enter")) {
    gameStarted = true;
    gameRunning = true;
  }
});
//Condicion de Victoria

function winCondition() {
  if (scoreValue >= 2980) {

    currentDirection = null;
    desiredDirection = null;
    pacmanSpeed = 0;
    gameRunning = false;
  }
}
function loseCondition() {
  const pacmanCenterX = pacmanX + pacmanSize / 2;
  const pacmanCenterY = pacmanY + pacmanSize / 2;
  const hitboxRadius = pacmanSize / 2 * 0.8; 

  for (const g of ghosts) {
    const ghostCenterX = g.x + ghostWidth / 2;
    const ghostCenterY = g.y + ghostHeight / 2;
    const dx = pacmanCenterX - ghostCenterX;
    const dy = pacmanCenterY - ghostCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < hitboxRadius) {
      gameRunning = false;
      youLose = true;
      break;
    }
  }
}
//Mapa del Juego
let scoreValue = 0;
const path = 0;
const muro = 1;
const dot = 2;
const powerUp = 3;

const map = 

[ 
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
  [1,3,2,2,2,2,2,2,2,2,2,2,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,1,],
  [1,2,1,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,1,2,1,],
  [1,2,1,0,1,2,1,0,0,0,1,2,2,2,2,2,2,1,0,0,0,1,2,1,0,1,2,1,],
  [1,2,1,0,1,2,1,0,0,0,1,2,1,1,1,1,2,1,0,0,0,1,2,1,0,1,2,1,],
  [1,2,1,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,1,2,1,],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,],
  [1,2,1,1,1,2,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,2,1,1,1,2,1,],
  [1,2,1,0,1,2,1,0,0,0,0,1,0,1,1,0,1,0,0,0,0,1,2,1,0,1,2,1,],
  [1,2,1,1,1,2,1,0,0,0,0,1,0,1,1,0,1,0,0,0,0,1,2,1,1,1,2,1,],
  [1,2,2,2,2,2,1,0,1,1,1,1,0,0,0,0,1,1,1,1,0,1,2,2,2,2,2,1,],
  [1,1,1,1,1,2,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,2,1,1,1,1,1,],
  [1,1,1,1,1,2,1,0,1,0,1,1,0,0,0,0,1,1,0,1,0,1,2,1,1,1,1,1,],
  [1,1,1,1,1,2,1,1,1,0,1,0,0,0,0,0,0,1,0,1,1,1,2,1,1,1,1,1,],
  [2,2,2,2,2,2,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,2,2,2,2,2,2,],
  [1,1,1,1,1,2,1,1,1,0,1,0,0,0,0,0,0,1,0,1,1,1,2,1,1,1,1,1,],
  [1,1,1,1,1,2,1,0,1,0,1,0,0,0,0,0,0,1,0,1,1,1,2,1,1,1,1,1,],
  [1,1,1,1,1,2,1,1,1,0,1,1,0,0,0,0,1,1,0,1,1,1,2,1,1,1,1,1,],
  [1,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,1,],
  [1,2,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,2,1,],
  [1,2,1,0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,0,0,0,0,0,0,0,1,2,1,],
  [1,2,1,1,1,0,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,0,1,1,1,2,1,],
  [1,2,2,2,1,0,1,2,2,2,2,2,2,1,1,2,2,2,2,2,2,1,0,1,2,2,2,1,],
  [1,1,1,2,1,0,1,2,1,1,1,1,2,1,1,2,1,1,1,1,2,1,0,1,2,1,1,1,],
  [1,1,1,2,1,0,1,2,1,0,0,1,2,1,1,2,1,0,0,1,2,1,0,1,2,1,1,1,],
  [1,1,1,2,1,1,1,2,1,1,1,1,2,0,0,2,1,1,1,1,2,1,1,1,2,1,1,1,],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,1,],
  [1,2,1,1,1,1,1,2,1,1,1,1,2,1,1,2,1,1,1,1,2,1,1,1,1,1,2,1,],
  [1,2,1,1,1,1,1,2,1,1,1,1,2,1,1,2,1,1,1,1,2,1,1,1,1,1,2,1,],
  [1,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,1,],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,] 
];
function drawMap() {
  const cellWidth = 24;
  const cellHeight = 24;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const value = map[i][j];
      const x = j * cellWidth;
      const y = i * cellHeight;

      if (value === muro) {
        ctx.fillStyle = "blue";
        ctx.strokeStyle = "black";
        ctx.fillRect(x, y, cellWidth, cellHeight);
        ctx.strokeRect(x, y, cellWidth, cellHeight);
      } else if (value === dot) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x + cellWidth / 2, y + cellHeight / 2, 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (value === powerUp) {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(x + cellWidth / 2, y + cellHeight / 2, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}
function mapCollision(x, y, direction) {
if(Number.isInteger(x/24) && Number.isInteger(y/24)){
  let column = 0;
  let row = 0;
  let nextColumn = 0;
  let nextRow = 0;
  switch(direction){
    case Movementdirection.right:
      nextColumn = x + 24;
      column = nextColumn / 24;
      row = y / 24;
      break;
    case Movementdirection.left:
      nextColumn = x - 24;
      column = nextColumn / 24;
      row = y / 24;
      break;
    case Movementdirection.up:
      nextRow = y - 24;
      row = nextRow / 24;
      column = x / 24;
      break;
    case Movementdirection.down:
      nextRow = y + 24;
      row = nextRow / 24;
      column = x / 24;
      break;
  }
  const tile = map[row][column];
  if(tile === muro){
    return true;
}
return false;
}
}

//Vars PACMAN
const pacmanSize = 22;
let pacmanX = 24 * 13;
let pacmanY = 24 * 26;
let pacmanSpeed = 2;

const Movementdirection = {
  right: 0,
  left: 1,
  up: 2,
  down: 3,
};
let currentDirection = false;
let desiredDirection = false;

// Funciones Pacman

function eatDot(){
  let row = Math.floor(pacmanY / 24);
  let column = Math.floor(pacmanX / 24);
  if(map[row][column] === dot){
    map[row][column] = 0;
    scoreValue += 10;
    score.textContent = scoreValue;
  }
}
function eatPowerUp() {
  let row = Math.floor(pacmanY / 24);
  let column = Math.floor(pacmanX / 24);
  if (map[row][column] === powerUp) {
    map[row][column] = path; 
    eatable = true;
    eatableTimer = 600; 
    ghosts.forEach(g => g.color = "blue");
  }
}

// Vars Fantasmas
  let eatable = false;
  let eatableTimer = 0;
  const ghostWidth = 22;
  const ghostHeight = 22;
  const arcRadius = ghostWidth / 2;

  const ghosts = [
  { x: 24 * 15, y: 24 * 14, color: "red", direction: Movementdirection.left, speed: 2 },
  { x: 24 * 12, y: 24 * 14, color: "pink", direction: Movementdirection.right, speed: 1 },
  { x: 24 * 14, y: 24 * 14, color: "cyan", direction: Movementdirection.up, speed: 1 },
  { x: 24 * 13, y: 24 * 14, color: "orange", direction: Movementdirection.down, speed: 2 },
 
];
const ghostSpeed = 2;

//Funciones de Dibujo

function drawPacman() {
  ctx.beginPath();
  ctx.arc(
    pacmanX + pacmanSize / 2,
    pacmanY + pacmanSize / 2,
    pacmanSize / 2,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
}

function cleanCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawGhost(x, y, color) {
  const ghostWidth = 22;
  const ghostHeight = 22;
  const arcRadius = ghostWidth / 2;

  ctx.beginPath();
  ctx.arc(x + ghostWidth / 2, y + arcRadius, arcRadius, Math.PI, 0, false);
  ctx.lineTo(x + ghostWidth, y + ghostHeight);
  ctx.lineTo(x, y + ghostHeight);
  ctx.lineTo(x, y + arcRadius);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function drawGhosts() {
  ghosts.forEach(g => drawGhost(g.x, g.y, g.color));
}

 

//Controles

function initControls() {
  document.addEventListener("keydown", keyDownHandler);
  function keyDownHandler(event) {
    if (event.key === "Right" || event.key === "ArrowRight") {
      if (currentDirection == Movementdirection.left) {
        currentDirection = Movementdirection.right;
      }
      desiredDirection = Movementdirection.right;
    } else if (event.key === "Left" || event.key === "ArrowLeft") {
      if (currentDirection == Movementdirection.right) {
        currentDirection = Movementdirection.left;
      }
      desiredDirection = Movementdirection.left;
    } else if (event.key === "Up" || event.key === "ArrowUp") {
      if (currentDirection == Movementdirection.down) {
        currentDirection = Movementdirection.up;
      }
      desiredDirection = Movementdirection.up;
    } else if (event.key === "Down" || event.key === "ArrowDown") {
      if (currentDirection == Movementdirection.up) {
        currentDirection = Movementdirection.down;
      }
      desiredDirection = Movementdirection.down;
    }
  }

}

//Funciones de Movimiento

function movePacman() {
if(currentDirection !== desiredDirection){
  if(Number.isInteger(pacmanX/24) && Number.isInteger(pacmanY/24)){
    if(mapCollision(pacmanX, pacmanY, desiredDirection) === false)
      currentDirection = desiredDirection;
  }
}
if(mapCollision(pacmanX, pacmanY, currentDirection)){
  return;
}
switch (currentDirection) {
  case Movementdirection.right:
    pacmanX += pacmanSpeed;
    break;
  case Movementdirection.left:
    pacmanX -= pacmanSpeed;
    break;
  case Movementdirection.up:
    pacmanY -= pacmanSpeed;
    break;
  case Movementdirection.down:
    pacmanY += pacmanSpeed;
    break;
}
}
function isGhostCellOccupied(nextX, nextY, self) {
  const col = Math.floor(nextX / 24);
  const row = Math.floor(nextY / 24);
  return ghosts.some(g =>
    g !== self &&
    Math.floor(g.x / 24) === col &&
    Math.floor(g.y / 24) === row
  );
}
function moveGhosts() {
  ghosts.forEach(g => {
    if (Number.isInteger(g.x / 24) && Number.isInteger(g.y / 24)) {
      let dx = pacmanX - g.x;
      let dy = pacmanY - g.y;
      let dir = g.direction;

      if (eatable) {
        if (Math.abs(dx) > Math.abs(dy)) {
          dir = dx > 0 ? Movementdirection.left : Movementdirection.right;
        } else {
          dir = dy > 0 ? Movementdirection.up : Movementdirection.down;
        }
      } else {
        if (Math.abs(dx) > Math.abs(dy)) {
          dir = dx > 0 ? Movementdirection.right : Movementdirection.left;
        } else {
          dir = dy > 0 ? Movementdirection.down : Movementdirection.up;
        }
      }

      const dirs = [dir, Movementdirection.right, Movementdirection.left, Movementdirection.up, Movementdirection.down];
      for (let d of dirs) {
        let testX = g.x, testY = g.y;
        switch (d) {
          case Movementdirection.right: testX += g.speed; break;
          case Movementdirection.left: testX -= g.speed; break;
          case Movementdirection.up: testY -= g.speed; break;
          case Movementdirection.down: testY += g.speed; break;
        }
        if (!mapCollision(g.x, g.y, d) && !isGhostCellOccupied(testX, testY, g)) {
          g.direction = d;
          break;
        }
      }
    }

    let nextX = g.x;
    let nextY = g.y;
    switch (g.direction) {
      case Movementdirection.right: nextX += g.speed; break;
      case Movementdirection.left: nextX -= g.speed; break;
      case Movementdirection.up: nextY -= g.speed; break;
      case Movementdirection.down: nextY += g.speed; break;
    }

    if (
      !mapCollision(g.x, g.y, g.direction) &&
      !isGhostCellOccupied(nextX, nextY, g)
    ) {
      g.x = nextX;
      g.y = nextY;
    }
  });
}
function handleEatableMode() {
  if (eatable) {
    eatableTimer--;
    if (eatableTimer <= 0) {
      eatable = false;
      ghosts.forEach(g => {
        if (g.color === "blue") {
          if (g === ghosts[0]) g.color = "red";
          if (g === ghosts[1]) g.color = "pink";
          if (g === ghosts[2]) g.color = "cyan";
          if (g === ghosts[3]) g.color = "orange";
        }
      });
    }
  }
}

function checkCollisionsCanvas() {
  if (pacmanX + pacmanSize > canvas.width) {
    pacmanX = 0; 
  }
  if (pacmanX < 0) {
    pacmanX = canvas.width - pacmanSize; 
  }
  if (pacmanY + pacmanSize > canvas.height) {
    pacmanY = canvas.height - pacmanSize; 
  }
  if (pacmanY < 0) {
    pacmanY = 0; 
}
}


// Gameloop
function update() {
  movePacman();
  checkCollisionsCanvas();
  eatDot();
  eatPowerUp();
  moveGhosts();
  winCondition();
  loseCondition();
  handleEatableMode();

}

function draw() {
  cleanCanvas();
  drawMap();
  drawPacman();
  drawGhosts();
 ctx.fillStyle = "white";
  ctx.font = "36px Arial";
  ctx.textAlign = "center";

 ctx.fillStyle = "white";
  ctx.font = "36px Arial";
  ctx.textAlign = "center";

  if (!gameStarted) {
    ctx.fillText("Presiona ESPACIO para comenzar", canvas.width / 2, canvas.height / 2);
  } else if (!gameRunning && youLose) {
    ctx.fillStyle = "red";
    ctx.fillText("¡HAS PERDIDO!", canvas.width / 2, canvas.height / 2);
  } else if (!gameRunning && !youLose) {
    ctx.fillText("¡TU GANAS!", canvas.width / 2, canvas.height / 2);
  }
}

function gameLoop() {
  if (gameStarted && gameRunning) {
    update();
  }
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
initControls();
