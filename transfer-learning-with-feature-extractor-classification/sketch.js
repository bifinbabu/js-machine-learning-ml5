let mobilenet;
let classifier;
let video;
let label = "";
let probability;
let ukeButton;
let scissorButton;
let trainButton;

function modelReady() {
  console.log("Model is ready.");
}

function videoReady() {
  console.log("Video is ready.");
}

function whileTraining(loss) {
  if (loss == null) {
    console.log("Training complete");
    classifier.classify(gotResults);
  } else {
    console.log(loss);
  }
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    // console.log(results);
    label = results[0].label;
    probability = results[0].confidence;

    classifier.classify(gotResults);
  }
}

function setup() {
  createCanvas(640, 550);
  video = createCapture(VIDEO);
  video.hide();
  background(0);

  mobilenet = ml5.featureExtractor("MobileNet", modelReady);
  classifier = mobilenet.classification(video, videoReady);

  ukeButton = createButton("happy");
  ukeButton.mousePressed(function () {
    classifier.addImage("happy");
  });

  scissorButton = createButton("sad");
  scissorButton.mousePressed(function () {
    classifier.addImage("sad");
  });

  trainButton = createButton("train");
  trainButton.mousePressed(function () {
    classifier.train(whileTraining);
  });
}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(64);
  text(label, 10, height - 20);
  createP(label);
  createP(probability);
}
