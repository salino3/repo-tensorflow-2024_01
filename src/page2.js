//  <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js"></script>
const val = [];

for (let i = 0; i < 30; i++) {
  val[i] = Math.random(0, 100) * 100;
}
// 5: grupos, 3: filas, 2: columnas;
const tens = tf.tensor3d(val, [5, 3, 2], "int32");

tens.print();

// se queda en Promesa
// console.log("1)", tens.data());

//* estos 3 da el mismo resultado
// tens.data().then(function (res) {
//   console.log(res);
// });

// .data() es asincrono
tens.data().then((res) => {
  console.log("3)", res[2]);
});

// esto se ejecuta antes del .then(), es sincrono
console.log("4)", tens.dataSync());

console.log("//--------------------------------------------------------");

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
