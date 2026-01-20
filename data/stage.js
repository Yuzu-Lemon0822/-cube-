function set(target, x, y, type) {
  if (y < 0 || target.length <= y) return;
  if (x < 0 || target[y].length <= x) return;
  target[y][x] = type;
}

function createBase(w, h, fill = 0) {
  return Array.from({ length: h }, () =>
    Array(w).fill(fill)
  );
}

function fill(target, pos1, pos2, type) {
  const minX = Math.min(pos1[0],pos2[0]);
  const maxX = Math.max(pos1[0],pos2[0]);
  const minY = Math.min(pos1[1],pos2[1]);
  const maxY = Math.max(pos1[1],pos2[1]);

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      set(target, x, y, type);
    }    
  }
}

//ステージデータ

export let stageData = {}

stageData[1] = createBase(20, 15);
fill(stageData[1], [0,13], [19,14], 1)