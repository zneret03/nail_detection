export const objectAssign = (ObjectArray, obj) => {
    return ObjectArray.map((info) => {
        return Object.assign(obj, info);
    });
};

export function extractImageFileExtensionFromBase64 (base64Data) {
  return base64Data.substring('data:image/'.length, base64Data.indexOf(';base64'))
}

export function getCroppedImage(sourceImage, cropConfig, fileName) {
  // creating the cropped image from the source image
  const canvas = document.createElement("canvas");
  const scaleX = sourceImage.naturalWidth / sourceImage.width;
  const scaleY = sourceImage.naturalHeight / sourceImage.height;
  canvas.width = cropConfig.width;
  canvas.height = cropConfig.height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    sourceImage,
    cropConfig.x * scaleX,
    cropConfig.y * scaleY,
    cropConfig.width * scaleX,
    cropConfig.height * scaleY,
    0,
    0,
    cropConfig.width,
    cropConfig.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      // returning an error
      if (!blob) {
        reject(new Error("Canvas is empty"));
        return;
      }

      blob.name = fileName;
      // creating a Object URL representing the Blob object given
      const croppedImageUrl = window.URL.createObjectURL(blob);

      resolve(croppedImageUrl);
    }, "image/jpeg");
  });
}