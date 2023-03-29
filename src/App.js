/*global chrome*/
import "./App.css";
import ImageUploader from "./ImageUploader";
import logo from "./assets/falsify.png";

function App() {
  const url = window.location.href;
  fetch("http://localhost:4000/url", {
    headers: {
      "Content-Type": "application/json",
    },
    // Enter your IP address here

    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      url: url,
    }),
  });
  // Get the file input element
  var fileInput = document.createElement("input");
  fileInput.type = "file";

  // Listen for changes to the file input and handle the selected file
  fileInput.addEventListener("change", function (event) {
    var file = event.target.files[0];

    // Create a new FileReader object
    var reader = new FileReader();

    // Listen for the FileReader to finish reading the file
    reader.addEventListener("load", function (event) {
      // Create a new image element and set its source to the data URL
      var image = document.createElement("img");
      image.src = event.target.result;

      // Add the image to the DOM
      document.body.appendChild(image);

      // Create a new canvas element and draw the image on it
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);

      // Convert the canvas to a data URL and save it
      var dataUrl = canvas.toDataURL();
      chrome.storage.local.set({ imageData: dataUrl });
    });

    // Read the file as a data URL
    reader.readAsDataURL(file);
  });

  // Click the file input element to open the file dialog
  fileInput.click();

  return (
    <div className="App">
      <img src={logo} alt="logo" width="160px" />
      <h1>
        <span id="cap">Find</span> <span>Missing Person</span>{" "}
      </h1>
      {/* <button>Find Missing People</button> */}
      {/* <br /> */}
      <p>We help you Find The Missing People</p>

      <br />
      <h3>
        <a href="#"> Visit Our Website!</a>
      </h3>

      <ImageUploader />
      <button type="submit">Find Missing Person</button>
    </div>
  );
}

export default App;
