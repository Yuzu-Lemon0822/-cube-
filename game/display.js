import { player } from "../data/player.js";

let ctx;
let canvas;
let playerImg;
let textureList = {} //テクスチャデータをキャッシュ

export function initDisplay() {
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");

  ctx.imageSmoothingEnabled = false;

  canvas.width =640;
  canvas.height = 480;
}

function display(texture, x, y, w, h) {
  let displayImage
  
  if (texture in textureList) {
    displayImage = textureList[texture]
  } else {
    displayImage = new Image()
    displayImage.src = "texture/" + texture + ".png"

    textureList[texture] = displayImage
  }

  ctx.drawImage(displayImage, x*32, y*32, w, h)
}

export function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  display("stage",4,4,38,38) //テクスチャの都合上38x38
  display("stage",3,4,38,38)
  
  display("player", player.x, player.y, player.w, player.h );
}
