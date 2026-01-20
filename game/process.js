import { input } from "./input.js";
import { player } from "../data/player.js";
import { stageData } from "../data/stage.js"

function 

export function update() {
  if (input.d) player.powerX += player.speed;
  if (input.a) player.powerX -= player.speed;
  player.powerX *= 0.9;
  player.x += player.powerX;

  // 画面外に出ないようにする（仮）
  player.x = Math.max(0, Math.min(19, player.x));
  player.y = Math.max(0, Math.min(14, player.y));
}
