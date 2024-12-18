//  <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.dom.js"></script>
let x_pos = [];
let y_pos = [];
let w, b; // w: inclinación, b: altura desde abajo donde empieza el punto incial
const learningRate = 0.5;
const optimizer = tf.train.sgd(learningRate);
function setup() {
  createCanvas(400, 400);
  background(0);
  w = tf.variable(tf.scalar(random(1)));
  b = tf.variable(tf.scalar(random(1)));
}
function predicting(x) {
  const xs = tf.tensor1d(x);
  // ecuación de entrenamiento: y = w * x + b
  const ys = xs.mul(w).add(b);
  return ys;
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

  tf.tidy(() => {
    if (x_pos?.length > 0) {
      const ys = tf.tensor1d(y_pos); // Convert y_pos to tensor
      optimizer.minimize(() => predicting(x_pos).sub(ys).square().mean());
    }
  });
  let y_pred = tf.tidy(() => {
    return predicting([0, 1]);
  });
  let val_y_pred = y_pred.dataSync();
  y_pred.dispose();

  let x1 = map(0, 0, 1, 0, width);
  let x2 = map(1, 0, 1, 0, width);

  let y1 = map(val_y_pred[0], 0, 1, height, 0);
  let y2 = map(val_y_pred[1], 0, 1, height, 0);

  line(x1, y1, x2, y2);
}
