/*global chrome*/
import React, { useState } from "react";
import { dataURLtoHTTP } from "./DatatoImage";

function ImageUploader() {
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    // Create a new FileReader object
    const reader = new FileReader();

    // Listen for the FileReader to finish reading the file
    reader.addEventListener("load", () => {
      // Create a new image element and set its source to the data URL
      const image = new Image();
      image.src = reader.result;

      // When the image has finished loading, set its URL in state
      image.addEventListener("load", () => {
        setImageUrl(image.src);
      });

      fetch("http://127.0.0.1:5000/get_image", {
        method: "post",
        body: JSON.stringify({ img_url: image.src }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((msg) => msg.json())
        .then((data) => {});
    });

    // Read the file as a data URL
    reader.readAsDataURL(file);

    // const img_url = new FormData(imageUrl);

    // console.log(img_url);
    // const img_url = imageUrl;
    // const check = JSON.stringify(imageUrl);
  };

  const handleSaveImage = () => {
    // Save the image URL in local storage
    chrome.storage.local.set(imageUrl);
    fetch("http://127.0.0.1:5000/get_image", {
      method: "POST",
      body: { imageUrl },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((msg) => msg.json())
      .then((data) => {
        console.log(data);
      });
    // var check = dataURLtoHTTP(chrome.storage.local.imageData);
  };
  // var check = dataURLtoHTTP(imageUrl);
  //  dataURLtoHTTP(imageUrl);
  console.log(imageUrl);

  //

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      {imageUrl && (
        <div>
          <img
            src={imageUrl}
            width="300px"
            height="200px"
            alt="Uploaded Image"
          />
          <br />
          <button onClick={handleSaveImage}>Save Image</button>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
