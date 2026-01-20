import { player } from "../data/player.js";
import { textureData } from "../data/texture.js";
import { stageData } from "../data/stage.js";

let ctx;
let canvas;
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

  const W = stageData[1].w, H = stageData[1].h, map = stageData[1].data;

  for (let y = H - 1; y >= 0; y--) {
    for (let x = W - 1; x >= 0 ; x--) {
      if (map[y][x] === 1) display("stage", x, y);
      if (x === player.displayX && y === player.displayY) display("player", player.x, player.y);
    }
  }
}
