// Draw points clicking
let x_pos = [];
let y_pos = [];

function setup() {
  createCanvas(400, 400);
  background(0);
}
function mousePressed() {
  let new_x = map(mouseX, 0, width, 0, 1);
  let new_y = map(mouseY, 0, height, 1, 0);
  x_pos.push(new_x);
  y_pos.push(new_y);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(8);

  for (let i = 0; i < x_pos.length; i++) {
    let px = map(x_pos[i], 0, 1, 0, width);
    let py = map(y_pos[i], 0, 1, height, 0);
    point(px, py);
  }
}
