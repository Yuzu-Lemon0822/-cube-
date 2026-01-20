import { player } from "../data/player.js";
import { textureData } from "../data/texture.js";
import { stageData } from "../data/stage.js";

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

function display(texture, x, y) {
  let displayImage //テクスチャの読み込み
  
  if (texture in textureList) {
    displayImage = textureList[texture]
  } else {
    displayImage = new Image()
    displayImage.src = "texture/" + texture + ".png"

    textureList[texture] = displayImage
  }

  let displayData //サイズ、ズレ補正の読み込み
  
  if (texture in textureData) {
    displayData = textureData[texture]
  } else {
    displayData = textureData.player
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
  for (let y = 0; y < stageData.1.length; y++) {
    for (let x = 0; x < stageData.1[y].length; x++) {
      if (stageData.1[y][x] === 1) display("stage", x, y)
    }
  }
  
  display("player", player.x, player.y);
}
