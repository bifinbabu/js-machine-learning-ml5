let video;
let features;
let knn;
let labelP;
let ready = false;

function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  video.elt.addEventListener("loadeddata", () => {
    features = ml5.featureExtractor("MobileNet", modelReady);
    knn = ml5.KNNClassifier();
    labelP = createP("Need training data");
    labelP.style("font-size", "64px");
  });
}

function gotClassify() {
  const logits = features.infer(video);
  knn.classify(logits, function (error, result) {
    if (error) {
      console.log(result);
    } else {
      console.log(result);
      labelP.html(result.label);
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
  }
  // console.log(logits.dataSync());
}

function modelReady() {
  console.log("Model ready");
}

function draw() {
  image(video, 0, 0);
  if (!ready && knn?.getNumLabels() > 0) {
    gotClassify();
    ready = true;
  }
}
