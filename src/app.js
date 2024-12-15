//  <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js"></script>
console.log("1)", tf.tensor1d([1, 2, 3, 4]));

console.log(
  "2)",
  tf.tensor(
    [
      [1.5, 2],
      [3, 4],
    ],
    null,
    "int32"
  )
);

tf.tensor(
  [
    [1.5, 2],
    [3, 4],
  ],
  null,
  "int32"
).print();

tf.tensor([1, 2, 3, 4], [2, 2]).print();

// same result
console.log("3)", tf.scalar(3.14));
console.log("4)", tf.tensor(3.14));
tf.scalar(3.14).print();

console.log("5)", tf.tensor1d([1, 2, 3]));

const val = [];

for (let i = 0; i < 30; i++) {
  val[i] = Math.random(0, 100);
}
// 5: grupos, 3: filas, 2: columnas;
tf.tensor3d(val, [5, 3, 2]).print();
