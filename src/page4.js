const x = tf.variable(tf.tensor([1, 2, 3]));
x.print();

// se utiliza .assign() con 'const' y no 'let' para mantener la misma referencia del tensor
// y no se podría realizar actualizaciones en el contexto adecuado, por ejemplo durante el entrenamiento de un modelos de entrenamiento y optimización.
x.assign(tf.tensor([4, 5, 6]));

x.print();

const a = tf.tensor2d([
  [1, 2, -3],
  [4, 0, -2],
]);
const b = tf.tensor2d([
  [3, 1],
  [2, 4],
  [-1, 5],
]);
tf.matMul(a, b).print();
a.matMul(b).print();
