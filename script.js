const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let gameStatus = false;
let CANVAS_WIDTH = 800;
let CANVAS_HEIGHT = 800;

let size = 25;
let score = 0;

let snake = [
  { x: 0, y: 0 },
  { x: size, y: size },
];
let direction = "right";

let food = {
  x: null,
  y: null,
};

const generateFood = () => {
  food.x = Math.floor(Math.random() * (CANVAS_WIDTH / size)) * size;
  food.y = Math.floor(Math.random() * (CANVAS_WIDTH / size)) * size;
};

const checkSnakeCollision = () => {
  const head = snake[0];

  if (
    head.x === CANVAS_WIDTH ||
    head.x < 0 ||
    head.y === CANVAS_WIDTH ||
    head.y < 0
  ) {
    gameStatus = false;
  }
  // Check if the head collides with any other segment of the snake
  snake.forEach((segment, index) => {
    if (head.x === segment.x && head.y === segment.y && index !== 0) {
      gameStatus = false;
    }
  });
};

const checkIsFoodEaten = () => {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    generateFood();
    score += 5;
    growSnake();
  }
};

const growSnake = () => {
  // Add new segment to the snake's tail
  const tail = { ...snake[snake.length - 1] };
  snake.push(tail);
};

let frame = 0;
let speed = size / 5;

const moveSnake = () => {
  ctx.clearRect(0, 0, 800, 800);

  if (!food.x && !food.y) {
    generateFood();
  }

  // snake
  ctx.fillStyle = "yellow";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, size, size);
  });

  // food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, size, size);

  if (frame % speed === 0) {
    const head = { ...snake[0] };
    // Move the snake's head
    if (direction === "up") head.y -= size;
    if (direction === "down") head.y += size;
    if (direction === "left") head.x -= size;
    if (direction === "right") head.x += size;
    snake.unshift(head); // Add the new head to the front of the snake

    // Check for collision with itself
    checkSnakeCollision();

    if (!gameStatus) {
      endGame();
      return;
    }

    snake.pop(); // Remove the last segment (tail) of the snake
  }

  frame++;

  gameStatus && requestAnimationFrame(moveSnake);
  checkIsFoodEaten();
};

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (event.key === "ArrowDown" && direction !== "up") {
    direction = "down";
  } else if (event.key === "ArrowLeft" && direction !== "right") {
    direction = "left";
  } else if (event.key === "ArrowRight" && direction !== "left") {
    direction = "right";
  }
});

const endGame = () => {
  gameStatus = false;
  alert("Game Over! Your score: " + score);
};

const init = () => {
  gameStatus = true;
  moveSnake();
};

init();
