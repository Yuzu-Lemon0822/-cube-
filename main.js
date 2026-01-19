const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// 画面サイズ
canvas.width = 800;
canvas.height = 600;

// プレイヤー画像
const playerImg = new Image();
playerImg.src = "texture/player.png";

// プレイヤー情報（データ構造）
const player = {
  x: 100,
  y: 100,
  w: 64,
  h: 64
};

function loop() {
  // 画面クリア
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // プレイヤー描画
  ctx.drawImage(
    playerImg,
    player.x,
    player.y,
    player.w,
    player.h
  );

  requestAnimationFrame(loop);
}

// 画像読み込み後に開始
playerImg.onload = () => {
  loop();
};

