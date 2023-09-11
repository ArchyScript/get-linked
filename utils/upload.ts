export const beforeFileUpload = ({ type, size }: any, fileType: string) => {
  const imageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const documentTypes = ['application/pdf'];

  let types =
    fileType == 'all'
      ? [...imageTypes, ...documentTypes]
      : fileType === 'image'
      ? imageTypes
      : documentTypes;

  let PNGincluded = true;

  const validType = types.includes(type);
  if (!validType) return `Upload only PDF, ${PNGincluded ? 'PNG' : ''} 'JPG or JPEG files!'`;

  const fileSize = size / 1024 / 1000;
  if (fileSize > 2) return 'This file exceeds the maximum size of 2MB';

  return null;
};

export const dataImageURLtoFile = (data_image_url: string): File | null => {
  const arr = data_image_url.split(',');

  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) {
      console.error('Invalid data URL:', data_image_url);
      return null;
    }
  }

  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) {
    console.error('Invalid data URL:', data_image_url);
    return null;
  }
  const mime = mimeMatch[1];

  const bstr = atob(arr[1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);

  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }

  try {
    return new File([u8arr], 'selfie.png', { type: mime });
  } catch (error) {
    console.error('Error creating File:', error);
    return null;
  }
};

export const downloadImage = (imageUrl: string) => {
  // Create an anchor element
  var link = document.createElement('a');
  link.href = imageUrl;
  link.download = 'image.jpg'; // You can specify the desired filename here

  // Trigger a click event on the anchor element to start the download
  document.body.appendChild(link);
  link.click();

  // Remove the anchor element from the DOM
  document.body.removeChild(link);
};
