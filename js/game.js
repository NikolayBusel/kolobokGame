let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let kolobok = new Image();
let back = new Image();
let front = new Image();
let fox = new Image();
let wolf = new Image();

kolobok.src = "img/kolobok.png";
back.src = "img/back.png";
front.src = "img/front.png";
fox.src = "img/fox.png";
wolf.src = "img/wolf.png";

// Звуковые файлы
let music = new Audio();

music.scr = "audio/kolobok.mp3";

// расстояние между лисой и волком
let gap = 90;

// При нажатии любой кнопки
document.addEventListener("keydown", moveUp);

function moveUp() {
  yPos -= 25;
}

// Создание блоков
let animal = [];

animal[0] = {
  x: cvs.width,
  y: 0,
};

let score = 0;

// положение колобка
let xPos = 10;
let yPos = 150;
let grav = 1.7;

function draw() {
  ctx.drawImage(back, 0, 0);

  for (let i = 0; i < animal.length; i++) {
    ctx.drawImage(fox, animal[i].x, animal[i].y);
    ctx.drawImage(wolf, animal[i].x, animal[i].y + fox.height + gap);

    animal[i].x--;

    if (animal[i].x == 75) {
      animal.push({
        x: cvs.width,
        y: Math.floor(Math.random() * fox.height) - fox.height,
      });
    }

    // Отслеживание контакта
    if (
      (xPos + kolobok.width >= animal[i].x &&
        xPos <= animal[i].x + fox.width &&
        (yPos <= animal[i].y + fox.height ||
          yPos + kolobok.height >= animal[i].y + fox.height + gap)) ||
      yPos + kolobok.height >= cvs.height - front.height
    )
      location.reload(); // Перезагрузка страницы

    if (animal[i].x == 5) {
      score++;
    }
  }

  ctx.drawImage(front, 0, cvs.height - front.height);
  ctx.drawImage(kolobok, xPos, yPos);

  yPos += grav;

  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText("Счёт: " + score, 10, cvs.height - 20);

  requestAnimationFrame(draw);
}

wolf.onload = draw;
