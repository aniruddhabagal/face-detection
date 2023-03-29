export const dataURLtoHTTP = (url) => {
  // Remove the "data:" prefix and split the remaining string into two parts
  const parts = url.split(";base64,");

  // Decode the base64-encoded data and create a new Uint8Array
  const data = atob(parts[1]);
  const uint8Array = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) {
    uint8Array[i] = data.charCodeAt(i);
  }

  // Create a new Blob object from the Uint8Array and set its type to the MIME type
  const blob = new Blob([uint8Array], { type: parts[0].split(":")[1] });

  // Create a new URL object and return its string representation
  return URL.createObjectURL(blob);
};
