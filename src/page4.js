//  <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js"></script>
function draw() {
  const val = [];

  for (let i = 0; i < 30; i++) {
    val[i] = Math.random(0, 100) * 100;
  }
  tf.tidy(() => {
    // 5: grupos, 3: filas, 2: columnas;
    const tens = tf.tensor3d(val, [5, 3, 2], "int32");

    // const x = tf.variable(tf.tensor([1, 2, 3]));
    // x.print();

    // se utiliza .assign() con 'const' y no 'let' para mantener la misma referencia del tensor
    // y no se podría realizar actualizaciones en el contexto adecuado, por ejemplo durante el entrenamiento de un modelos de entrenamiento y optimización.
    // x.assign(tf.tensor([4, 5, 6]));

    // x.print();

    const a = tf.tensor2d([
      [1, 2, -3],
      [4, 0, -2],
    ]);
    const b = tf.tensor2d([
      [3, 1],
      [2, 4],
      [-1, 5],
    ]);
    // const mul = tf.matMul(a, b);
    // a.matMul(b).print();
  });
  //* Con .tidy() no hace falta .dispose()
  // tens.dispose();
  // x.dispose();
  // a.dispose();
  // b.dispose();
  // mul.dispose();
  console.log(tf.memory().numTensors);
}

draw();
