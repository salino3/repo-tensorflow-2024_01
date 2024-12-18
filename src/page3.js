//  <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js"></script>
// Función para simular tirar dos dados y devolver la suma
function rollDice() {
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;
  return dice1 + dice2;
}

// Simular 20 tiradas de dados
function simulateRolls(numRolls) {
  const results = Array(11).fill(0); // Para contar las ocurrencias de cada suma de 2 a 12
  for (let i = 0; i < numRolls; i++) {
    const rollSum = rollDice();
    results[rollSum - 2] += 1; // Restamos 2 porque la suma mínima es 2
  }
  // Convertir los resultados en probabilidades
  return results.map((count) => count / numRolls);
}

// Entrenamiento
async function trainModel() {
  const numRolls = 20; // Número de tiradas
  const inputs = []; // Entradas (número de tiradas por cada combinación)
  const outputs = []; // Salidas (probabilidades)

  // Generar datos de entrada y salida
  for (let i = 0; i < 1000; i++) {
    // Generamos 1000 ejemplos de entrenamiento
    const simulatedProbabilities = simulateRolls(numRolls);
    inputs.push([numRolls]); // Usamos solo el número de tiradas como entrada
    outputs.push(simulatedProbabilities);
  }

  const xs = tf.tensor2d(inputs); // Datos de entrada
  const ys = tf.tensor2d(outputs); // Datos de salida (probabilidades de las sumas)

  // Crear el modelo
  const model = tf.sequential();
  model.add(
    tf.layers.dense({ units: 32, activation: "relu", inputShape: [1] })
  );
  model.add(tf.layers.dense({ units: 11, activation: "softmax" })); // Probabilidades para cada suma de 2 a 12

  // Compilar el modelo
  model.compile({ optimizer: "adam", loss: "meanSquaredError" });

  // Entrenar el modelo
  await model.fit(xs, ys, { epochs: 10 });
  console.log("Modelo entrenado");

  return model;
}

// Función para predecir las probabilidades después de 20 tiradas
async function predictProbabilities(model, numRolls) {
  const prediction = model.predict(tf.tensor2d([[numRolls]]));
  const probabilities = prediction.arraySync()[0];
  console.log(
    "Probabilidades después de " + numRolls + " tiradas:",
    probabilities
  );
  return probabilities;
}

// Entrenar el modelo y hacer una predicción
trainModel().then((model) => {
  const numRolls = 20; // Número de tiradas para predecir
  predictProbabilities(model, numRolls);
});
