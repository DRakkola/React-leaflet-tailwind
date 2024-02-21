// imageClient.js
import axios from 'axios';

// Create an Axios instance for the image API
const imageApi = axios.create({
  baseURL: 'http://localhost:8000/',
  responseType: 'arraybuffer',
});

export const fetchImageDataUrl = async (imageID) => {
    try {
      const response = await imageApi.get(`get-image/${imageID}`);
  
      // Convert the binary data to a base64 string
      const base64Image = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
  
      // Create a data URL for displaying the image
      return `data:image/jpeg;base64,${base64Image}`;
    } catch (error) {
      console.error('Error fetching image:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  };