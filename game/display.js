import { player } from "../data/player.js";
import { textureData } from "../data/texture.js";
import { stageData } from "../data/stage.js";
import { camera } from "../data/camera.js"

const W = stageData[1].w, H = stageData[1].h, map = stageData[1].data;

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

function safetyLoader(x, y) {
  if (y < 0 || H <= y) return false;
  if (x < 0 || W <= x) return false;
  return map[y][x] === 1;
}

export function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const fix_displayX = camera.x - 10, fix_displayY = camera.y - 7.5;

  for (let y = camera.display_maxY; y >= camera.display_minY; y--) {
    for (let x = camera.display_maxX; x >= camera.display_minX ; x--) {
      if (safetyLoader(x, y)) display("stage", x - fix_displayX, y - fix_displayY);
      if (x === player.displayX && y === player.displayY) {
        display("player_" + player.dir, player.x - fix_displayX, player.y - fix_displayY);
      }
    }
  }
}
