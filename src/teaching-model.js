<html>
  <head>
    <meta charset="UTF-8" />
    <title>Image Classifier with MobileNet p5.js</title>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.dom.min.js"></script>

    <script
      src="https://unpkg.com/ml5@0.2.2/dist/ml5.min.js"
      type="text/javascript"
    ></script>
    <style>
      button {
        margin: 2px;
        padding: 4px;
        cursor: pointer;
      }
      video {
        width: 300;
        height: 300;
      }
      p {
        display: inline;
        font-size: 14px;
      }
      h6 {
        margin: 4px;
        font-weight: lighter;
        font-size: 14px;
        margin-bottom: 10px;
      }
    </style>
  </head>

  <body>
    <h2>Image Classifier using the feature extractor with MobileNet</h2>
    <div id="videoContainer"></div>
    <h6>
      <span id="modelStatus">Loading base model...</span> |
      <span id="videoStatus">Loading video...</span>
    </h6>
    <p><button id="addBookImage">Add book image</button></p>
    <p><span id="bookImageCount">0</span> book images</p>
    <br /><button id="addCupImage">Add cup image</button>
    <p><span id="cupImageCount">0</span> cup images</p>
    <br />
    <button id="trainButton">Training</button><span id="loss"></span>
    <br />
    <p>
      <button id="startPrediction">Start prediction!</button><br />
      This is: <span><strong id="result">...</strong></span
      >, with a confidence of <span id="confidence">...</span>.
    </p>
    <script>
      let video;
      let featureExtractor;
      let classifier;
      let bookImages = 1;
      let cupImages = 1;
      let loss;

      function setup() {
        noCanvas();
        video = createCapture(VIDEO);
        video.parent("videoContainer");
        featureExtractor = ml5.featureExtractor("MobileNet", modelReady);
        classifier = featureExtractor.classification(video, videoReady);
        setupButtons();
      }

      function modelReady() {
        const modelStatus = select("#modelStatus");
        if (modelStatus) {
          modelStatus.html("Model loaded");
        } else {
          console.error("Element with id 'modelStatus' not found.");
        }
      }

      function videoReady() {
        const modelStatus = select("#videoStatus");
        if (modelStatus) {
          modelStatus.html("Video loaded");
        } else {
          console.error("Element with id 'modelStatus' not found.");
        }
      }

      function setupButtons() {
        let buttonA = select("#addBookImage");
        buttonA.mousePressed(function () {
          classifier.addImage("book");
          select("#bookImageCount").html(bookImages++);
        });

        let buttonB = select("#addCupImage");
        buttonB.mousePressed(function () {
          classifier.addImage("cup");
          select("#cupImageCount").html(cupImages++);
        });

        let trainButton = select("#trainButton");
        trainButton.mousePressed(function () {
          classifier.train(function (lossValue) {
            if (lossValue) {
              loss = lossValue;
              select("#loss").html("Loss: " + loss);
            } else {
              select("#loss").html("Training completed with a loss of " + loss);
            }
          });
        });

        let predictButton = select("#startPrediction");
        predictButton.mousePressed(function () {
          classifier.classify(showResult);
        });
      }

      function showResult(err, res) {
        if (res[0].confidence < 0.8) {
          select("#result").html("calculating...");
        } else {
          select("#result").html(res[0].label);
        }
        select("#confidence").html(res[0].confidence.toFixed(2));
        setTimeout(() => {
          classifier.classify(showResult);
        }, 200);
      }
    </script>
  </body>
</html>

 