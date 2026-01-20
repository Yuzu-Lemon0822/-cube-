import { input } from "./input.js";
import { player } from "../data/player.js";

export function update() {
  if (input.d) player.powerX += player.speed;
  if (input.a) player.powerX -= player.speed;
  player.powerX *= 0.9;

  // 画面外に出ないようにする（仮）
  player.x = Math.max(0, Math.min(800 - player.w, player.x));
  player.y = Math.max(0, Math.min(600 - player.h, player.y));
}
