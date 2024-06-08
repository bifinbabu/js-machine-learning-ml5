let detector;
let img;

function preload() {
  img = loadImage("dog_cat.jpg");
  detector = ml5.objectDetector("cocossd");
}

function gotDetections(err, results) {
  if (err) {
    console.error(err);
  }
  console.log(results);
  for (let i = 0; i < results.length; i++) {
    let object = results[i];
    stroke(0, 225, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }
}

function setup() {
  createCanvas(640, 480);
  // console.log(detector);
  image(img, 0, 0);
  detector.detect(img, gotDetections);
}

// Basic steps in almost every ml5 use case
// 1. Load the model
// 2. Call predict
// 3. Get a results (error first)
