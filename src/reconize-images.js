<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ml5</title>

    <script src="https://unpkg.com/ml5@0.1.3/dist/ml5.min.js"></script>
  </head>

  <body>
    <h1>Image classifier MobileNet</h1>
    <img src="" crossorigin="anonymous" alt="Image" id="imagen" /> <br />
    <br />
    <button onclick="nextImage()">Next image</button>
    <p>
      This is a
      <strong>
        <span id="result"> ... </span>
      </strong>
      <br />
      <br />
      with a certainty of
      <strong>
        <span id="probability"> ...</span>
      </strong>
    </p>

    <script>
    const imageNames = [
        "aguila-1",
        "aguila-2",
        "ant-1",
        "ant-2",
        "beer-1",
        "gatito-1",
        "gato-1",
        "gato-2",
        "gatos-2",
        "perro-1",
        "perro-2",
        "perro-3",
        "vaso-1",
      ];

      let num = 0;
      const image = document.getElementById("imagen");
      const result = document.getElementById("result");
      const probability = document.getElementById("probability");

      image.src = `./src/images/${imageNames[num]}.jpg`;

      function classifyImage() {
        classifier.predict(image, function (err, res) {
          if (err) {
            console.error(err);
            return;
          }
          console.log("Results:", res);
          result.innerText = res[0].className;
          probability.innerText = `${res[0].probability.toFixed(2)} %`;
        });
      }

      // Evento para esperar que la imagen se cargue
      image.onload = () => {
        classifyImage(); // Clasifica la imagen después de que se cargue
      };

      function nextImage() {
        if (imageNames.length - 1 <= num) {
          num = 0;
        } else {
          num++;
        }
        image.src = `./src/images/${imageNames[num]}.jpg`;
      }

      // Inicializar el clasificador
      const classifier = ml5.imageClassifier("MobileNet", function () {
        console.log("Model loaded successfully");
      });
    </script>
  </body>
</html>
