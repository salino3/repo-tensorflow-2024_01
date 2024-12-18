<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Image classifier using webcam with MobileNet and p5.js</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.dom.min.js"></script>
    <script
      src="https://unpkg.com/ml5@0.1.2/dist/ml5.min.js"
      type="text/javascript"
    ></script>
  </head>

  <body>
    <h1>Clasificador de imaganes por webcam usando MobileNet and p5.js</h1>
    <p id="status">Loading model 🔄...</p>
    <p>
      This is a <strong> <span id="result">...</span></strong> <br />
      <br />
      with a certainty of <strong><span id="probability">...</span></strong
      >.
    </p>
    <script>
      let video;
      let classifier;
      function setup() {
        noCanvas();
        video = createCapture(VIDEO);

        classifier = ml5.imageClassifier("MobileNet", video, modelReady);
      }
      function modelReady() {
        select("#status").html("Model loaded ✅");
        classifier.predict(takeResult);
      }
      function takeResult(err, res) {
        console.log("Res: ", res);
        select("#result").html(res[0].className);
        select("#probability").html(`${res[0].probability.toFixed(2)} %`);
        // classifier.predict(takeResult);
        setTimeout(() => {
          classifier.predict(takeResult);
        }, 200);
      }
    </script>
  </body>
</html>
