const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to create a Promise for downloading an image
function loadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;
    
    // Resolve the promise when the image loads successfully
    img.onload = () => resolve(img);

    // Reject the promise if the image fails to load
    img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
  });
}

// Function to download images when the button is clicked
btn.addEventListener("click", () => {
  output.innerHTML = "Loading images...";

  // Create an array of image download promises
  const imagePromises = images.map(image => loadImage(image));

  // Use Promise.all to download all images in parallel
  Promise.all(imagePromises)
    .then((downloadedImages) => {
      // Clear the output div before displaying the images
      output.innerHTML = "";

      // Append each downloaded image to the output div
      downloadedImages.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch((error) => {
      // Display error message in the output div if any image fails to load
      output.innerHTML = `<p>${error}</p>`;
    });
});
