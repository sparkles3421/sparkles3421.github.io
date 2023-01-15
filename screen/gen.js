var canvas = document.createElement("canvas");
canvas.width = 200;
canvas.height = 100;
var iom = -3;
var iomx = 0;
var jom = -3;
var jomx = 0;
var d = 18;
function start() {
    document.getElementById('die').appendChild(canvas);
    run()
}
var ctx = canvas.getContext("2d");
var imageData;
function generate() {
  imageData = ctx.createImageData(canvas.width, canvas.height);
  for (var y = 0; y < canvas.height; y++) {
    ctx.putImageData(imageData, 0, 0);
    for (var x = 0; x < canvas.width; x++) {
      var index = (y * canvas.width + x) * 4;
      imageData.data[index] = getColor(x, y, 0);
      imageData.data[index + 1] = getColor(x, y, 1);
      imageData.data[index + 2] = getColor(x, y, 2);
      imageData.data[index + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
}
function getColor(x, y, color) {
  var sum = 0;
  for (var i = iom; i <= iomx; i++) {
    for (var j = jom; j <= jomx; j++) {
      var x2 = x + i;
      var y2 = y + j;
      var index2 = (y2 * canvas.width + x2) * 4;
      if (x2 >= 0 && x2 < canvas.width && y2 >= 0 && y2 < canvas.height) {
        if (imageData.data[index2 + color] == 0) {
          imageData.data[index2 + color] = Math.floor(Math.random() * 256);
        }
        sum += imageData.data[index2 + color];
      }
    }
  }
  if (sum < 500) {
    sum = Math.random() * 2000;
  }
  return sum / d;
}
function run() {
  setTimeout(function () {
    generate();
    run();
  }, 50);
}
