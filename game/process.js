import { input } from "./input.js";
import { player } from "../data/player.js";
import { stageData } from "../data/stage.js"

const W = stageData[1].w, H = stageData[1].h, map = stageData[1].data

function getIncludePosition(x, y) {
  const floorX = Math.floor(x);
  const floorY = Math.floor(y);
  let includePos = [[floorX, floorY]]

  if (x % 1 !== 0) {
    includePos.push([floorX + 1, floorY])
  }
  if (y % 1 !== 0) {
    includePos.push([floorX, floorY + 1])
  }
  if (x % 1 !== 0 && y % 1 !== 0) {
    includePos.push([floorX + 1, floorY + 1])
  }

  return includePos;
}

function safetyLoader(x, y) {
  if (y < 0 || H <= y) return false;
  if (x < 0 || W <= x) return false;
  return map[y][x] === 1;
}

function hitTester(x, y) {
  let hitFlag = false;
  for (let pos of getIncludePosition(x, y)) {
    if (safetyLoader(pos[0],pos[1])) {
      hitFlag = true;
      break;
    }
  }
  return hitFlag;
}

export function update() {
  if (input.right) player.powerX += player.speed;
  if (input.left) player.powerX -= player.speed;
  player.powerX *= 0.9;
  player.x += player.powerX;
  player.x = Math.max(0, Math.min(W - 1, player.x));
  if (hitTester(player.x, player.y)) {
    player.x = Math.floor(player.x);
    while(hitTester(player.x, player.y)) {
      player.x -= Math.sign(player.powerX);
    }
    player.powerX = 0;
  }

  player.powerY += player.gravity;
  player.y += player.powerY
  player.y = Math.max(0, Math.min(H - 1, player.y));
  if (hitTester(player.x, player.y)) {
    player.y = Math.floor(player.y);
    while(hitTester(player.x, player.y)) {
      player.y -= Math.sign(player.powerY);
    }
    if (player.powerY < 0) {
      player.powerY = 0
    } else {
      player.powerY = -input.up * player.jumpPower;
    }
  }
}
