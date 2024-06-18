let x;
let y;

let video;
let features;
let knn;
let labelP;
let ready = false;
let label = "";

function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.style("transform", "scale(-1,1)");
  // video.hide();
  video.elt.addEventListener("loadeddata", () => {
    features = ml5.featureExtractor("MobileNet", modelReady);

    labelP = createP("Need training data");
    labelP.style("font-size", "64px");

    x = width / 2;
    y = height / 2;
  });
}

function gotClassify() {
  const logits = features.infer(video);
  knn.classify(logits, function (error, result) {
    if (error) {
      console.log(result);
    } else {
      // console.log(result);
      // let maxLabel = "";
      let maxConfidence = -1;

      for (const [resultLabel, confidence] of Object.entries(
        result.confidencesByLabel
      )) {
        if (confidence > maxConfidence) {
          maxConfidence = confidence;
          // maxLabel = label;
          label = resultLabel;
          labelP.html(resultLabel);
        }
      }
      // labelP.html(result.label);
      gotClassify();
    }
  });
}

function keyPressed() {
  const logits = features.infer(video);
  if (key == "l") {
    knn.addExample(logits, "left");
    console.log("left");
  } else if (key == "r") {
    knn.addExample(logits, "right");
    console.log("right");
  } else if (key == "u") {
    knn.addExample(logits, "up");
    console.log("up");
  } else if (key == "d") {
    knn.addExample(logits, "down");
    console.log("down");
  } else if (key == "s") {
    console.log("save called");
    knn.save("model.json");
  }
  // console.log(logits.dataSync());
}

function modelReady() {
  console.log("Mobilenet ready");
  knn = ml5.KNNClassifier();
  knn.load("./model.json", function () {
    console.log("KNN data loaded");
    gotClassify();
  });
  console.log("Model ready");
}

function draw() {
  background(0);
  ellipse(x, y, 36);
  // image(video, 0, 0);

  // if (!ready && knn?.getNumLabels() > 0) {
  //   gotClassify();
  //   ready = true;
  // }

  if (label == "up") {
    y--;
  } else if (label == "down") {
    y++;
  } else if (label == "left") {
    x--;
  } else if (label == "right") {
    x++;
  }

  x = constrain(x, 0, width);
  y = constrain(y, 0, height);
}
