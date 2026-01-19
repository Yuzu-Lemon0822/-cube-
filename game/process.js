import { input } from "./input.js";
import { player } from "../data/player.js";

export function update() {
  if (input.w) player.y -= player.speed;
  if (input.s) player.y += player.speed;
  if (input.a) player.x -= player.speed;
  if (input.d) player.x += player.speed;

  // 画面外に出ないようにする（仮）
  player.x = Math.max(0, Math.min(800 - player.w, player.x));
  player.y = Math.max(0, Math.min(600 - player.h, player.y));
}
