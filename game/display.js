import { player } from "../data/player.js";
import { textureData } from "../data/texture.js";

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
  
  if (texture in textureList) { //テクスチャの読み込み
    displayImage = textureList[texture]
  } else {
    displayImage = new Image()
    displayImage.src = "texture/" + texture + ".png"

    textureList[texture] = displayImage
  }

  let displayData
  
  if (texture in textureData) {
    displayData = textureData[texture]
  } else {
    displayData = texureData.player
  }
  
  ctx.drawImage(
    displayImage,
    x*32 + displayData.fix_x,
    y*32 + displayData.fix_y,
    displayData.w,
    displayData.h
  )
}

export function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  display("stage",4,4,38,38) //テクスチャの都合上38x38
  display("stage",3,4,38,38)
  
  display("player", player.x, player.y, 32, 32);
}
