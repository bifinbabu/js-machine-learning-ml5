let detector;
let video;
let detections = [];

function preload() {
  detector = ml5.objectDetector("cocossd");
}

function gotDetections(err, results) {
  if (err) {
    console.error("Error is", err);
    return;
  }
  console.log(results);
  detections = results;
  detector.detect(video, gotDetections);
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  video.elt.addEventListener("loadeddata", () => {
    detector.detect(video, gotDetections);
  });
}

function draw() {
  image(video, 0, 0);

  for (let i = 0; i < detections.length; i++) {
    let object = detections[i];
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }
}
