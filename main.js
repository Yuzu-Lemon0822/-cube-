import { initDisplay, draw } from "./game/display.js";
import { update } from "./game/process.js";

initDisplay();

function loop() {
  update(); // ロジック
  draw();   // 描画
  requestAnimationFrame(loop);
}

loop();
