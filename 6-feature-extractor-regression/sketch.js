let mobilenet;
let predictor;
let video;
let value = 0;
let probability;
let trainButton;
let addButton;
let slider;

function modelReady() {
  console.log("Model is ready.");
}

function videoReady() {
  console.log("Video is ready.");
}

function whileTraining(loss) {
  if (loss == null) {
    console.log("Training complete");
    predictor.predict(gotResults);
  } else {
    console.log(loss);
  }
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    // console.log(results);
    value = results.value;
    // probability = results[0].confidence;

    predictor.predict(gotResults);
  }
}

function setup() {
  createCanvas(640, 550);
  video = createCapture(VIDEO);
  video.hide();
  background(0);

  mobilenet = ml5.featureExtractor("MobileNet", modelReady);
  predictor = mobilenet.regression(video, videoReady);

  slider = createSlider(0, 1, 0.5, 0.01);
  // slider.input(function () {
  //   // console.log(slider.value());
  //   predictor.addImage(slider.value());
  // });

  addButton = createButton("Add example image");
  addButton.mousePressed(function () {
    predictor.addImage(slider.value());
  });

  trainButton = createButton("train");
  trainButton.mousePressed(function () {
    predictor.train(whileTraining);
  });
}

function draw() {
  background(0);
  image(video, 0, 0);

  rectMode(CENTER);
  fill(255, 0, 200);
  rect(value * innerWidth, height / 2, 50, 50);

  fill(255);
  textSize(64);
  text(value, 10, height - 20);
  createP(value);
  createP(probability);
}
