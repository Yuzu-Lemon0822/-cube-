import { input } from "./input.js";
import { player } from "../data/player.js";
import { stageData } from "../data/stage.js"
import { camera } from "../data/camera.js"

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
  if (y < 0 || H <= y) return "air";
  if (x < 0 || W <= x) return "air";
  return map[y][x];
}

const hitBox = {
  stage: function hit(obj_x, obj_y) {
    return true;
  },
  spike_up: function hit(obj_x, obj_y) {
    const x = player.x - obj_x;
    const y = player.y - obj_y;

    if (Math.abs(x) > 1) return false;
    if (Math.abs(y) > 1) return false;

    return y <= -2 * Math.abs(x) + 2;
  }
}

function hitTester(x, y, type) {
  if (!(type in hitBox)) return false;
  for (let pos of getIncludePosition(x, y)) {
    if (safetyLoader(pos[0],pos[1]) === type) {
      if (hitBox[type](pos[0], pos[1])) {
        return true;
      }
    }
  }
  return false;
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

  if (player.powerX > 0) player.dir = "right"
  if (player.powerX < 0) player.dir = "left"

  player.powerY += player.gravity;
  player.y += player.powerY;
  player.y = Math.max(0, Math.min(H - 1, player.y));
  if (hitTester(player.x, player.y)) {
    player.y = Math.floor(player.y);
    while(hitTester(player.x, player.y)) {
      player.y -= Math.sign(player.powerY);
    }
    if (player.powerY < 0) {
      player.powerY = 0;
    } else {
      player.powerY = -input.up * player.jumpPower;
    }
  }

  player.displayX = Math.floor(player.x);
  player.displayY = Math.ceil(player.y);

  camera.x += (player.x - camera.x) / camera.delay
  camera.y += (player.y - camera.y) / camera.delay

  if (camera.x < stageData[1].camera_minX) camera.x = stageData[1].camera_minX
  if (camera.x > stageData[1].camera_maxX) camera.x = stageData[1].camera_maxX
  if (camera.y < stageData[1].camera_minY) camera.y = stageData[1].camera_minY
  if (camera.y > stageData[1].camera_maxY) camera.y = stageData[1].camera_maxY

  camera.display_minX = Math.floor(camera.x - 10.5)
  camera.display_maxX = Math.floor(camera.x + 10.5)
  camera.display_minY = Math.floor(camera.y - 8)
  camera.display_maxY = Math.floor(camera.y + 8)
}