//  <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js"></script>
// Creando el modelo
const model = tf.sequential();
// Define the model architecture.

// Creando capa oculta
const hidden = tf.layers.dense({
  units: 4,
  inputShape: [2],
  activation: "sigmoid",
});
// Insertar capa oculta
model.add(hidden);
// Creamos capa de salida
const exit = tf.layers.dense({
  units: 1,
  // inputShape: [4],
  activation: "sigmoid",
});
// Insertamos capa de salida en el modelo
model.add(exit);
// Creamos las opciones de sgd
const sgdOptions = tf.train.sgd(0.1);
// Compilamos el modelo
model.compile({
  // Asignamos optimización
  optimizer: sgdOptions,
  // Asignamos la forma de reducir la perdida
  loss: tf.losses.meanSquaredError,
});

const x1 = tf.tensor2d([
  [0, 0],
  [0.2, 0.2],
  [0.4, 0.4],
]);
const x2 = tf.tensor2d([[0.1], [0.2], [0.5]]);
async function tryAnswer() {
  for (i = 0; i < 100; i++) {
    const answer = await model.fit(x1, x2, {
      shuffle: true,
      epochs: 100,
    });
    console.log(answer?.history.loss[0]);
  }
}
tryAnswer().then(() => {
  const exit = model.predict(x1);
  exit.print();
});
