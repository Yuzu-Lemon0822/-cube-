import { player } from "../data/player.js";

let ctx;
let canvas;
let playerImg;
let textureList = {} //テクスチャデータをキャッシュ

export function initDisplay() {
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");

  ctx.imageSmoothingEnabled = false;

  canvas.width = 800;
  canvas.height = 600;
}

function display(x, y, w, h, texture) {
  let displayImage
  
  if (textureList in texture) {
    displayImage = textureList[texture]
  } else {
    displayImage = new Image()
    displayImage.src = "texture/" + texture + ".png"

    textureList[texture] = displayImage
  }

  ctx.drawImage(displayImage, x, y, w, h)
}

export function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  display("player", player.x, player.y, player.w, player.h );

  display("stage",200,200,64,64)
}
