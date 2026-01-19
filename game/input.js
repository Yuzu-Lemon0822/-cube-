export const input = {
  w: false,
  a: false,
  s: false,
  d: false
};

window.addEventListener("keydown", (e) => {
  if (e.key === "w") input.w = true;
  if (e.key === "a") input.a = true;
  if (e.key === "s") input.s = true;
  if (e.key === "d") input.d = true;
});

window.addEventListener("keyup", (e) => {
  if (e.key === "w") input.w = false;
  if (e.key === "a") input.a = false;
  if (e.key === "s") input.s = false;
  if (e.key === "d") input.d = false;
});

