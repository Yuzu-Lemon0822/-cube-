function set(target, x, y, type) {
  if (y < 0 || target.length <= y) return;
  if (x < 0 || target[y].length <= x) return;
  target[y][x] = type;
}

function createBase(w, h, fill = "air", opts = {}) {
  return {
    w: w,
    h: h,
    camera_minX: opts.minX ?? 10,
    camera_maxX: opts.maxX ?? w - 10,
    camera_minY: opts.minY ?? 7.5,
    camera_maxY: opts.maxY ?? h - 7.5,
    data:  Array.from({ length: h }, () => 
      Array(w).fill(fill)
    )
  }
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

stageData[1] = createBase(32, 24);
fill(stageData[1].data, [0,18], [23,23], "stage")
fill(stageData[1].data, [10,17], [17,17], "stage")
fill(stageData[1].data, [4,15], [7,15], "stage")
fill(stageData[1].data, [13,15], [15,15], "stage")