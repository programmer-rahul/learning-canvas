const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

const image = new Image();
image.src = "image.jpg";

console.log(image);

image.onload = () => {
  ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const scannedImage = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  const imageData = scannedImage.data;

  for (let i = 0; i < imageData.length; i += 4) {
    const total = imageData[i] + imageData[i + 1] + imageData[i + 2];
    let average = total / 3;

    imageData[i] = average;
    imageData[i + 1] = average;
    imageData[i + 2] = average;
  }

  scannedImage.data = imageData;
  ctx.putImageData(scannedImage, 0, 0);
};
