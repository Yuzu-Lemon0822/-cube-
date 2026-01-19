import { player } from "../data/player.js";

let ctx;
let canvas;
let playerImg;

export function initDisplay() {
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");

  canvas.width = 800;
  canvas.height = 600;

  playerImg = new Image();
  playerImg.src = "texture/player.png";
}

export function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(
    playerImg,
    player.x,
    player.y,
    player.w,
    player.h
  );
}
